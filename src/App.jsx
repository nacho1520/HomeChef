import { useState } from "react";

import Header from "./components/Header";
import CategoriesList from "./components/CategoriesList";

const App = () => {
  const [ selectedCategory, setSelectedCategory ] = useState({
    id: 3,
  });

  const handleCategorySelection = (categoryId) => {
    setSelectedCategory({ id: +categoryId });
  };

  return (
    <>
      <Header />
      <section className="pt-8 px-6">
        <CategoriesList 
          selectedCategory={ selectedCategory }
          onSelect={ handleCategorySelection }
        />
      </section>
    </>
  );
}

export default App;
