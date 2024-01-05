import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../../providers/AuthContext";
import { useBudgets } from "../../../../providers/BudgetsContext";
import { InputForm } from "../../../Input";
import { InputMaskedCurrency } from "../../../Input/inputMasked";
import { formatToCurrency } from "../../../Input/masks";

import {createAndUpdateBudgetSchema} from "../../../../schemas/budget.schema"
// import {TCreateAndUpdateBudget} from "../../../../types/budget.type"


interface ModalEditBudgetData {
  name: string;
  max_value: string;
  categories: string[];
  month: string;
}

interface ModalEditBudgetProps {
  budgetId: string;
  name_to_edit: string;
  max_value_to_edit: string;
  isOpen: boolean;
  onClose: () => void;
}


export const ModalEditBudget = ({
  isOpen,
  onClose,
  budgetId,
  name_to_edit,
  max_value_to_edit,
}: ModalEditBudgetProps) => {
  const { accessToken } = useAuth();
  const { updateBudget } = useBudgets();

  let data = new Date();
  const month = String(data.getMonth() + 1).padStart(2, '0');

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ModalEditBudgetData>({
    resolver: yupResolver(createAndUpdateBudgetSchema),
  });

  const toast = useToast();

  const newMaxValue_to_edit = formatToCurrency(max_value_to_edit);

  const onSubmitFunction = ({ name, max_value }: ModalEditBudgetData) => {
    const newMaxValue = Number(max_value.replaceAll(".", "").replace(",", "."));

    const newData = {
      name: name,
      max_value: newMaxValue,
      categories: [
        "food",
        "entertainment",
        "transport",
        "home",
        "health",
        "others",
      ],
      budgetId: budgetId,
      month: month,
    };
    updateBudget(budgetId, accessToken, newData)
      .then((_) => {
        toast({
          title: "Budget updated successfully!",
          duration: 3000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        onClose();
        reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          marginY="auto"
          bg="black.500"
          border="1px solid"
          borderColor="green.500"
          pb="25px"
          borderRadius="10px"
          boxShadow="0px 1px 7px 2px #00F59B"
          as="form"
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          <ModalHeader
            color="white"
            pb={4}
            align="center"
            borderBottom="1px solid"
            borderColor="gray.900"
          >
            <Heading
              as="h1"
              fontSize="xl"
              fontWeight="normal"
              color="green.500"
            >
              Edit budget
            </Heading>
            <ModalCloseButton
              color="green.500"
              fontSize="lg"
              mt="1"
              _hover={{
                transition: "0.2s",
                color: "purple.500",
              }}
            />
          </ModalHeader>
          <ModalBody
            w="90%"
            display="flex"
            flexDir="column"
            alignSelf="center"
            mt="2"
          >
            <FormControl
              display="flex"
              flexDir="column"
              justifyContent="center"
              color="white"
            >
              <InputForm
                name="name"
                label="Name"
                register={register}
                error={errors.name}
                placeholder="Type budget name"
                defaultValue={name_to_edit}
              />
            </FormControl>

            <FormControl
              mt={2}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <InputMaskedCurrency
                name="max_value"
                label="Amount"
                register={register}
                placeholder="Ex: 300.00"
                defaultValue={newMaxValue_to_edit}
                error={errors.max_value}
                prefix="R$"
              />
            </FormControl>

            <Button
              mt="2"
              h="60px"
              w="100%"
              type="submit"
              fontWeight="normal"
              fontSize="lg"
              bg="purple.500"
              border="2px solid"
              borderColor="purple.500"
              _hover={{ transform: "scale(1.08)" }}
            >
              Confirm changes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
