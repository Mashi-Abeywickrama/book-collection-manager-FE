import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-5">
                    <img src="/logo192.png" alt="Logo" className="w-1/4" />
                </div>
                <h3 className="text-2xl font-semibold text-center">Welcome Back!</h3>
                <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email Address
                        </label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className='mt-2'>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>

                    <p className="text-center text-gray-600">
                        Don't have an account yet?{' '}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
