import classNames from 'classnames/bind';
import styles from './ListMovie.module.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '~/utils/constant';

const cx = classNames.bind(styles);

function ListMovie() {
    const { media_type, id } = useParams();
    const [, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const api =
        media_type === 'tv' ? `${BASE_URL}/${media_type}/${id}/season/1` : `${BASE_URL}/${media_type}/${id}/similar`;
    const handleOnClick = (mediaType, movie) => {
        if (mediaType === 'tv') {
            setSearchParams({ episode: movie.episode_number || 1 });
        } else {
            navigate(`/details/${mediaType}/${movie.id}`);
        }
    };

    useEffect(() => {
        axios
            .get(api, {
                params: {
                    api_key: API_KEY,
                },
            })
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                if (media_type === 'tv') {
                    setData(data.episodes);
                } else {
                    setData(data.results);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [api, media_type]);

    return (
        <div className={cx('list-moive')}>
            {data.map((movie) => {
                const src = movie.backdrop_path ? movie.backdrop_path : movie.still_path;
                const title = movie.title ? movie.title : movie.name;
                return (
                    <div
                        className={cx('movie-item')}
                        key={movie.id}
                        onClick={() => {
                            handleOnClick(media_type, movie);
                        }}
                    >
                        <img src={`https://image.tmdb.org/t/p/w200/${src}`} alt="" className={'img-fluid'} />
                        <div className={cx('movie-name')}>
                            <h1>{movie.episode_number ? `Episode ${movie.episode_number}` : ''}</h1>
                            <h3>{title}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ListMovie;
