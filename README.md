# Term Deposit Calculator

A React app built with React v18.2.0, it takes the following values from the user:

- Start deposit amount (e.g. $10,000)
- Interest rate (e.g. 1.10%)
- Investment term (e.g. 3 years)
- Interest payment frequency (Monthly, Quarterly, Annually, At Maturity)

The application calculates the result, assuming the user will reinvest their deposit and interest earnings at the end of interest payment cycle, compounding the interest earned.

# Setup

- `cd term-deposit-calculator`

Install dependencies:

- `yarn install`

Run on http://localhost:3000/:

- `yarn start`

# Running Tests

From the `term-deposit-calculator` directory, run `yarn test`

# File navigation

Calculator functions:
`src/utils`

UI Components 
`src/components`
