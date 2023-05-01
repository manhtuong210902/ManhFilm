import { useContext, useEffect, useState } from 'react';
import PreLoader from '../PreLoader';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { AuthContext } from '~/context/AuthProvider';
import styles from '~/components/MovieContainer/MovieContainer.module.scss';
import classNames from 'classnames/bind';
import { Container, Row } from 'react-bootstrap';
import FavoritesItem from '../FavoritesItem';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Favorites() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMoive, setDeleteMovie] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getMovies = async () => {
            const q = await query(collection(db, 'favorites'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            setLoading(false);
            return data;
        };

        getMovies().then((data) => {
            setMovies(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteMoive]);

    if (loading) return <PreLoader />;

    return (
        <>
            <div className={cx('wrapper')}>
                <Container className={cx('custom-container')}>
                    <div className={cx('section-title')}>
                        <span className={cx('sub-title')}>My Favorites</span>
                        <h1 className={cx('title')}>Favorites list</h1>
                    </div>
                    {movies.length > 0 ? (
                        <Row className={cx('list-item')}>
                            {movies.map((item, index) => {
                                return <FavoritesItem data={item} key={index} setDeleteMovie={setDeleteMovie} />;
                            })}
                        </Row>
                    ) : (
                        <div className={cx('empty-item')}>
                            <p>
                                Your favorite movie list is empty, search
                                <Link to={config.routes.home} className={cx('search-item')}>
                                    {' '}
                                    here
                                </Link>
                            </p>
                        </div>
                    )}
                </Container>
            </div>
        </>
    );
}

export default Favorites;
