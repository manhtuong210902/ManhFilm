import styles from '~/components/MovieItem/MovieItem.module.scss';
import classNames from 'classnames/bind';
import { Col } from 'react-bootstrap';
import Image from '../Image';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/firebase/config';
import ToastCustom from '../Toast';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FavoritesItem({ data, setDeleteMovie }) {
    const [show, setShow] = useState(false);
    const handleDeleteMovie = async () => {
        try {
            const q = await query(
                collection(db, 'favorites'),
                where('uid', '==', data.uid),
                where('movie_id', '==', data.movie_id),
            );

            const querySnapshot = await getDocs(q);
            const docId = querySnapshot.docs.at(0).id;

            if (!querySnapshot.empty) {
                await deleteDoc(doc(db, 'favorites', docId));
            }
            setShow(true);
            setDeleteMovie(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Col xl={2} lg={3} sm={4} className={cx('movie-item')}>
                <div className={cx('movie-item-wrapper')}>
                    <div className={cx('poster')}>
                        <Image src={data.image} alt="hello" />
                        <ul className={cx('overlay-btn')}>
                            <li>
                                <Button small={true} secondary to={`/watch/${data.media_type}/${data.movie_id}`}>
                                    Watch Now
                                </Button>
                            </li>
                            <li>
                                <Button small={true} to={`/details/${data.media_type}/${data.movie_id}`}>
                                    Details
                                </Button>
                            </li>
                            <li>
                                <Button
                                    small={true}
                                    className={cx('btn-remove')}
                                    leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                                    onClick={handleDeleteMovie}
                                >
                                    Remove
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('content')}>
                        <h1 className={cx('movie-title')}>{data.title}</h1>
                    </div>
                </div>
            </Col>

            <ToastCustom
                show={show}
                setShow={setShow}
                text={`${data.title} movie has been removed from my favorites list`}
                icon={<FontAwesomeIcon icon={faTrashCan} />}
                color={'#66e466'}
            />
        </>
    );
}

export default FavoritesItem;
