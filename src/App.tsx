import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Routes from './routes/routes';

const App = () => {
    const router = createBrowserRouter(createRoutesFromElements(Routes));

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
