import classNames from 'classnames/bind';
import styles from './MovieItem.module.scss';
import { Col } from 'react-bootstrap';
import { IMAGE_URL } from '~/utils/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import images from '~/assets/images';
import Button from '../Button';

const cx = classNames.bind(styles);

function MovieItem({ style, data }) {
    const mediaType = data.title ? 'movie' : 'tv';
    const [posterImg, setPosterImg] = useState(`${IMAGE_URL}${data.poster_path}`);
    const handleOnError = () => {
        setPosterImg(images.noImage);
    };

    return (
        <Col xl={3} lg={4} sm={6} className={cx('movie-item')} style={style}>
            <div className={cx('movie-item-wrapper')}>
                <div className={cx('poster')}>
                    <img src={posterImg} alt="hello" onError={handleOnError} />
                    <ul className={cx('overlay-btn')}>
                        <li>
                            <Button small={true} secondary to={`/watch/${mediaType}/${data.id}`}>
                                Watch Now
                            </Button>
                        </li>
                        <li>
                            <Button small={true} to={`/details/${mediaType}/${data.id}`}>
                                Details
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className={cx('content')}>
                    <h1 className={cx('movie-title')}>{data.title ? data.title : data.name}</h1>
                    <div className={cx('movie-content')}>
                        <span className={cx('tag')}>English</span>
                        <span className={cx('vote')}>
                            <span>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            {data.vote_count}
                        </span>
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default MovieItem;
