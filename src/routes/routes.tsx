import { Route } from 'react-router-dom';
import { HOME, LOGIN , SIGNUP} from '../utils/constants';
import { HomePage } from '../pages/homePage';
import RootLayout from '../layouts/rootLayout';
import LoginPage from '../pages/loginPage';
import SignUpPage from '../pages/signUpPage';

const Routes = (
    <Route path="/" element={<RootLayout />}>
        {HOME.map((path) => (
            <Route key={path} path={path} element={<HomePage />} />
        ))}
           <Route path={LOGIN} element={<LoginPage />}/>
            <Route path={SIGNUP} element={<SignUpPage />} />
           <Route path="*" element={<div>Not Found</div>} />
    </Route>
);

export default Routes;
