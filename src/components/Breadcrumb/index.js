import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '~/config';
import styles from './Breadcrumb.module.scss';

const cx = classNames.bind(styles);

function Breadcrumb({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col>
                        <div className={cx('content')}>
                            <h2 className={cx('title')}>
                                {data.title} <span>{data.titleActive}</span>
                            </h2>
                            <div className={cx('list')}>
                                <Link to={config.routes.home} className={cx('list-item')}>
                                    Home
                                </Link>
                                <span className={cx('list-item')}>{data.branch}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Breadcrumb;