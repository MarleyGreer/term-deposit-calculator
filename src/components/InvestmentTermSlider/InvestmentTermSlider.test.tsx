import React from "react";
import { screen, render } from "@testing-library/react";
import InvestmentTermSlider from "./InvestmentTermSlider";

type Props = React.ComponentProps<typeof InvestmentTermSlider>;
const props: Props = {
  setFormValues: jest.fn(),
  formValues: {
    deposit: 10000,
    interestRate: 1.1,
    investmentTermInMonths: 36,
    frequency: "monthly",
  },
};

describe("InvestmentTermSlider", () => {
  it("displays the slider", () => {
    render(<InvestmentTermSlider {...props} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("displays the correct labels and markers", () => {
    render(<InvestmentTermSlider {...props} />);
    expect(screen.getByText("Investment Term")).toBeInTheDocument();
    expect(screen.getByText("1 month")).toBeInTheDocument();
    expect(screen.getByText("5 years")).toBeInTheDocument();
    expect(screen.getByText("3 years")).toBeInTheDocument();
  });

  it("updates the marker when the value is changed", () => {
    const propsWithUpdatedTerm: Props = {
      ...props,
      formValues: {
        ...props.formValues,
        investmentTermInMonths: 2,
      },
    };
    render(<InvestmentTermSlider {...propsWithUpdatedTerm} />);
    expect(screen.getByText("2 months")).toBeInTheDocument();
  });
});
