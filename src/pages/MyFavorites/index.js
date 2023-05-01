import Breadcrumb from '~/components/Breadcrumb';
import Favorites from '~/components/Favorites';
import images from '~/assets/images';

function MyFavorites() {
    const data = {
        title: 'My',
        titleActive: 'Favorites',
        branch: 'favorites',
        image: images.breadcrum_2,
    };

    return (
        <>
            <Breadcrumb data={data} />
            <Favorites />
        </>
    );
}

export default MyFavorites;
