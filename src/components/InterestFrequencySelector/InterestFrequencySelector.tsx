import { FormLabel, Box, Select, FormControl } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  Frequency,
  TermDepositFields,
} from "../../utils/calculatorFunctions/types";

type Props = {
  setFormValues: (formValues: TermDepositFields) => void;
  formValues: TermDepositFields;
};

export const InterestFrequencySelector = ({
  setFormValues,
  formValues,
}: Props) => {
  const { frequency, investmentTermInMonths } = formValues;

  const frequencies: { label: string; value: Frequency }[] = [
    {
      label: "Monthly",
      value: "monthly",
    },
    {
      label: "Quarterly",
      value: "quarterly",
    },
    {
      label: "Annually",
      value: "annually",
    },
    {
      label: "At Maturity",
      value: "at-maturity",
    },
  ];

  const displayAvailableFrequencies = (investmentTermInMonths: number) => {
    if (investmentTermInMonths < 3) return [frequencies[0], frequencies[3]];
    if (investmentTermInMonths < 12)
      return [frequencies[0], frequencies[1], frequencies[3]];
    return frequencies;
  };

  const availableOptions = displayAvailableFrequencies(investmentTermInMonths);

  useEffect(() => {
    if (frequency) {
      const option = availableOptions.find(
        (option) => option.value === frequency
      );

      if (!option) {
        setFormValues({
          ...formValues,
          frequency: "monthly" as Frequency,
        });
      }
    }
  }, [setFormValues, availableOptions, formValues, frequency]);

  return (
    <Box pt={4}>
      <FormControl>
        <FormLabel>Interest Frequency</FormLabel>
        <Select
          value={frequency}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              frequency: event.target.value as Frequency,
            })
          }
        >
          {availableOptions.map((frequency) => (
            <option key={frequency.value} value={frequency.value}>
              {frequency.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InterestFrequencySelector;
