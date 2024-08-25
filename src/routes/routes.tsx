import { Route } from 'react-router-dom';
import { HOME, LOGIN, SIGNUP } from '../utils/constants';
import { HomePage } from '../pages/homePage';
import RootLayout from '../layouts/rootLayout';
import LoginPage from '../pages/loginPage';
import SignUpPage from '../pages/signUpPage';
import ProtectedRoute from '../components/protectedRoutes';

const Routes = (
    <Route path="/" element={<RootLayout />}>
        {LOGIN.map((path) => (
            <Route key={path} path={path}
                element={<LoginPage />} />
        ))}
        <Route path={HOME} element={
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>} />
        <Route path={SIGNUP} element={<SignUpPage />} />
        <Route path="*" element={<div> Page Not Found</div>} />
    </Route>
);

export default Routes;
