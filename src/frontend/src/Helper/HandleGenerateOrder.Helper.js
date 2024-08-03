import { GenerateSingleOrder } from "../Services/GenerateSingleOrder.Services";
import { HandleformatDate } from "./HandleFormateDate.Helper";

export const HandleGenerateOrder = async (
  selectedPaymentType,
  setShowError,
  order,
  setOrder,
  orderItems,
  setModalType,
  setLoading
) => {
  setShowError("");
  if (!selectedPaymentType) {
    setShowError("kindly select payment Type");
    return;
  }

  const items = orderItems?.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});
  const updatedOrder = { ...order };
  updatedOrder.items = items;
  updatedOrder.email = parseInt(order.email)
  const date = HandleformatDate(new Date());
  updatedOrder.date = date;
  setOrder((order) => ({ ...order, items: items, date: date }));

  const result = await GenerateSingleOrder(updatedOrder, setLoading);
  if (result?.order_id) {
    localStorage.setItem("orderId", JSON.stringify(result.order_id));
    localStorage.removeItem("OrderItems");
    localStorage.removeItem("totalAmount");
    setModalType("transaction-successful");
  } else {
    setModalType("transaction-failed");
  }
};
