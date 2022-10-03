import "@testing-library/jest-dom";
import {
  calculateInterest,
  calculateInterestTerm,
  generateInterestAndBalance,
} from "./calculatorFunctions";
import { TermDepositFields } from "./types";

const fields: TermDepositFields = {
  deposit: 10000,
  interestRate: 1.1,
  investmentTermInMonths: 10,
  frequency: "monthly",
};

test("calculateInterest function calculates the interest earned correctly", () => {
  expect(calculateInterest(fields)).toBe(92);
  expect(calculateInterest({ ...fields, frequency: "quarterly" })).toBe(92);
  expect(calculateInterest({ ...fields, frequency: "annually" })).toBe(92);
  expect(calculateInterest({ ...fields, frequency: "at-maturity" })).toBe(92);
  expect(
    calculateInterest({ ...fields, frequency: "monthly", deposit: 74364 })
  ).toBe(684);
  expect(
    calculateInterest({
      ...fields,
      frequency: "quarterly",
      deposit: 74364,
      investmentTermInMonths: 12,
    })
  ).toBe(821);
  expect(
    calculateInterest({
      ...fields,
      frequency: "quarterly",
      deposit: 74364,
      investmentTermInMonths: 24,
      interestRate: 5,
    })
  ).toBe(7770);
  expect(
    calculateInterest({
      ...fields,
      frequency: "annually",
      deposit: 74364,
      investmentTermInMonths: 24,
      interestRate: 5,
    })
  ).toBe(7622);

  expect(
    calculateInterest({
      ...fields,
      frequency: "at-maturity",
      deposit: 74364,
      investmentTermInMonths: 24,
      interestRate: 5,
    })
  ).toBe(7436);
});

test("calculateInterestTerm function returns the correct value for each frequency term", () => {
  expect(calculateInterestTerm("monthly")).toBe(12);
  expect(calculateInterestTerm("quarterly")).toBe(4);
  expect(calculateInterestTerm("annually")).toBe(1);
});

test("generateInterestAndBalance returns the interest and balance correctly", () => {
  expect(generateInterestAndBalance(fields)).toStrictEqual({
    balance: 10092,
    interest: 92,
  });
  expect(
    generateInterestAndBalance({
      ...fields,
      frequency: "quarterly",
      deposit: 89328,
      investmentTermInMonths: 49,
      interestRate: 3.3,
    })
  ).toStrictEqual({
    balance: 102157,
    interest: 12829,
  });

  expect(
    generateInterestAndBalance({
      ...fields,
      frequency: "annually",
      deposit: 43234,
      investmentTermInMonths: 29,
      interestRate: 2.4,
    })
  ).toStrictEqual({
    balance: 45784,
    interest: 2550,
  });
  expect(
    generateInterestAndBalance({
      ...fields,
      frequency: "at-maturity",
      deposit: 74364,
      investmentTermInMonths: 24,
      interestRate: 5,
    })
  ).toStrictEqual({
    balance: 81800,
    interest: 7436,
  });
});
