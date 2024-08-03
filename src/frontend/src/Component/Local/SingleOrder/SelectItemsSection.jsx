import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import CategoryCard from "./CategoryCard";


const SelectItemsSection = ({ categoriesData, cartItems, setCartItems }) => {
    const [itemsData, setItemsData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(()=>{
        const extractedItems = Object.values(categoriesData)?.reduce((accumulator, category) => {
            return [...accumulator, ...category];
        }, []);
        setItemsData(extractedItems)
    }, [categoriesData])
  return (
   
      <div className="w-[100%]">
        <div
          style={{
            overflowX: "scroll",
            flex: "none",
            flexWrap: "nowrap",
            msOverflowStyle: "none" /* Internet Explorer 10+ */,
            scrollbarWidth: "none" /* Firefox */,
            WebkitScrollbar: {
              display: "none" /* WebKit */,
            },
          }}
          className="w-full flex items-center space-x-7"
        >
          {categoriesData &&
            Object.entries(categoriesData)?.map(([category, item]) => (
              <CategoryCard  category={category} item={item} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setItemsData={setItemsData} />
            ))}
        </div>
        <div className="w-full mt-10 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {
            itemsData && itemsData?.map((items, ind)=>(
                <ItemCard cartItems={cartItems} setCartItems={setCartItems} itemDetails={items} key={ind}/>
            ))
          }
        </div>
      </div>
  );
};

export default SelectItemsSection;
