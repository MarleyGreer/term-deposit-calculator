import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { InterestRateInputField } from "./InterestRateInputField";

type Props = React.ComponentProps<typeof InterestRateInputField>;
const props: Props = {
  setFormValues: jest.fn(),
  formValues: {
    deposit: 10000,
    interestRate: 1.1,
    investmentTermInMonths: 36,
    frequency: "monthly",
  },
};

describe("InterestRateInputField", () => {
  it("displays label, and the input field with the correct default value", () => {
    render(<InterestRateInputField {...props} />);

    expect(screen.getByText("Interest Rate $p.a")).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Interest Rate $p.a" })
    ).toHaveValue("1.1");
  });

  it("displays an error message if the value is under 1%", async () => {
    render(<InterestRateInputField {...props} />);
    const input = screen.getByRole("spinbutton", {
      name: "Interest Rate $p.a",
    });
    fireEvent.change(input, { target: { value: "0.2" } });
    expect(
      screen.getByText("Please enter a rate between 1.0 and 5.0 %PA")
    ).toBeInTheDocument();
  });

  it("displays an error message if the value is over 5%", async () => {
    render(<InterestRateInputField {...props} />);
    const input = screen.getByRole("spinbutton", {
      name: "Interest Rate $p.a",
    });
    fireEvent.change(input, { target: { value: "5.1" } });

    expect(
      screen.getByText("Please enter a rate between 1.0 and 5.0 %PA")
    ).toBeInTheDocument();
  });

  it("displays an error message if the value is not a number", async () => {
    render(<InterestRateInputField {...props} />);
    const input = screen.getByRole("spinbutton", {
      name: "Interest Rate $p.a",
    });
    fireEvent.change(input, { target: { value: "e" } });

    expect(
      screen.getByText("Please enter a rate between 1.0 and 5.0 %PA")
    ).toBeInTheDocument();
  });

  it("does not display an error message if the value is valid", async () => {
    render(<InterestRateInputField {...props} />);
    const input = screen.getByRole("spinbutton", {
      name: "Interest Rate $p.a",
    });
    fireEvent.change(input, { target: { value: "1.3" } });

    expect(
      screen.queryByText("Please enter a rate between 1.0 and 5.0 %PA")
    ).not.toBeInTheDocument();
  });
});
