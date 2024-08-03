import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OrderHistoryDetails from "../../Component/Local/OrderHistory/OrderHistoryDetails";

describe("OrderHistoryDetails Component", () => {
  const orderHistoryData = [
    { id: 1, custId: "Cust1", time: "10:00 AM", price: 100 },
    { id: 2, custId: "Cust2", time: "11:00 AM", price: 200 },
  ];

  test("renders order details correctly", () => {
    const { getByText } = render(
      <OrderHistoryDetails orderHistoryData={orderHistoryData} />
    );

    orderHistoryData.forEach((order) => {
      expect(getByText(order.custId)).toBeInTheDocument();
      expect(getByText(order.time)).toBeInTheDocument();
      expect(getByText(`₹${order.price}`)).toBeInTheDocument();
    });
  });

  test("expands and collapses order details on button click", () => {
    const { getByTestId, queryByTestId } = render(
      <OrderHistoryDetails orderHistoryData={orderHistoryData} />
    );

    // Initially, details should not be visible
    expect(queryByTestId("order-details-1")).toBeNull();
    expect(queryByTestId("order-details-2")).toBeNull();

    // Click on the button for the first order to expand
    fireEvent.click(getByTestId("order-button-1"));

    // Details for the first order should be visible
    expect(queryByTestId("order-details-1")).toBeInTheDocument();

    // Click on the button for the first order to collapse
    fireEvent.click(getByTestId("order-button-1"));

    // Details for the first order should not be visible again
    expect(queryByTestId("order-details-1")).toBeNull();
  });
});
