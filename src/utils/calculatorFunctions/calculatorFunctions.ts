import { Frequency, TermDepositFields } from "./types";

export const generateInterestAndBalance = (fields: TermDepositFields) => {
  const interest = calculateInterest(fields);
  return { interest, balance: interest + fields.deposit };
};

export const calculateInterest = (fields: TermDepositFields) => {
  const { deposit, interestRate, investmentTermInMonths, frequency } = fields;
  if (frequency === "at-maturity")
    return Math.round(
      deposit * (interestRate / 100 / 12) * investmentTermInMonths
    );

  const years = investmentTermInMonths / 12;
  const rate = interestRate / 100;
  const term = calculateInterestTerm(frequency);

  return Math.round(
    deposit * Math.pow(1 + rate / term, term * years) - deposit
  );
};

export const calculateInterestTerm = (frequency: Frequency) => {
  if (frequency === "monthly") return 12;
  if (frequency === "quarterly") return 4;
  if (frequency === "annually") return 1;
  return 0;
};
