import React from 'react'
import { TiTick } from "react-icons/ti";
import ActionButton from './ActionButton';
import { useNavigate } from 'react-router-dom';

const EmployeeSuccessfulModal = ({successMsg, data}) => {
    const navigate = useNavigate();
  return (
    <div className='lg:w-[800px] w-[500px] p-8 rounded-lg bg-white shadow flex flex-col items-center'>
         <TiTick className='text-white text-6xl bg-green-500 rounded-full'/>
         <h1 className='text-2xl text-secondary font-medium mt-10'>{successMsg}</h1>
         {
            data && <div className='bg-gray-300 flex w-[80%] mt-10 flex-col p-8 rounded-lg'>
                {
                    Object.entries(data)?.map(([key, value])=>{
                        if(key === "EmpId"){return <></>}
                        return (<div className='flex justify-between w-full items-center my-2'><h1 className='text-secondary font-semibold text-2xl'>{key}</h1><h1 className='text-secondary font-medium text-xl'>{key === "Salary" ? ` ₹${value}`: value}</h1></div>)
                    })
                }
            </div>
         }
         <div className='w-40 mb-5 mt-12'><ActionButton text={"Go back"} bgColor='green-500' hoverColor='green-300' onClickButton={()=>navigate('/employee-management')}/></div>
    </div>
  )
}

export default EmployeeSuccessfulModal