import { lazy } from "react";

const HomePage = lazy(() => import('../Pages/Homepage'));
const OrderSummary = lazy(()=> import('../Pages/OrderSummary'));
const OrderHistory = lazy(()=>import('../Pages/OrderHistory'));
const PageNotFound = lazy(() => import('../Pages/PageNotFound'));
const CustomerFeedback = lazy(()=>import('../Pages/CustomerFeedback'));
const EmployeeManagement = lazy(()=>import('../Pages/EmployeeManagement'))
const DeleteEmployee = lazy(()=>import('../Pages/DeleteEmployee'));
const CreateEmployee = lazy(()=>import('../Pages/CreateEmployee'));
const EditEmployee = lazy(()=>import('../Pages/EditEmployee'))

export {HomePage,PageNotFound, OrderHistory, OrderSummary, CustomerFeedback, EmployeeManagement, DeleteEmployee, CreateEmployee, EditEmployee}
