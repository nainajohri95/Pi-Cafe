import { HandleConfirmEmployee } from "../../Helper/HandleConfirmEmployee";
import { HandleValidateEmployeeForm } from "../../Helper/HandleValidateEmployeeForm";
import { CreateEmployee } from "../../Services/CreateEmployee.Services";
import { EditEmployee } from "../../Services/EditEmployee.Services";
import toast from "react-hot-toast";

// Mock the dependencies
jest.mock("../../Helper/HandleValidateEmployeeForm");
jest.mock("../../Services/CreateEmployee.Services");
jest.mock("../../Services/EditEmployee.Services");
jest.mock("react-hot-toast");

describe("HandleConfirmEmployee", () => {
  const setErrorMsg = jest.fn();
  const setLoading = jest.fn();
  const setEmployeeAdded = jest.fn();
  const setEmployeeDetails = jest.fn();
  const errorMsg = "Error message";
  const store_Id = "store123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should validate the form and return if validation fails", async () => {
    HandleValidateEmployeeForm.mockReturnValue(false);

    await HandleConfirmEmployee({}, setErrorMsg, errorMsg, "Add", setLoading, store_Id, setEmployeeAdded, setEmployeeDetails);

    expect(HandleValidateEmployeeForm).toHaveBeenCalled();
    expect(CreateEmployee).not.toHaveBeenCalled();
    expect(EditEmployee).not.toHaveBeenCalled();
  });

  it("should call CreateEmployee and set employee details if type is Add", async () => {
    const formData = { name: "John Doe" };
    const employeeData = { employeeId: "emp123" };

    HandleValidateEmployeeForm.mockReturnValue(true);
    CreateEmployee.mockResolvedValue(employeeData);

    await HandleConfirmEmployee(formData, setErrorMsg, errorMsg, "Add", setLoading, store_Id, setEmployeeAdded, setEmployeeDetails);

    expect(CreateEmployee).toHaveBeenCalledWith(formData, setLoading, store_Id);
    expect(setEmployeeDetails).toHaveBeenCalledWith(employeeData);
    expect(setEmployeeAdded).toHaveBeenCalledWith(true);
  });

  it("should call EditEmployee and set employee details if type is Edit", async () => {
    const formData = { name: "Jane Doe" };
    const employeeData = { employeeId: "emp456" };

    HandleValidateEmployeeForm.mockReturnValue(true);
    EditEmployee.mockResolvedValue(employeeData);

    await HandleConfirmEmployee(formData, setErrorMsg, errorMsg, "Edit", setLoading, store_Id, setEmployeeAdded, setEmployeeDetails);

    expect(EditEmployee).toHaveBeenCalledWith(formData, setLoading, store_Id);
    expect(setEmployeeDetails).toHaveBeenCalledWith(employeeData);
    expect(setEmployeeAdded).toHaveBeenCalledWith(true);
  });

  it("should show toast error if result does not have employeeId", async () => {
    const formData = { name: "Invalid Employee" };
    const errorResponse = "An error occurred";

    HandleValidateEmployeeForm.mockReturnValue(true);
    CreateEmployee.mockResolvedValue(errorResponse);

    await HandleConfirmEmployee(formData, setErrorMsg, errorMsg, "Add", setLoading, store_Id, setEmployeeAdded, setEmployeeDetails);

    expect(CreateEmployee).toHaveBeenCalledWith(formData, setLoading, store_Id);
    expect(toast.error).toHaveBeenCalledWith(errorResponse);
    expect(setEmployeeDetails).not.toHaveBeenCalled();
    expect(setEmployeeAdded).not.toHaveBeenCalled();
  });
});
