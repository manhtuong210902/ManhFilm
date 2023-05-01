import config from '~/config';
import Home from '~/pages/Home';
import Movies from '~/pages/Movies';
import TVShow from '~/pages/TVShow';
import Details from '~/pages/Details';
import Watch from '~/pages/Watch';
import Search from '~/pages/Search';
import MyFavorites from '~/pages/MyFavorites';

//Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.movies, component: Movies },
    { path: config.routes.tvshow, component: TVShow },
    { path: config.routes.details, component: Details },
    { path: config.routes.watch, component: Watch },
    { path: config.routes.search, component: Search },
];

const privateRoutes = [{ path: config.routes.favorites, component: MyFavorites }];

export { publicRoutes, privateRoutes };
