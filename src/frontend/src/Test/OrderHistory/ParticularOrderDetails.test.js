import React from "react";
import { render } from "@testing-library/react";
import ParticularOrderDetails from "../../Component/Local/OrderHistory/ParticularOrderDetails";

// Mock order data for testing
const order = { id: 1, custId: "Cust1", time: "10:00 AM", price: 100 };

describe("ParticularOrderDetails", () => {
  it("renders correctly", () => {
    const { getByText } = render(<ParticularOrderDetails order={order} />);

    // Check if customer ID is rendered
    expect(getByText("Customer ID:")).toBeInTheDocument();
    expect(getByText("Cust1")).toBeInTheDocument();

    // Check if time is rendered
    expect(getByText("Time:")).toBeInTheDocument();
    expect(getByText("10:00 AM")).toBeInTheDocument();

    // Check if price is rendered
    expect(getByText("Price:")).toBeInTheDocument();
    expect(getByText("₹100")).toBeInTheDocument();
  });
});
