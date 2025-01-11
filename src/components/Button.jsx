const Button = ({ children, ...props }) => {
    return(
        <button
            className="flex justify-center items-center w-[213px] h-12 bg-[#E5E7EB] rounded-[50px] text-[#0E1325] font-medium text-base" 
            { ...props }
        >
            { children }
        </button>
    );
};

export default Button;