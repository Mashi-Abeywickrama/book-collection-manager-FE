import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Routes from './routes/routes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkTokenExpiration } from './store/authSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkTokenExpiration());
    }, [dispatch]);

    const router = createBrowserRouter(createRoutesFromElements(Routes));

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
