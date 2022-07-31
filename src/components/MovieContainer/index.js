import classNames from 'classnames/bind';
import styles from './MovieContainer.module.scss';
import { Container } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import PreLoader from '../PreLoader';
import MovieSlider from '../MovieSlider';
import MovieGrid from '../MovieGrid';
import Button from '../Button';
// import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function MovieContainer({ type, isGrid = false }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    //is Grid
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useMemo(() => {
        setMovies([]);
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    useEffect(() => {
        axios
            .get(type.api, {
                params: {
                    page: page,
                },
            })
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                setMovies((prev) => [...prev, ...data.results]);
                setTotalPage(data.total_pages);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [page, type.api]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    if (loading) return <PreLoader />;

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('custom-container')}>
                <div className={cx('section-title')}>
                    <span className={cx('sub-title')}>{type.subTitle}</span>
                    <h1 className={cx('title')}>{type.title}</h1>
                </div>
                {isGrid ? (
                    <>
                        <MovieGrid movies={movies} className={cx('list-item')} />
                        {page < totalPage ? (
                            <div className={cx('btn-loadmore')}>
                                <Button secondary onClick={handleLoadMore}>
                                    load more
                                </Button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <MovieSlider movies={movies} className={cx('list-item')} />
                )}
            </Container>
        </div>
    );
}

export default MovieContainer;
