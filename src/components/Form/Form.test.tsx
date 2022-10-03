import { screen, render } from "@testing-library/react";
import { Form } from "./Form";

describe("Form", () => {
  it("displays the deposit field with the correct value", () => {
    render(<Form />);
    expect(screen.getByText("Deposit Amount")).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Deposit Amount" })
    ).toHaveValue("10000");
  });

  it("displays the investment term field with the correct value", () => {
    render(<Form />);
    expect(screen.getByText("Investment Term")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByText("3 years")).toBeInTheDocument();
  });

  it("displays the interest rate field with the correct value", () => {
    render(<Form />);
    expect(screen.getByText("Interest Rate $p.a")).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Interest Rate $p.a" })
    ).toHaveValue("1.1");
  });

  it("displays the interest frequency field with the correct value", () => {
    render(<Form />);
    expect(screen.getByText("Interest Frequency")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Interest Frequency" })
    ).toHaveValue("monthly");
  });

  it("displays the result output correct values", () => {
    render(<Form />);

    expect(screen.getByText("Total Interest Earned:")).toBeInTheDocument();
    expect(screen.getByText("$335")).toBeInTheDocument();
    expect(screen.getByText("Final Balance Earned:")).toBeInTheDocument();
    expect(screen.getByText("$10,335")).toBeInTheDocument();
    expect(screen.getByText("Initial Deposit:")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
  });
});
