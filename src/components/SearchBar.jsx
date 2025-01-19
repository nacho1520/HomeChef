import searchIcon from '../assets/Search.svg';

const SearchBar = () => {
    return(
        <div className='flex flex-row items-center w-[432px] border-2 border-[#394150] py-3 pl-6 rounded-[50px] gap-3'>
            <img src={ searchIcon } className='size-6'/>
            <input 
                className='bg-transparent w-full outline-none text-[#394150] placeholder-[#394150] font-medium text-base'
                placeholder='Search recipes and more...'    
            />
        </div>
    );
};

export default SearchBar;