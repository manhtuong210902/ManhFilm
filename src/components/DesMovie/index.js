import classNames from 'classnames/bind';
import styles from './DesMovie.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DesMovie({ data }) {
    const title = data.title ? data.title : data.name;
    const name = (title) => {
        const lastIndexOfSpace = title.lastIndexOf(' ');
        if (lastIndexOfSpace === -1) {
            return '';
        }
        return title.substring(0, lastIndexOfSpace);
    };
    const lastWord = title.split(' ').pop();
    const releaseDate = data.release_date ? data.release_date : data.last_air_date ? data.last_air_date : data.air_date;

    return (
        <>
            <h2 className={cx('title')}>
                {name(title)} <span>{lastWord}</span>
            </h2>
            {data.episode_number ? (
                <h2 className={cx('episode')}>{`Episode ${data.episode_number}`}</h2>
            ) : (
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
                            {releaseDate.slice(0, 4)}
                        </span>
                        <span>
                            <span>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            {data.vote_count}
                        </span>
                    </div>
                </div>
            )}
            <p className={cx('description')}>{data.overview}</p>
        </>
    );
}

export default DesMovie;
