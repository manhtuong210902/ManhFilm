import WatchMovie from '~/components/WatchMovie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PreLoader from '~/components/PreLoader';
import { API_KEY, BASE_URL } from '~/utils/constant';
import MovieContainer from '~/components/MovieContainer';
import Comment from '~/components/Comment';

function Watch() {
    const { media_type, id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [searchParam] = useSearchParams();
    const episode = searchParam.get('episode') || 1;
    const [type, setType] = useState({});
    const api =
        media_type === 'tv'
            ? `${BASE_URL}/${media_type}/${id}/season/1/episode/${episode}`
            : `${BASE_URL}/${media_type}/${id}`;

    useEffect(() => {
        setType({
            type: `${media_type}`,
            title: 'Similar',
            subTitle: 'Similar movie genres',
            api: `${BASE_URL}/${media_type}/${id}/similar?api_key=${API_KEY}`,
        });
    }, [media_type, id]);

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
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [episode, api]);

    if (loading) return <PreLoader />;
    return (
        <>
            <WatchMovie data={data} />
            <Comment movie_id={data.id} />
            {media_type === 'tv' ? <MovieContainer type={type} /> : <></>}
        </>
    );
}

export default Watch;
