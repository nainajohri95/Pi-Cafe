import React from 'react'
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

export const TransactionComplete = () => {
  const navigate = useNavigate();
  const orderId = localStorage.getItem("orderId")
  return (
    <div className='p-5 flex flex-col items-center'>
      <TiTick className='text-white text-6xl bg-green-500 rounded-full'/>
      <h1 className='text-xl text-secondary font-medium mt-10'>Transaction completed successfully</h1>
      <button onClick={()=>navigate(`/customer-feedback?orderId=${orderId}`)} className='rounded-lg bg-gray-200 font-medium text-lg text-secondary py-3 px-4 w-40 mt-12 hover:bg-gray-300'>OK</button>
    </div>
  )
}
