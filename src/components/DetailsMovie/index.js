import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DetailsMovie.module.scss';
import { faCalendarDays, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL, BG_URL, IMAGE_URL } from '~/utils/constant';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

function DetailsMovie() {
    const params = useParams();
    const { media_type, id } = params;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [lastWord, setLastWord] = useState('');

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${media_type}/${id}`, {
                params: {
                    api_key: API_KEY,
                },
            })
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                const title = data.title ? data.title : data.name;
                setData(data);
                setLoading(false);
                setTitle(() => {
                    const lastIndexOfSpace = title.lastIndexOf(' ');
                    if (lastIndexOfSpace === -1) {
                        return title;
                    }
                    return title.substring(0, lastIndexOfSpace);
                });
                setLastWord(title.split(' ').pop());
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id, media_type]);

    if (loading) return <PreLoader />;
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
                            <img src={`${IMAGE_URL}${data.poster_path}`} alt="" className="img-fluid" />
                            <Link to={'/'} className={cx('popup-video')}>
                                <img src="https://movflxx.netlify.app/img/images/play_icon.png" alt="" />
                            </Link>
                        </div>
                    </Col>
                    <Col xl={6} lg={8}>
                        <div className={cx('content')}>
                            <h2 className={cx('title')}>
                                {title} <span>{lastWord}</span>
                            </h2>
                            <div className={cx('meta')}>
                                <div className={cx('quality')}>
                                    <span>Pg 18</span>
                                    <span>hd</span>
                                </div>
                                <div className={cx('category')}>
                                    {data.genres.map((category, index) => {
                                        if (index === data.genres.length - 1) {
                                            return <span key={category.id}>{category.name}</span>;
                                        }
                                        return <span key={category.id}>{category.name},</span>;
                                    })}
                                </div>
                                <div className={cx('release-time')}>
                                    <span>
                                        <span>
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                        </span>
                                        {data.release_date.slice(0, 4)}
                                    </span>
                                    <span>
                                        <span>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                        {data.vote_count}
                                    </span>
                                </div>
                            </div>
                            <p className={cx('description')}>{data.overview}</p>
                            <Button leftIcon={<FontAwesomeIcon icon={faPlay} />}>WATCH NOW</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailsMovie;
