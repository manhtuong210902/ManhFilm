import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { privateRoutes, publicRoutes } from './routes';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.search, location.pathname]);

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    <Route element={<PrivateRoute />}>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
