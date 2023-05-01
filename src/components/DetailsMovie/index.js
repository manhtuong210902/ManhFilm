import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DetailsMovie.module.scss';
import { faCheckCircle, faHeart, faPlay, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import { BG_URL, IMAGE_URL } from '~/utils/constant';
import DesMovie from '../DesMovie';
import images from '~/assets/images';
import Image from '../Image';
import ToastCustom from '../Toast';
import { useContext, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { AuthContext } from '~/context/AuthProvider';

const cx = classNames.bind(styles);

function DetailsMovie({ data }) {
    const { media_type, id } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [showNotLogin, setShowNotLogin] = useState(false);

    const { user } = useContext(AuthContext);

    const handleAddFavoriters = async () => {
        if (!user) {
            setShowNotLogin(true);
            return;
        }

        try {
            const q = await query(
                collection(db, 'favorites'),
                where('uid', '==', user.uid),
                where('movie_id', '==', id),
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(collection(db, 'favorites'), {
                    uid: user.uid,
                    movie_id: id,
                    title: data.title ? data.title : data.name,
                    image: `${IMAGE_URL}${data.poster_path}`,
                    media_type: media_type,
                });
                setShowSuccess(true);
            } else {
                setShowFail(true);
            }
        } catch (error) {
            console.log(error);
        }
        // console.log(userRef);
    };

    return (
        <div
            className={cx('wrapper')}
            style={{
                backgroundImage: `linear-gradient(rgba(33, 35, 43, 0.8), rgba(33, 35, 43, 0.8)), url(${BG_URL}${data.backdrop_path})`,
            }}
        >
            <Container>
                <Row className={cx('align-items-center')}>
                    <Col xl={3} lg={4}>
                        <div className={cx('poster')}>
                            <Image src={`${IMAGE_URL}${data.poster_path}`} alt="" className="img-fluid" />
                            <Link to={`/watch/${media_type}/${id}`} className={cx('popup-video')}>
                                <img src={images.playIcon} alt="" />
                            </Link>
                        </div>
                    </Col>
                    <Col xl={6} lg={8}>
                        <div className={cx('content')}>
                            <DesMovie data={data} />
                            <div className={cx('list-btn')}>
                                <Button leftIcon={<FontAwesomeIcon icon={faPlay} />} to={`/watch/${media_type}/${id}`}>
                                    WATCH NOW
                                </Button>
                                <Button
                                    leftIcon={<FontAwesomeIcon icon={faHeart} />}
                                    className={cx('btn-add')}
                                    secondary
                                    onClick={handleAddFavoriters}
                                >
                                    ADD TO FAVORITERS
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {user && (
                <>
                    <ToastCustom
                        show={showSuccess}
                        setShow={setShowSuccess}
                        text={'Added this movie to your favorites'}
                        icon={<FontAwesomeIcon icon={faCheckCircle} />}
                        color={'#66e466'}
                    />
                    <ToastCustom
                        show={showFail}
                        setShow={setShowFail}
                        text={'This movie is already in your favorites'}
                        icon={<FontAwesomeIcon icon={faXmarkCircle} />}
                        color={'#f85d5d'}
                    />
                </>
            )}
            <ToastCustom
                show={showNotLogin}
                setShow={setShowNotLogin}
                text={'Please login to use this feature'}
                icon={<FontAwesomeIcon icon={faXmarkCircle} />}
                color={'#f85d5d'}
            />
        </div>
    );
}

export default DetailsMovie;
