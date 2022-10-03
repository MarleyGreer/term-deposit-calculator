import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { DepositAmountInputField } from "./DepositAmountInputField";

type Props = React.ComponentProps<typeof DepositAmountInputField>;
const props: Props = {
  setFormValues: jest.fn(),
  formValues: {
    deposit: 10000,
    interestRate: 1.1,
    investmentTermInMonths: 36,
    frequency: "monthly",
  },
};

describe("DepositAmountInputField", () => {
  it("displays label, and the input field with the correct default value", () => {
    render(<DepositAmountInputField {...props} />);
    expect(screen.getByText("Deposit Amount")).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Deposit Amount" })
    ).toHaveValue("10000");
  });

  it("displays an error message if the value is under $1000", async () => {
    render(<DepositAmountInputField {...props} />);
    const input = screen.getByRole("spinbutton", { name: "Deposit Amount" });
    fireEvent.change(input, { target: { value: "999" } });

    expect(
      screen.getByText("Please enter a value between $1,000 and $1,000,000")
    ).toBeInTheDocument();
  });

  it("displays an error message if the value is over $1,000,000", async () => {
    render(<DepositAmountInputField {...props} />);
    const input = screen.getByRole("spinbutton", { name: "Deposit Amount" });
    fireEvent.change(input, { target: { value: "1000001" } });

    expect(
      screen.getByText("Please enter a value between $1,000 and $1,000,000")
    ).toBeInTheDocument();
  });

  it("displays an error message if the value is not a number", async () => {
    render(<DepositAmountInputField {...props} />);
    const input = screen.getByRole("spinbutton", { name: "Deposit Amount" });
    fireEvent.change(input, { target: { value: "e" } });

    expect(
      screen.getByText("Please enter a value between $1,000 and $1,000,000")
    ).toBeInTheDocument();
  });

  it("does not display an error message if the value is valid", async () => {
    render(<DepositAmountInputField {...props} />);
    const input = screen.getByRole("spinbutton", { name: "Deposit Amount" });
    fireEvent.change(input, { target: { value: "1000" } });

    expect(
      screen.queryByText("Please enter a value between $1,000 and $1,000,000")
    ).not.toBeInTheDocument();
  });
});
