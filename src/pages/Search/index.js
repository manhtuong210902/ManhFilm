import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import MovieContainer from '~/components/MovieContainer';
import { API_KEY, BASE_URL } from '~/utils/constant';

function Search() {
    const { result } = useParams();
    const data = {
        title: 'Search',
        titleActive: `"${result}"`,
        branch: 'search',
    };
    const type = {
        type: 'movie',
        title: `Results for "${result}"`,
        subTitle: 'search on ManhFilm',
        api: `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${result}`,
    };
    return (
        <>
            <Breadcrumb data={data} />
            <MovieContainer type={type} isGrid />
        </>
    );
}

export default Search;
