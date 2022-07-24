export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'e9e9d8da18ae29fc430845952232787c';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export const BG_URL = 'https://image.tmdb.org/t/p/original';

export const MOVIE_TYPE = {
    trending: {
        type: 'movie',
        title: 'Trending Movies',
        subTitle: 'outline treaming',
        api: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
    },
    popular: {
        type: 'movie',
        title: 'Popular Movies',
        subTitle: 'outline treaming',
        api: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    },
    topRated: {
        type: 'movie',
        title: 'Top Rated Movies',
        subTitle: 'top online show',
        api: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    },
    upComing: {
        type: 'movie',
        title: 'Movies',
        subTitle: 'outline treaming',
        api: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
    },
};

export const TV_TYPE = {
    trending: {
        type: 'tv',
        title: 'Trending TV',
        subTitle: 'outline treaming',
        api: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,
    },
    popular: {
        type: 'tv',
        title: 'Popular TV',
        subTitle: 'outline treaming',
        api: `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
    },
    topRated: {
        type: 'tv',
        title: 'Top Rated TV',
        subTitle: 'top online show',
        api: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`,
    },
    onTheAir: {
        type: 'tv',
        title: 'TV Show',
        subTitle: 'outline treaming',
        api: `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`,
    },
};
