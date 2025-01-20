import expandDown from '../assets/Expand_down.svg';

const Dropdown = ({ selectedValue }) => {
    return(
        <button className="flex flex-row items-center gap-2 bg-[#E5E7EB] rounded-[50px] px-6 py-3">
            <p className='font-body text-base font-medium text-[#0E1325]'>Sort by: { selectedValue }</p>
            <img src={ expandDown } />
        </button>
    );
};

export default Dropdown;