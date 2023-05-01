import { Toast } from 'react-bootstrap';
import styles from './Toast.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ToastCustom({ show, setShow, text, icon, color }) {
    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className={cx('wrapper')}>
            <div
                className={cx('content')}
                style={{
                    borderTop: `5px solid ${color}`,
                }}
            >
                {icon && (
                    <span
                        className={cx('icon')}
                        style={{
                            color: `${color}`,
                        }}
                    >
                        {icon}
                    </span>
                )}
                <p>{text}</p>
            </div>
        </Toast>
    );
}

export default ToastCustom;
