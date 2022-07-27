import DetailsMovie from '~/components/DetailsMovie';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '~/utils/constant';
import PreLoader from '~/components/PreLoader';
import MovieContainer from '~/components/MovieContainer';
import Trailer from '~/components/Trailer';

function Details() {
    const params = useParams();
    const { media_type, id } = params;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/${media_type}/${id}`, {
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
                console.log(err);
                setLoading(false);
            });

        axios
            .get(`${BASE_URL}/${media_type}/${id}/videos?api_key=${API_KEY}`)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                const trailer = [];
                data.results.forEach((video) => {
                    if (video.type === 'Trailer') {
                        trailer.push(video);
                    }
                });
                setVideos(trailer);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, media_type]);

    const movieType = {
        type: `${media_type}`,
        title: 'Similar',
        subTitle: 'Similar movie genres',
        api: `${BASE_URL}/${media_type}/${id}/similar?api_key=${API_KEY}`,
    };

    if (loading) return <PreLoader />;

    return (
        <>
            <DetailsMovie data={data} />
            {videos.length > 0 ? <Trailer videos={videos} /> : <></>}
            <MovieContainer type={movieType} />
        </>
    );
}

export default Details;
