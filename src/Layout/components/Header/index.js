import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

import styles from './Header.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import SearchHeader from '../SearchHeader';
import images from '~/assets/images';
const cx = classNames.bind(styles);
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
    const location = useLocation();

    const headerRef = useRef();

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

        window.addEventListener('scroll', handleFixedHeader);

        return () => window.removeEventListener('scroll', handleFixedHeader);
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
                    </ul>

                    <div className={cx('action')}>
                        <button className={cx('search-btn')} onClick={handleToggleSearch}>
                            {!showSearch ? (
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            ) : (
                                <FontAwesomeIcon icon={faXmark} className={cx('close')} />
                            )}
                        </button>
                        <Button className={'d-none d-md-flex'}>Sign Up</Button>

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
                        </ul>
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
