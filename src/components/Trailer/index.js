import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Trailer.module.scss';

const cx = classNames.bind(styles);

function Trailer({ videos }) {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('custom-container')}>
                <div className={cx('section-title')}>
                    <span className={cx('sub-title')}>Trailer movies</span>
                    <h1 className={cx('title')}>Trailer</h1>
                </div>
                <Row>
                    {videos.map((video) => {
                        return (
                            <Col md={6} lg={4} key={video.id}>
                                <div className={cx('frame-container')}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default Trailer;
