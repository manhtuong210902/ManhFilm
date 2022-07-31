import { faFacebookF, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <Container fluid="md">
                <Row className={cx('custom-row')}>
                    <Col md={7}>
                        <h2 className={cx('name')}>
                            Made by{' '}
                            <a href="https://www.facebook.com/tot.nguoi.1441/" target={`_blank`}>
                                Manh Tuong
                            </a>
                        </h2>
                    </Col>
                    <Col md={5}>
                        <div className={cx('contact')}>
                            <a href="https://www.facebook.com/tot.nguoi.1441/" target={`_blank`}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://www.facebook.com/tot.nguoi.1441/" target={`_blank`}>
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.facebook.com/tot.nguoi.1441/" target={`_blank`}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
