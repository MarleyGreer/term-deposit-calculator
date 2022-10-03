import React from "react";
import { screen, render } from "@testing-library/react";
import { InterestFrequencySelector } from "./InterestFrequencySelector";

type Props = React.ComponentProps<typeof InterestFrequencySelector>;
const props: Props = {
  setFormValues: jest.fn(),
  formValues: {
    deposit: 10000,
    interestRate: 1.1,
    investmentTermInMonths: 36,
    frequency: "monthly",
  },
};

describe("InterestFrequencySelector", () => {
  it("displays the selector", () => {
    render(<InterestFrequencySelector {...props} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("displays the available options correctly when the loan term is over 12 months.", () => {
    render(<InterestFrequencySelector {...props} />);

    expect(screen.getByRole("option", { name: "Monthly" })).toHaveValue(
      "monthly"
    );
    expect(screen.getByRole("option", { name: "Quarterly" })).toHaveValue(
      "quarterly"
    );
    expect(screen.getByRole("option", { name: "Annually" })).toHaveValue(
      "annually"
    );
    expect(screen.getByRole("option", { name: "At Maturity" })).toHaveValue(
      "at-maturity"
    );
  });

  it("does not display the annual option if term is under 12 months", () => {
    const propsWithUpdatedTerm: Props = {
      ...props,
      formValues: {
        ...props.formValues,
        investmentTermInMonths: 10,
      },
    };

    render(<InterestFrequencySelector {...propsWithUpdatedTerm} />);
    expect(screen.getByRole("option", { name: "Monthly" })).toHaveValue(
      "monthly"
    );
    expect(screen.getByRole("option", { name: "At Maturity" })).toHaveValue(
      "at-maturity"
    );
    expect(screen.getByRole("option", { name: "Quarterly" })).toHaveValue(
      "quarterly"
    );
    expect(
      screen.queryByRole("option", { name: "Annually" })
    ).not.toBeInTheDocument();
  });

  it("does not display the annual or quarterly option if term is under 3 months", () => {
    const propsWithUpdatedTerm: Props = {
      ...props,
      formValues: {
        ...props.formValues,
        investmentTermInMonths: 2,
      },
    };

    render(<InterestFrequencySelector {...propsWithUpdatedTerm} />);
    expect(screen.getByRole("option", { name: "Monthly" })).toHaveValue(
      "monthly"
    );
    expect(screen.getByRole("option", { name: "At Maturity" })).toHaveValue(
      "at-maturity"
    );
    expect(
      screen.queryByRole("option", { name: "Quarterly" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Annually" })
    ).not.toBeInTheDocument();
  });
});
