import { HandleDeleteEmployee } from "../Helper/HandleDeleteEmployee.Helper";
import { LoginService } from "../Services/Login.Services";
import { DeleteEmployee } from "../Services/DeleteEmployee.Services";
import toast from "react-hot-toast";

// Mocking dependencies
jest.mock("../Services/Login.Services");
jest.mock("../Services/DeleteEmployee.Services");
jest.mock("react-hot-toast");

describe("HandleDeleteEmployee", () => {
  let setErrorMsg;
  let setLoading;
  let setDeleted;

  beforeEach(() => {
    setErrorMsg = jest.fn();
    setLoading = jest.fn();
    setDeleted = jest.fn();
  });

  test("should set error message for invalid password", async () => {
    await HandleDeleteEmployee(setErrorMsg, "123", "employeeId", setLoading, "userId", setDeleted);
    expect(setErrorMsg).toHaveBeenCalledWith("Enter valid password");
  });

  test("should set error message for invalid password (empty)", async () => {
    await HandleDeleteEmployee(setErrorMsg, "", "employeeId", setLoading, "userId", setDeleted);
    expect(setErrorMsg).toHaveBeenCalledWith("Enter valid password");
  });

  test("should call LoginService and handle invalid login", async () => {
    LoginService.mockResolvedValue(false);
    await HandleDeleteEmployee(setErrorMsg, "password123", "employeeId", setLoading, "userId", setDeleted);
    expect(LoginService).toHaveBeenCalledWith({ userId: "userId", password: "password123", setLoading });
    expect(setErrorMsg).toHaveBeenCalledWith("Invalid password, kindly enter correct password");
  });

  test("should call DeleteEmployee and handle successful deletion", async () => {
    LoginService.mockResolvedValue(true);
    DeleteEmployee.mockResolvedValue(true);
    await HandleDeleteEmployee(setErrorMsg, "password123", "employeeId", setLoading, "userId", setDeleted);
    expect(LoginService).toHaveBeenCalledWith({ userId: "userId", password: "password123", setLoading });
    expect(DeleteEmployee).toHaveBeenCalledWith("employeeId", setLoading);
    expect(setDeleted).toHaveBeenCalledWith(true);
    expect(toast.error).not.toHaveBeenCalled();
  });

  test("should call DeleteEmployee and handle deletion failure", async () => {
    LoginService.mockResolvedValue(true);
    DeleteEmployee.mockResolvedValue("Deletion failed");
    await HandleDeleteEmployee(setErrorMsg, "password123", "employeeId", setLoading, "userId", setDeleted);
    expect(LoginService).toHaveBeenCalledWith({ userId: "userId", password: "password123", setLoading });
    expect(DeleteEmployee).toHaveBeenCalledWith("employeeId", setLoading);
    expect(toast.error).toHaveBeenCalledWith("Deletion failed");
    expect(setDeleted).not.toHaveBeenCalled();
  });
});