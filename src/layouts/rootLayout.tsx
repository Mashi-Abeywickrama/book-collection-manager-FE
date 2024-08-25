import { Outlet } from 'react-router-dom';
import { HeaderComponent } from '../components/headerComponent';

function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white">
                <nav>
                    <HeaderComponent />
                </nav>
            </header>

            <main className="flex-grow bg-gray-100 p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;
