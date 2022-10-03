import {
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  SliderMark,
  FormControl,
} from "@chakra-ui/react";
import { TermDepositFields } from "../../utils/calculatorFunctions/types";

type Props = {
  setFormValues: (formValues: TermDepositFields) => void;
  formValues: TermDepositFields;
};

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

export const InvestmentTermSlider = ({ setFormValues, formValues }: Props) => {
  const { investmentTermInMonths } = formValues;
  const pluralize = (word: string, value: number) => {
    if (value === 0) return "";
    return `${value} ${word}${value === 1 ? "" : "s"}`;
  };

  const generateSliderMessage = (investmentTermInMonths: number) => {
    const years = Math.floor(investmentTermInMonths / 12);
    const months = investmentTermInMonths % 12;

    return `${pluralize("year", years)}  ${pluralize("month", months)}`;
  };

  return (
    <Box pt={4}>
      <FormControl>
        <FormLabel>Investment Term</FormLabel>
        <Slider
          defaultValue={investmentTermInMonths}
          min={1}
          max={60}
          aria-label="slider-ex-2"
          colorScheme="pink"
          onChange={(investmentTermInMonths) =>
            setFormValues({
              ...formValues,
              investmentTermInMonths: investmentTermInMonths,
            })
          }
        >
          <SliderMark value={1} {...labelStyles}>
            1 month
          </SliderMark>
          <SliderMark value={60} {...labelStyles} sx={{ whiteSpace: "nowrap" }}>
            5 years
          </SliderMark>
          <SliderMark
            sx={{ whiteSpace: "nowrap" }}
            value={investmentTermInMonths}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
            w="30"
            p="1"
            fontSize="sm"
          >
            {generateSliderMessage(investmentTermInMonths)}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </Box>
  );
};

export default InvestmentTermSlider;
