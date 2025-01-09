import heroImg from '../assets/hero-image.jpg';
import heroText from '../assets/hero-text.png';

const Header = () => {
    return(
        <div className='flex justify-center w-full p-3 relative h-[420px]'>
            <img src={ heroImg } className='rounded-xl w-full h-full object-cover' />
            <img src={ heroText } className='absolute right-56 top-16'/>
        </div>    
    );
};

export default Header;