import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DetailsMovie.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import { BG_URL, IMAGE_URL } from '~/utils/constant';
import DesMovie from '../DesMovie';
import images from '~/assets/images';
import Image from '../Image';

const cx = classNames.bind(styles);

function DetailsMovie({ data }) {
    const { media_type, id } = useParams();
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
                            <Button leftIcon={<FontAwesomeIcon icon={faPlay} />} to={`/watch/${media_type}/${id}`}>
                                WATCH NOW
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailsMovie;
