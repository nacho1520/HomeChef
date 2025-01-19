import { useState, useEffect } from "react";

import { fetchData } from "../http.js";

const CategoryButton = ({ category, selectedCategory, children, ...props }) => {
  let cssClass = "border border-[#394150] w-[260px] h-14 rounded-xl";
  if (+category.idCategory === selectedCategory.id) {
    cssClass += " bg-[#FEBD2E] text-[#0E1325]";
  } else {
    cssClass += " bg-[#0E1325]";
  }

  return <button className={ cssClass } {...props}>{children}</button>;
};

const CategoriesList = ({ selectedCategory, onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await fetchData("categories");

        setCategories(categoriesData.categories);
      } catch (error) {
        // console.log(error.message);
      }
    }

    fetchCategories();
  }, []);

  return (
    <aside className="font-body">
      <h2 className="font-title text-2xl font-semibold">Categories</h2>
      <ul className="pt-8 flex flex-col gap-3">
        {categories.length !== 0 &&
          categories.map((category) => {
            
            return (
              <li key={category.idCategory}>
                <CategoryButton
                  category={ category }
                  selectedCategory={ selectedCategory }
                  onClick={() => onSelect(category)}
                >
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src={category.strCategoryThumb}
                      className="w-11 h-full"
                    />
                    <p className="text-xs font-semibold">
                      {category.strCategory}
                    </p>
                  </div>
                </CategoryButton>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default CategoriesList;
