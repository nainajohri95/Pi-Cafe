import { HomePage, PageNotFound, OrderHistory, OrderSummary,  CustomerFeedback, EmployeeManagement, DeleteEmployee, CreateEmployee, EditEmployee } from "../../RoutesNavigation/pageImport";

export const routePath = (props) => [
  { path: "/", element: <HomePage {...props} /> },
  { path: "/order-summary", element: <OrderSummary {...props} /> },
  { path: "/order-history", element: <OrderHistory {...props} /> },
  { path: "/customer-feedback", element: <CustomerFeedback {...props}/>},
  { path: "/employee-management", element: <EmployeeManagement {...props}/>},
  { path: "/edit-employee", element: <EditEmployee {...props}/>},
  { path: "/create-employee", element: <CreateEmployee {...props}/>},
  { path: "/delete-employee", element: <DeleteEmployee {...props}/>},
  { path: "*", element: <PageNotFound {...props} /> }
]
