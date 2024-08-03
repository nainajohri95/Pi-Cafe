import React from 'react'
import { RxCross2 } from "react-icons/rx";
import ActionButton from '../../Global/ActionButton';
import { HandleGenerateOrder } from '../../../Helper/HandleGenerateOrder.Helper';

export const TransactionFailed = ({orderItems, order, setOrder, setModalType, setOpenModal, loading, setLoading, selectedPaymentType,showError, setShowError }) => {
  return (
    <div className='p-5 flex flex-col items-center'>
       <RxCross2 className='text-white text-6xl bg-red-500 rounded-full'/>
      <h1 className='text-xl text-secondary font-medium mt-10'>Transaction Failed</h1>
      <div className='flex w-full justify-between mt-12 items-center'>
        <button onClick={()=>setOpenModal(false)} className='w-[45%] border-secondary border hover:bg-gray-200 text-secondary rounded  font-medium text-lg px-3 py-[12px] text-center'>Cancel</button>
       <div className='w-[45%]'> <ActionButton loading={loading} text={"Retry"} onClickButton={()=>HandleGenerateOrder(selectedPaymentType, setShowError, order, setOrder, orderItems, setModalType, setLoading)}/></div>
      </div>
    </div>
  )
}
