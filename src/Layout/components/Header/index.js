import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, signOut } from 'firebase/auth';
import { auth, db } from '~/firebase/config';

import styles from './Header.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import SearchHeader from '../SearchHeader';
import images from '~/assets/images';
import { addDoc, collection } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthProvider';
import Image from '~/components/Image';
const cx = classNames.bind(styles);
const provider = new GoogleAuthProvider();

const navItems = [
    {
        title: 'Home',
        to: config.routes.home,
    },

    {
        title: 'Movies',
        to: config.routes.movies,
    },

    {
        title: 'TV show',
        to: config.routes.tvshow,
    },
];

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [fixedHeader, setFixedHeader] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const popupRef = useRef(null);
    const headerRef = useRef();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        setShowSearch(false);
        setShowMenu(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        const handleFixedHeader = () => {
            const header = headerRef.current;
            const sticky = header.offsetHeight;

            if (header) {
                if (window.pageYOffset > sticky) {
                    setFixedHeader(true);
                } else {
                    setFixedHeader(false);
                }
            }
        };

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        window.addEventListener('scroll', handleFixedHeader);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleFixedHeader);
        };
    }, []);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleToggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleOnTop = () => {
        window.scrollTo({
            top: 0,
        });
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleSignUpWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                const details = getAdditionalUserInfo(result);
                if (details.isNewUser) {
                    try {
                        const docRef = await addDoc(collection(db, 'users'), {
                            name: user.displayName,
                            email: user.email,
                            uid: user.uid,
                            photoURL: user.photoURL,
                        });

                        console.log('add database successfull', docRef.id);
                    } catch (error) {
                        console.log(error);
                    }
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
            });
    };

    let sticky = fixedHeader ? 'sticky' : '';

    return (
        <div ref={headerRef} className={cx('wrapper', { sticky })}>
            <Container fluid="md">
                <header className={cx('header')}>
                    <div>
                        <Link to="/">
                            <img src={images.logo} alt="logo" className="logo" />
                        </Link>
                    </div>

                    <ul className={cx('navigation', 'd-none d-md-flex')}>
                        {navItems.map((Item, index) => {
                            return (
                                <li className={cx('nav-item')} key={index}>
                                    <Link className={cx('nav-item-link')} to={Item.to}>
                                        {Item.title}
                                    </Link>
                                </li>
                            );
                        })}

                        {user && (
                            <li className={cx('nav-item')}>
                                <Link className={cx('nav-item-link')} to={config.routes.favorites}>
                                    Favorites
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className={cx('action')}>
                        <button className={cx('search-btn')} onClick={handleToggleSearch}>
                            {!showSearch ? (
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            ) : (
                                <FontAwesomeIcon icon={faXmark} className={cx('close')} />
                            )}
                        </button>
                        <div className={'d-none d-md-flex position-relative'}>
                            {user ? (
                                <>
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className={cx('avatar-user', `${showPopup ? 'active' : ''}`)}
                                        onClick={() => {
                                            setShowPopup(true);
                                        }}
                                    />
                                </>
                            ) : (
                                <Button onClick={handleSignUpWithGoogle}>Sign Up</Button>
                            )}

                            {showPopup && (
                                <div className={cx('popup')} ref={popupRef}>
                                    <div className={cx('header-popup')}>
                                        <Image src={user.photoURL} className={cx('avatar')} />
                                        <div className={cx('popup-info')}>
                                            <h4>{user.displayName}</h4>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className={cx('popup-footer')}>
                                        <Button
                                            onClick={() => {
                                                signOut(auth);
                                                handleClose();
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className={cx('toggle-menu-btn', 'd-md-none')} onClick={handleToggleMenu}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </header>
            </Container>
            {/* Search destop */}
            {showSearch ? <SearchHeader /> : <></>}
            {/* Menu mobile */}
            {showMenu && (
                <div className={cx('nav-modal')}>
                    <div className={cx('nav-mobile')}>
                        <header className={cx('nav-header')}>
                            <div>
                                <Link to="/">
                                    <img src={images.logo} alt="logo" />
                                </Link>
                            </div>
                            <button className={cx('nav-close-btn')} onClick={handleToggleMenu}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </header>

                        {user && (
                            <div className={cx('nav-user')}>
                                <div className={cx('nav-user-header')}>
                                    <Image src={user.photoURL} className={cx('avatar')} />
                                    <div className={cx('popup-info')}>
                                        <h4>{user.displayName}</h4>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <ul className={cx('nav-mobile-list')}>
                            {navItems.map((Item, index) => {
                                return (
                                    <li className={cx('nav-mobile-item')} key={index}>
                                        <Link to={Item.to} className={cx('nav-mobile-item-link')}>
                                            {Item.title}
                                        </Link>
                                    </li>
                                );
                            })}

                            {user && (
                                <li className={cx('nav-mobile-item')}>
                                    <Link to={config.routes.favorites} className={cx('nav-mobile-item-link')}>
                                        Favorites
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {user ? (
                            <div className={cx('popup-footer')}>
                                <Button
                                    onClick={() => {
                                        signOut(auth);
                                        handleClose();
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className={cx('popup-footer')}>
                                <Button onClick={handleSignUpWithGoogle}>Sign Up</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Scroll Top Btn */}
            {fixedHeader ? (
                <button className={cx('scroll-top-btn')}>
                    <FontAwesomeIcon icon={faAngleUp} onMouseDown={handleOnTop} />
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Header;
