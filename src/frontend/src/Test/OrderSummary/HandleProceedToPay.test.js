import { HandleProceedToPay } from "../../Helper/HandleProceedToPay.Helper.js";
import toast from "react-hot-toast";
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

describe("HandleProceedToPay", () => {
  const setErrorMsgMock = jest.fn();
  const setOpenModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show error if customer name is missing", () => {
    const order = { customerId: "1234567890" };
    const errorMsg = { custName: "", custPhone: "" };
    HandleProceedToPay({
      order,
      setErrorMsg: setErrorMsgMock,
      errorMsg,
      setOpenModal: setOpenModalMock,
    });

    expect(setErrorMsgMock).toHaveBeenCalledWith({
      ...errorMsg,
      custName: "Customer name is required",
    });
  });

  it("should show error if customer name is less than 3 letters", () => {
    const order = { name: "Jo", customerId: "1234567890" };
    const errorMsg = { custName: "", custPhone: "" };

    HandleProceedToPay({
      order,
      setErrorMsg: setErrorMsgMock,
      errorMsg,
      setOpenModal: setOpenModalMock,
    });

    expect(setErrorMsgMock).toHaveBeenCalledWith({
      ...errorMsg,
      custName: "Name must be of atleast 3 letters",
    });
  });

  it("should show error if customer phone number is missing", () => {
    const order = { name: "John Doe" };
    const errorMsg = { custName: "", custPhone: "" };

    HandleProceedToPay({
      order,
      setErrorMsg: setErrorMsgMock,
      errorMsg,
      setOpenModal: setOpenModalMock,
    });

    expect(setErrorMsgMock).toHaveBeenCalledWith({
      ...errorMsg,
      custPhone: "Customer Phone Number is required",
    });
  });

  it("should show error if customer phone number is invalid", () => {
    const order = { name: "John Doe", customerId: "123" };
    const errorMsg = { custName: "", custPhone: "" };

    HandleProceedToPay({
      order,
      setErrorMsg: setErrorMsgMock,
      errorMsg,
      setOpenModal: setOpenModalMock,
    });

    expect(setErrorMsgMock).toHaveBeenCalledWith({
      ...errorMsg,
      custPhone: "kindly enter valid phone number",
    });
  });

  it("should show error toast if order mode is not selected", () => {
    const order = { name: "John Doe", customerId: "1234567890" };
    const errorMsg = { custName: "", custPhone: "" };

    HandleProceedToPay({
      order,
      setErrorMsg: setErrorMsgMock,
      errorMsg,
      setOpenModal: setOpenModalMock,
    });

    expect(toast.error).toHaveBeenCalledWith("kindly select order mode");
  });

  it("should open modal if all validations pass", () => {
    const order = {
      name: "John Doe",
      customerId: "1234567890",
      orderMode: "Dine-In",
    };
    const errorMsg = { custName: "", custPhone: "" };

    HandleProceedToPay({
      order,
      setErrorMsg: setErrorMsgMock,
      errorMsg,
      setOpenModal: setOpenModalMock,
    });

    expect(setErrorMsgMock).toHaveBeenCalledWith({
      custName: "",
      custPhone: "",
    });
    expect(setOpenModalMock).toHaveBeenCalledWith(true);
  });
});
