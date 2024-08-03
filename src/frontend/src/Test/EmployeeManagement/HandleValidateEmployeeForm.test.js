import { HandleValidateEmployeeForm } from "../../Helper/HandleValidateEmployeeForm";

describe("HandleValidateEmployeeForm", () => {
  let setErrorMsg;
  let errorMsg;

  beforeEach(() => {
    setErrorMsg = jest.fn();
    errorMsg = {
      Name: "",
      Salary: "",
      Password: ""
    };
  });

  it("should return false and set error message if Name is not provided", () => {
    const formData = { Salary: "1000", Password: "password123" };

    const result = HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg);

    expect(result).toBe(false);
    expect(setErrorMsg).toHaveBeenCalledWith({
      Name: "kindly enter employee's Name",
      Salary: "",
      Password: ""
    });
  });

  it("should return false and set error message if Name is too short", () => {
    const formData = { Name: "Jo", Salary: "1000", Password: "password123" };

    const result = HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg);

    expect(result).toBe(false);
    expect(setErrorMsg).toHaveBeenCalledWith({
      Name: "Name too short, must be atleast 3 letters",
      Salary: "",
      Password: ""
    });
  });

  it("should return false and set error message if Salary is not provided", () => {
    const formData = { Name: "John Doe", Password: "password123" };

    const result = HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg);

    expect(result).toBe(false);
    expect(setErrorMsg).toHaveBeenCalledWith({
      Name: "",
      Salary: "Kindly enter employee's Salary",
      Password: ""
    });
  });

  it("should return false and set error message if Salary is not valid", () => {
    const formData = { Name: "John Doe", Salary: "-100", Password: "password123" };

    const result = HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg);

    expect(result).toBe(false);
    expect(setErrorMsg).toHaveBeenCalledWith({
      Name: "",
      Salary: "Enter valid amount",
      Password: ""
    });
  });

  it("should return false and set error message if Password is not provided", () => {
    const formData = { Name: "John Doe", Salary: "1000" };

    const result = HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg);

    expect(result).toBe(false);
    expect(setErrorMsg).toHaveBeenCalledWith({
      Name: "",
      Salary: "",
      Password: "Kindly enter employee's Password"
    });
  });

  it("should return false and set error message if Password is too short", () => {
    const formData = { Name: "John Doe", Salary: "1000", Password: "pass" };

    const result = HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg);

    expect(result).toBe(false);
    expect(setErrorMsg).toHaveBeenCalledWith({
      Name: "",
      Salary: "",
      Password: "Password too short, must be of atleast 8 characters "
    });
  });

  it("should return true and clear error messages if all validations pass", () => {
    const formData = { Name: "John Doe", Salary: "1000", Password: "password123" };

    const result = HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg);

    expect(result).toBe(true);
    expect(setErrorMsg).toHaveBeenCalledWith({
      Name: "",
      Salary: "",
      Password: ""
    });
  });
});
