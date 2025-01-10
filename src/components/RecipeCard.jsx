const RecipeCard = ({ title, image, ...props }) => {
    return(
        <div 
            className="w-64 h-56 p-3 bg-[#394150] rounded-xl cursor-pointer"
            { ...props }
        >
            <img 
                src={ image } 
                className="w-full h-3/4 object-cover mb-3 rounded-lg" 
            />
            <p>{ title }</p>
        </div>
    );
};

export default RecipeCard;