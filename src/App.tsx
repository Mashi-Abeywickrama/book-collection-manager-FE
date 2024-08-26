import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Routes from './routes/routes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkTokenExpiration } from './store/authSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkTokenExpiration());
    }, [dispatch]);

    const router = createBrowserRouter(createRoutesFromElements(Routes));

    return (
        <>
        <ToastContainer 
            position='top-center'
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>

            <RouterProvider router={router} />
        </>
    );
};

export default App;
