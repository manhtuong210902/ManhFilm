import Breadcrumb from '~/components/Breadcrumb';
import { TV_TYPE } from '~/utils/constant';
import MovieContainer from '~/components/MovieContainer';

function TVShow() {
    const data = {
        title: 'TV',
        titleActive: 'Show',
        branch: 'TV Show',
    };
    return (
        <>
            <Breadcrumb data={data} />
            <MovieContainer type={TV_TYPE.onTheAir} isGrid />
        </>
    );
}

export default TVShow;
