import { Route } from 'react-router-dom';
import { HOME } from '../utils/constants';
import { HomePage } from '../pages/homePage';
import RootLayout from '../layouts/rootLayout';

const Routes = (
    <Route path="/" element={<RootLayout />}>
        {HOME.map((path) => (
            <Route key={path} path={path} element={<HomePage />} />
        ))}
    </Route>
);

export default Routes;
