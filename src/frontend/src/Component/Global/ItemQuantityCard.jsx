import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { UpdateCartItems } from '../../Helper/UpdateCartItems.Helper';
import { UpdateQuantity } from '../../Helper/UpdateQuantity.Helper';

const ItemQuantityCard = ({itemDetails, cartItems, setCartItems, disabledUpdateQuantity}) => {
  return (
    <div className={` ${disabledUpdateQuantity ? 'grid grid-cols-3 gap-3 w-full place-items-center' : 'flex flex-row w-full items-start justify-between '} py-4 border-b border-secondary`}>
        <div className={`${disabledUpdateQuantity ? '' : 'w-[30%] mx-auto'} `}>
            <h1 className='text-secondary 2xl:text-2xl text-lg  font-medium'>{itemDetails?.name}</h1>
        </div>
        {
          disabledUpdateQuantity && <div className='text-secondary font-medium text-2xl'>{itemDetails?.quantity}</div>
        }
        <div className={`${disabledUpdateQuantity ? '' : 'flex flex-col w-[70%] items-end'}  `}>
            <p className='text-secondary  2xl:text-2xl text-lg  font-medium'>₹ {itemDetails?.price}</p>
            {
              !disabledUpdateQuantity && <div className='flex lg:mt-2 mt-5 items-center space-x-4'>
              <div className='flex items-center w-36 justify-between  py-2 px-4 rounded-lg bg-gray-200'>
              <FaMinus onClick={()=>UpdateQuantity(cartItems, setCartItems, itemDetails, -1 )} className='text-2xl text-secondary cursor-pointer'/>
              <p className='text-xl text-gray-500 font-medium'>{itemDetails?.quantity}</p>
              <FaPlus onClick={()=>UpdateQuantity(cartItems, setCartItems, itemDetails, 1)} className='text-2xl text-secondary cursor-pointer'/>
              </div>
          <MdDelete onClick={()=>UpdateCartItems({itemDetails,cartItems,setCartItems })} className='text-3xl cursor-pointer text-red-600'/>
          </div>
            }
        </div>
    </div>
  )
}

export default ItemQuantityCard