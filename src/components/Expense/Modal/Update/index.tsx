import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Button,
  Box,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../../providers/AuthContext/index";
import { useExpenses } from "../../../../providers/ExpensesContext/index";
import { InputForm } from "../../../Input";
import { InputMaskedCurrency } from "../../../Input/inputMasked";

import {createAndUpdateExpenseSchema} from "../../../../schemas/expense.schema"


interface ModalData {
  name: string;
  description: string;
  amount: string;
  budgetId: string;
  id: string;
  type: string;
}

interface SelectedItem {
  name: string;
  description: string;
  amount: string;
  budgetId: string;
  id: string;
  type: string;
}

interface ModalEditExpenseProps {
  budgetCategories: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedItem: SelectedItem;
}

export const ModalEditExpense = ({
  budgetCategories,
  isOpen,
  onClose,
  selectedItem,
}: ModalEditExpenseProps) => {
  const { accessToken } = useAuth();
  const { restoreInfos, updateExpense } = useExpenses();

  const toast = useToast();

  const changeExpenseData = (data: ModalData) => {
    const newAmount = Number(data.amount.replace(",", "."));

    const newData = {
      name: data.name,
      description: data.description,
      amount: newAmount,
      type: data.type,
    };

    updateExpense(selectedItem.id, accessToken, newData)
      .then((_) => {
        toast({
          title: "Expense updated successfully!",
          duration: 2000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        onClose();
      })
      .catch((err) => console.log(err));
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ModalData>({
    resolver: yupResolver(createAndUpdateExpenseSchema),
  });

  useEffect(() => {
    if (selectedItem.id) {
      restoreInfos(selectedItem.id, reset);
    }
  }, [selectedItem]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          marginY="auto"
          bg="black.500"
          border="1px solid"
          borderColor="green.500"
          pb="20px"
          borderRadius="10px"
          boxShadow="0px 1px 7px 2px #00F59B"
          as="form"
          onSubmit={handleSubmit(changeExpenseData)}
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
              Edit expense
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
          <ModalBody w="90%" display="flex" flexDir="column" alignSelf="center">
            <Box h="50px" w="100%" mb="12px">
              <Box
                w="100%"
                mt="2"
                border="2px solid"
                borderColor="purple.500"
                borderRadius="5px"
                _hover={{ borderColor: "#474747", cursor: "pointer" }}
                padding="2px"
                bg="black.500"
                as="select"
                fontSize="20px"
                defaultValue={""}
                {...register("type")}
              >
                <Box as="option" disabled value="">
                  Categories
                </Box>

                {budgetCategories.map((item, index) => (
                  <Box as="option" value={item} key={index}>
                    {item}
                  </Box>
                ))}
              </Box>
              <Text color="red.500" fontSize="md" pl="2" mb="0" pb="0" h="20px">
                {errors.type?.message}
              </Text>
            </Box>

            <InputForm
              name="name"
              label="Name"
              register={register}
              placeholder="Ex: Cardiologist"
              error={errors.name}
            />

            <InputForm
              name="description"
              label="Description"
              register={register}
              placeholder="Ex: Medical check - Dr.Strauss"
              error={errors.description}
            />

            <InputMaskedCurrency
              name="amount"
              label="Amount"
              register={register}
              placeholder="Ex: 300.00"
              error={errors.amount}
              prefix="R$"
            />

            <Button
              h="60px"
              w="100%"
              type="submit"
              fontWeight="normal"
              fontSize="lg"
              bg="purple.500"
              borderColor="purple.500"
              onClickCapture={() => {}}
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
