import { useState, useEffect, useContext } from "react";

import { RecipesContext } from "../store/recipes-context.jsx";
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

const CategoriesList = () => {
  const { categorySelected, selectCategory } = useContext(RecipesContext);
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
    <aside className="font-body w-1/3">
      <h2 className="font-title text-2xl font-semibold">Categories</h2>
      <ul className="pt-8 flex flex-col gap-3">
        {categories.length !== 0 &&
          categories.slice(0,6).map((category) => {

            return (
              <li key={category.idCategory}>
                <CategoryButton
                  category={ category }
                  selectedCategory={ categorySelected }
                  onClick={() => selectCategory(category)}
                >
                  <div className="flex flex-row h-full items-center relative overflow-hidden">
                    <img
                        src={category.strCategoryThumb}
                        className="w-[87px] h-[55px] absolute -left-8"
                      />
                      <p className="ml-16 text-xs font-semibold">
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
