import {
  FormLabel,
  InputGroup,
  InputLeftElement,
  Text,
  Input,
  InputElementProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import React, { useCallback } from "react";
import { currencyMask } from "./masks";

interface InputProps extends InputElementProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: FieldError | null;
  prefix?: string;
  register: (user: any) => void;
  value?: string;
  defaultValue?: string;
}

export const InputMaskedCurrency = ({
  name,
  type,
  placeholder,
  defaultValue,
  label,
  error = null,
  prefix,
  register,
  value,
  ...rest
}: InputProps) => {
  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    currencyMask(e);
  }, []);

  return (
    <>
      <FormLabel htmlFor={name} fontSize="18px" mb="1">
        {label}
      </FormLabel>
      <InputGroup flexDirection="column" h="85px">
        {prefix && (
          <InputLeftElement
            mt="2.5"
            children={<Text color="colors.purple.500">{prefix}</Text>}
          />
        )}
        <Input
          border="2px solid"
          borderColor="purple.500"
          background="black.500"
          color="white"
          height="60px"
          fontSize="lg"
          placeholder={placeholder}
          defaultValue={defaultValue}
          type={type}
          value={value}
          {...register(name)}
          {...rest}
          onKeyUp={handleKeyUp}
        />
        <Text color="red.500" fontSize="md" pl="2" mb="0" pb="0">
          {error?.message}
        </Text>
      </InputGroup>
    </>
  );
};
