import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import DesMovie from '../DesMovie';
import ListMovie from '../ListMovie';
import styles from './Watch.module.scss';

const cx = classNames.bind(styles);

function WatchMovie({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Container fluid="sm">
                <Row>
                    <Col lg={7} xl={8}>
                        <div className={cx('video')}>
                            <iframe
                                width="100%"
                                height={'100%'}
                                src={`https://2embed.org/embed/${data.id}`}
                                title="Movie player"
                                frameBorder="0"
                                allowFullScreen
                            />
                            <div className={cx('description')}>
                                <DesMovie data={data} />
                            </div>
                        </div>
                    </Col>
                    <Col lg={5} xl={4}>
                        <ListMovie />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WatchMovie;
