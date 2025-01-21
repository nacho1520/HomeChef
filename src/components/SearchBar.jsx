import { useContext } from 'react';

import { RecipesContext } from '../store/recipes-context';
import searchIcon from '../assets/Search.svg';

const SearchBar = () => {
    const { searchQuery, writeSearchInput } = useContext(RecipesContext);

    return(
        <div className='flex flex-row items-center w-[432px] border-2 border-[#394150] py-3 pl-6 rounded-[50px] gap-3'>
            <img 
                src={ searchIcon } 
                className='size-6'
            />
            <input 
                className='bg-transparent w-full outline-none text-[#394150] placeholder-[#394150] font-medium text-base'
                placeholder='Search recipes and more...'  
                value={ searchQuery } 
                onChange={ (event) => writeSearchInput(event.target.value) } 
            />
        </div>
    );
};

export default SearchBar;