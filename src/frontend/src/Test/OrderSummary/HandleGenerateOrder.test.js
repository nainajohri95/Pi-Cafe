import { GenerateSingleOrder } from "../../Services/GenerateSingleOrder.Services";
import { HandleformatDate } from "../../Helper/HandleFormateDate.Helper";
import { HandleGenerateOrder } from "../../Helper/HandleGenerateOrder.Helper";

jest.mock("../../Services/GenerateSingleOrder.Services");
jest.mock("../../Helper/HandleFormateDate.Helper");
describe("HandleGenerateOrder", () => {
  const selectedPaymentType = "credit";
  const setShowErrorMock = jest.fn();
  const setOrderMock = jest.fn();
  const setModalTypeMock = jest.fn();
  const setLoadingMock = jest.fn();
  const order = { customerId: 1 };
  const orderItems = [{ id: 1, quantity: 2 }];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(localStorage.__proto__, "setItem");
    jest.spyOn(localStorage.__proto__, "removeItem");
  });

  it("should show error if payment type is not selected", async () => {
    const updatedPaymentType = "";

    await HandleGenerateOrder(
      updatedPaymentType,
      setShowErrorMock,
      order,
      setOrderMock,
      orderItems,
      setModalTypeMock,
      setLoadingMock
    );

    expect(setShowErrorMock).toHaveBeenCalledWith("kindly select payment Type");
  });

  it("should update order and call GenerateSingleOrder", async () => {
    const mockFormattedDate = "2024-05-20T15:30:00";
    HandleformatDate.mockReturnValue(mockFormattedDate);

    const mockResponse = { orderId: 123 };
    GenerateSingleOrder.mockResolvedValueOnce(mockResponse);

    await HandleGenerateOrder(
      selectedPaymentType,
      setShowErrorMock,
      order,
      setOrderMock,
      orderItems,
      setModalTypeMock,
      setLoadingMock
    );

    expect(setShowErrorMock).toHaveBeenCalledWith("");
    expect(setOrderMock).toHaveBeenCalledWith(expect.any(Function));
    expect(GenerateSingleOrder).toHaveBeenCalledWith(
      {
        ...order,
        items: { 1: 2 },
        date: mockFormattedDate,
      },
      setLoadingMock
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "orderId",
      JSON.stringify(mockResponse.orderId)
    );
    expect(localStorage.removeItem).toHaveBeenCalledWith("OrderItems");
    expect(localStorage.removeItem).toHaveBeenCalledWith("totalAmount");
    expect(setModalTypeMock).toHaveBeenCalledWith("transaction-successful");
  });

  it("should set modal type to transaction-failed if order creation fails", async () => {
    GenerateSingleOrder.mockResolvedValueOnce(null);

    await HandleGenerateOrder(
      selectedPaymentType,
      setShowErrorMock,
      order,
      setOrderMock,
      orderItems,
      setModalTypeMock,
      setLoadingMock
    );

    expect(setModalTypeMock).toHaveBeenCalledWith("transaction-failed");
  });

  it("should correctly reduce order items into an object", async () => {
    const mockFormattedDate = "2024-05-20T15:30:00";
    HandleformatDate.mockReturnValue(mockFormattedDate);

    const orderItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
    ];
    const expectedItems = { 1: 2, 2: 3 };

    const mockResponse = { orderId: 123 };
    GenerateSingleOrder.mockResolvedValueOnce(mockResponse);

    await HandleGenerateOrder(
      selectedPaymentType,
      setShowErrorMock,
      order,
      setOrderMock,
      orderItems,
      setModalTypeMock,
      setLoadingMock
    );

    expect(GenerateSingleOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        items: expectedItems,
      }),
      setLoadingMock
    );
  });
});
