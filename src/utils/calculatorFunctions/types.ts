export type Frequency = "monthly" | "quarterly" | "annually" | "at-maturity";

export type TermDepositFields = {
  deposit: number;
  interestRate: number;
  investmentTermInMonths: number;
  frequency: Frequency;
};
