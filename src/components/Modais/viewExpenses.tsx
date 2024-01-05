import {
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import { useExpenses } from "../../providers/ExpensesContext";
import { ModalEditExpense } from "../Expense/Modal/Update/index";
import { ExpenseCard } from "../Card/expenseCard";
import EmptyStreet from "../../assets/Empty.svg";

import { useState } from "react";

interface ModalViewExpensesProps {
  budgetName: string;
  budgetId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ItemData {
  name: string;
  description: string;
  amount: string;
  budgetId: string;
  id: string;
  type: string;
}

interface ItemDataApi {
  name: string;
  description: string;
  amount: number;
  budgetId: string;
  id: string;
  type: string;
  month: string;
}

const budgetsCategories = [
  "Food",
  "Entertainment",
  "Transport",
  "Home",
  "Health",
  "Others",
];

export const ModalViewExpenses = ({
  isOpen,
  onClose,
  budgetName,
}: ModalViewExpensesProps) => {
  const { expenses, deleteExpense } = useExpenses();

  const toast = useToast();

  const [selectedItem, setSelectedItem] = useState<ItemData>({} as ItemData);

  const handleDelete = (expenseId: string, accessToken: string) => {
    deleteExpense(expenseId, accessToken)
      .then((_) => {
        toast({
          title: "Expense deleted successfully!",
          duration: 2000,
          isClosable: true,
          status: "success",
          position: "top",
        });
      })
      .catch((err) => console.log(err));
  };

  const {
    isOpen: isModalEditExpenseOpen,
    onOpen: onModalEditExpenseOpen,
    onClose: onModalEditExpenseClose,
  } = useDisclosure();

  const modalSelect = (item: ItemDataApi) => {
    const { id, name, type, budgetId, description, amount } = item;
    const newAmount = amount.toString();
    const newItem = {
      id: id,
      name: name,
      type: type,
      budgetId: budgetId,
      description: description,
      amount: newAmount,
    };
    setSelectedItem(newItem);
    onModalEditExpenseOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent
          bgColor="black.500"
          boxShadow="0px 1px 6px 1px #00F59B"
          marginY="auto"
          height="500px"
        >
          <ModalHeader paddingY="20px">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h1" fontSize={["2xl", "3xl"]} fontWeight="normal">
                {budgetName}
              </Heading>
              <ModalCloseButton
                mt="10px"
                color="purple.500"
                fontSize="16px"
                _hover={{
                  transition: "0.2s",
                  color: "green.500",
                }}
              />
            </Flex>
          </ModalHeader>
          <ModalBody
            mb="10px"
            h="380px"
            overflowY="scroll"
            css={{
              "&::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#141416",
                borderRadius: "19px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#00F59B",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#7014F2",
                borderRadius: "19px",
              },
            }}
          >
            {expenses.length > 0 ? (
              expenses.map((item, idx) => {
                return (
                  <ExpenseCard
                    item={item}
                    key={idx}
                    modalSelect={modalSelect}
                    handleDelete={handleDelete}
                  />
                );
              })
            ) : (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mt="16"
              >
                <Text fontSize="xl" color="green.500" align="center">
                  You don't have any registered expense
                </Text>
                <Image src={EmptyStreet} alt="Empty" mt="4" mb="4" />
              </Flex>
            )}
            <ModalEditExpense
              budgetCategories={budgetsCategories}
              isOpen={isModalEditExpenseOpen}
              onOpen={onModalEditExpenseOpen}
              onClose={onModalEditExpenseClose}
              selectedItem={selectedItem}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
