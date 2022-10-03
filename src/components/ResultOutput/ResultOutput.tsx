import { Text, Box } from "@chakra-ui/react";
import { TermDepositFields } from "../../utils/calculatorFunctions/types";
import { generateInterestAndBalance } from "../../utils/calculatorFunctions/calculatorFunctions";

type Props = {
  formValues: TermDepositFields;
};

export const ResultOutput = ({ formValues }: Props) => {
  const { interest, balance } = generateInterestAndBalance(formValues);
  const { deposit } = formValues;

  const numberFormatter = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const results = [
    { header: "Total Interest Earned:", content: numberFormatter(interest) },
    { header: "Final Balance Earned:", content: numberFormatter(balance) },
    { header: "Initial Deposit:", content: numberFormatter(deposit) },
  ];

  return (
    <Box pt={6}>
      {results.map((result) => (
        <Box key={result.header}>
          <Text fontSize="16px" color="white">
            {result.header}
          </Text>
          <Text fontSize="24px" color="teal.300">
            ${result.content}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default ResultOutput;
