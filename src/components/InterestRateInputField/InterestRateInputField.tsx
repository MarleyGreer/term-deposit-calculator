import {
  FormLabel,
  Box,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  FormControl,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { TermDepositFields } from "../../utils/calculatorFunctions/types";

type Props = {
  setFormValues: (formValues: TermDepositFields) => void;
  formValues: TermDepositFields;
};

export const InterestRateInputField = ({
  setFormValues,
  formValues,
}: Props) => {
  const [interestRateInvalid, setInterestRateInvalid] =
    useState<boolean>(false);
  const { interestRate } = formValues;

  const validateDepositAmount = (value: number) => {
    if (value >= 1 && value <= 5)
      return (
        setFormValues({ ...formValues, interestRate: value }),
        setInterestRateInvalid(false)
      );

    return setInterestRateInvalid(true);
  };

  return (
    <Box pt={6}>
      <FormControl isInvalid={interestRateInvalid}>
        <FormLabel>Interest Rate $p.a</FormLabel>
        <NumberInput
          onChange={(event) => validateDepositAmount(Number(event))}
          max={5}
          min={1}
          step={0.1}
          precision={1}
          defaultValue={interestRate}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormErrorMessage pb={3}>
          Please enter a rate between 1.0 and 5.0 %PA
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default InterestRateInputField;
