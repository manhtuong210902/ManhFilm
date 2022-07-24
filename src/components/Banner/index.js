import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL, API_KEY } from '~/utils/constant';
import { useEffect, useState } from 'react';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

function Banner() {
    const [banner, setBanner] = useState();
    const [releaseDate, setReleaseDate] = useState('');

    useEffect(() => {
        function getBanner() {
            axios
                .get(`${BASE_URL}/trending/movie/week`, {
                    params: {
                        api_key: API_KEY,
                    },
                })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    const random = Math.floor(Math.random() * 20);
                    setReleaseDate(data.results[random].release_date.slice(0, 4));
                    setBanner(data.results[random]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        getBanner();
    }, []);

    return (
        <>
            {banner ? (
                <div
                    className={cx('wrapper')}
                    style={{
                        backgroundImage: `linear-gradient(rgba(33, 35, 43, 0.8), rgba(33, 35, 43, 0.8)), url(https://image.tmdb.org/t/p/original${banner.backdrop_path})`,
                    }}
                >
                    <Container fluid="md" className={cx('custom-container')}>
                        <Row className={cx('custom-row')}>
                            <Col sm={6}>
                                <div className={cx('content')}>
                                    <h2 className={cx('brand')}>ManhFilm</h2>
                                    <h1 className={cx('title')}>{banner.title}</h1>
                                    <div className={cx('meta')}>
                                        <div className={cx('quality')}>
                                            <span>Pg 18</span>
                                            <span>hd</span>
                                        </div>
                                        <div className={cx('release-time')}>
                                            <span>
                                                <span>
                                                    <FontAwesomeIcon icon={faCalendarDays} />
                                                </span>
                                                {releaseDate}
                                            </span>
                                            <span>
                                                <span>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </span>
                                                {banner.vote_count}
                                            </span>
                                        </div>
                                    </div>
                                    <Button leftIcon={<FontAwesomeIcon icon={faPlay} />}>WATCH NOW</Button>
                                </div>
                            </Col>
                            <Col sm={4} lg={3} className="d-none d-sm-block">
                                <div className={cx('poster')}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${banner.poster_path}`}
                                        alt={banner.original_title}
                                        className="img-fluid"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (
                <PreLoader />
            )}
        </>
    );
}

export default Banner;
