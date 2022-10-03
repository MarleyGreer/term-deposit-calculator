import React from "react";
import { screen, render } from "@testing-library/react";
import { ResultOutput } from "./ResultOutput";

type Props = React.ComponentProps<typeof ResultOutput>;
const props: Props = {
  formValues: {
    deposit: 10000,
    interestRate: 1.1,
    investmentTermInMonths: 36,
    frequency: "monthly",
  },
};

describe("ResultOutput", () => {
  it("displays the correct headers", () => {
    render(<ResultOutput {...props} />);

    expect(screen.getByText("Total Interest Earned:")).toBeInTheDocument();
    expect(screen.getByText("Final Balance Earned:")).toBeInTheDocument();
    expect(screen.getByText("Initial Deposit:")).toBeInTheDocument();
  });

  it("displays the correct output", () => {
    render(<ResultOutput {...props} />);
    expect(screen.getByText("$335")).toBeInTheDocument();
    expect(screen.getByText("$10,335")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
  });

  it("displays correctly when the form data is different", () => {
    const props: Props = {
      formValues: {
        deposit: 500000,
        interestRate: 4.6,
        investmentTermInMonths: 47,
        frequency: "annually",
      },
    };

    render(<ResultOutput {...props} />);
    expect(screen.getByText("$500,000")).toBeInTheDocument();
    expect(screen.getByText("$596,306")).toBeInTheDocument();
    expect(screen.getByText("$96,306")).toBeInTheDocument();
  });
});
