import React from "react";

const CategoryCard = ({ category, item, setItemsData, selectedCategory, setSelectedCategory }) => {
  return (
    <div onClick={()=>{
        setItemsData(item);
        setSelectedCategory(category)
    }} className={`${selectedCategory === category ? 'bg-gray-400' : 'bg-gray-200'} w-[200px] shadow-md cursor-pointer py-5 px-6 h-[100px] hover:bg-gray-400 flex items-center flex-none justify-center font-medium text-xl bg-gray-200 border rounded-lg border-gray-400`}>
      {category}
    </div>
  );
};

export default CategoryCard;
