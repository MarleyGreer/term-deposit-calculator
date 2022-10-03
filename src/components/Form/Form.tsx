import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { TermDepositFields } from "../../utils/calculatorFunctions/types";
import { InvestmentTermSlider } from "../InvestmentTermSlider";
import { InterestFrequencySelector } from "../InterestFrequencySelector";
import { DepositAmountInputField } from "../DepositAmountInputField";
import { InterestRateInputField } from "../InterestRateInputField";
import { ResultOutput } from "../ResultOutput";

export const Form = () => {
  const [formValues, setFormValues] = useState<TermDepositFields>({
    deposit: 10000,
    interestRate: 1.1,
    investmentTermInMonths: 36,
    frequency: "monthly",
  });

  return (
    <Box width={360}>
      Term Deposit Calculator
      <DepositAmountInputField
        setFormValues={setFormValues}
        formValues={formValues}
      />
      <InvestmentTermSlider
        setFormValues={setFormValues}
        formValues={formValues}
      />
      <InterestRateInputField
        setFormValues={setFormValues}
        formValues={formValues}
      />
      <InterestFrequencySelector
        setFormValues={setFormValues}
        formValues={formValues}
      />
      <ResultOutput formValues={formValues} />
    </Box>
  );
};

export default Form;
