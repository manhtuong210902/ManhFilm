import Banner from '~/components/Banner';
import MovieContainer from '~/components/MovieContainer';
import { MOVIE_TYPE, TV_TYPE } from '~/utils/constant';

function Home() {
    return (
        <>
            <Banner />
            <MovieContainer type={MOVIE_TYPE.trending} />
            <MovieContainer type={MOVIE_TYPE.popular} />
            <MovieContainer type={MOVIE_TYPE.topRated} />
            <MovieContainer type={TV_TYPE.trending} />
            <MovieContainer type={TV_TYPE.popular} />
            <MovieContainer type={TV_TYPE.topRated} />
        </>
    );
}

export default Home;
