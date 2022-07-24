import Breadcrumb from '~/components/Breadcrumb';
import MovieContainer from '~/components/MovieContainer';
import { MOVIE_TYPE } from '~/utils/constant';

function Movies() {
    const data = {
        title: 'Our',
        titleActive: 'Movies',
        branch: 'Movies',
    };
    return (
        <>
            <Breadcrumb data={data} />
            <MovieContainer type={MOVIE_TYPE.upComing} isGrid />
        </>
    );
}

export default Movies;
