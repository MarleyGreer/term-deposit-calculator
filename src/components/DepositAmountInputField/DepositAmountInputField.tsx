import {
  FormLabel,
  Box,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { TermDepositFields } from "../../utils/calculatorFunctions/types";

type Props = {
  setFormValues: (formValues: TermDepositFields) => void;
  formValues: TermDepositFields;
};

export const DepositAmountInputField = ({
  setFormValues,
  formValues,
}: Props) => {
  const [depositInvalid, setDepositInvalid] = useState<boolean>(false);
  const { deposit } = formValues;

  const validateDepositAmount = (value: number) => {
    if (value >= 1000 && value <= 1000000)
      return (
        setFormValues({ ...formValues, deposit: value }),
        setDepositInvalid(false)
      );

    return setDepositInvalid(true);
  };

  return (
    <Box pt={4}>
      <FormControl isInvalid={depositInvalid} isRequired>
        <FormLabel>Deposit Amount</FormLabel>
        <NumberInput
          max={100000}
          min={1000}
          defaultValue={deposit}
          onChange={(event) => validateDepositAmount(Number(event))}
        >
          <FormErrorMessage pb={3}>
            Please enter a value between $1,000 and $1,000,000
          </FormErrorMessage>
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </Box>
  );
};

export default DepositAmountInputField;
