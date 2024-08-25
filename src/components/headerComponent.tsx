export const HeaderComponent = () => {
    return (
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-12 h-[70px]">
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
                    <button className="text-white px-2 md:px-4 font-semibold">
                        Signup
                    </button>
                    <button className="text-white px-2 md:px-4 font-semibold">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
