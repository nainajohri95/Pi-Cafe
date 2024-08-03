import React from 'react'
import { UpdateCartItems } from '../../../Helper/UpdateCartItems.Helper'

const ItemCard = ({itemDetails, cartItems, setCartItems}) => {
  const itemIndex = cartItems.findIndex(
    (item) => item.id === itemDetails.id  );
  return (
    <div onClick={()=>UpdateCartItems({itemDetails, cartItems, setCartItems})} className={`${itemIndex !== -1 ? 'bg-hoverPrimary' : 'bg-white'} shadow-md border-2 border-primary hover:bg-hoverPrimary cursor-pointer py-5 px-6 rounded-lg flex flex-col items-start`}>
        <h1 className='text-secondary 2xl:text-2xl text-lg font-medium'>{itemDetails?.name}</h1>
        <p className='2xl:text-2xl text-lg font-500 text-gray-500 mt-2 '>₹ { itemDetails?.price}</p>
    </div>
  )
}

export default ItemCard