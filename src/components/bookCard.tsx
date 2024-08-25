export const BookCard: React.FC = () => {
    return (
        <>
            <div
                className="w-[15rem] h-[23rem] m-[1rem] rounded-lg shadow-lg shadow-black md:shadow-xl md:shadow-black-500 cursor-pointer dark:md:hover:bg-[#EEEEEE] transition-transform duration-100 ease-in-out transform hover:scale-105"
                data-testid="product-card"
            >
                <img
                    src="/logo512.png"
                    alt=""
                    className="w-[15rem] h-[15rem] flex items-center"
                />
                <div className="flex flex-col items-center px-[1rem]">
                    <p className="text-[1.3rem] font-bold">Me Before You</p>
                    <p className="text-center px-[0.5rem]">Jojo Moyes</p>
                </div>
            </div>
        </>
    );
};
