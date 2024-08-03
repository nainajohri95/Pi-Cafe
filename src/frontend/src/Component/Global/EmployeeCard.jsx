import React from 'react'
import ActionButton from './ActionButton'
import { useNavigate } from 'react-router-dom'

const EmployeeCard = ({employee}) => {
  const navigate = useNavigate();
  const employeeDetails = {Name: employee.name, Salary: employee.salary, Role: employee.position, EmpId: employee.employee_id}
  const queryData = encodeURIComponent(JSON.stringify(employeeDetails));
  return (
    <div className='bg-gray-300 rounded-lg p-8 flex flex-col items-center'>
        <h1 className='text-secondary font-medium text-xl'>EMP ID: {employee.employee_id}</h1>
         <div className='flex flex-col w-full mt-5 '>
           {
             Object.entries(employeeDetails)?.map(([key, value]) => {
              if(key === "EmpId"){return <></>}
              return (<div className='flex justify-between w-full items-center my-2'><h1 className='text-secondary font-semibold text-xl'>{key}</h1><h1 className='text-secondary font-medium text-xl'>{key === "Salary" ? ` ₹${value}`: value}</h1></div>)
          })
           }
         </div>
         <div className='mt-5 w-full flex items-center justify-between'>
          <button onClick={()=>navigate(`/edit-employee?employeeData=${queryData}`)} className='w-[45%] hover:bg-gray-400 border border-secondary text-secondary rounded  font-medium text-lg px-3 py-[12px] text-center'>Edit</button>
          <div className='w-[45%]'><ActionButton text={"Delete"} onClickButton={()=>navigate(`/delete-employee?employeeData=${queryData}`)} bgColor='red-500' hoverColor='red-400' /></div>
         </div>
    </div>
  )
}

export default EmployeeCard