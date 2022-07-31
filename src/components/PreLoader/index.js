import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './PreLoader.module.scss';

const cx = classNames.bind(styles);

function PreLoader() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('loading-center')}>
                <div className={cx('loading-center-absolute')}>
                    <img src={images.preLoader} alt="" />
                </div>
            </div>
        </div>
    );
}

export default PreLoader;
