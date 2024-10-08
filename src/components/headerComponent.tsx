import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

export const HeaderComponent = () => {
    const location = useLocation();
    const hideHeaderRoutes = ['/login', '/signup', '/'];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // Hide the header on specific routes
    if (hideHeaderRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-12 h-[70px] bg-black">
            <div className="flex gap-2 md:gap-3 items-center">
                <div className="cursor-pointer">
                    <img
                        className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
                        src="/logo512.png"
                        alt="logo"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <div className="flex space-x-2 md:space-x-4">
                    <button
                        className="text-black bg-white px-5 py-2 md:py-2 font-semibold rounded transition-transform duration-100 ease-in-out transform hover:scale-105"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
