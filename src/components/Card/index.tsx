import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Heading,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { ModalViewExpenses } from "../Modais/viewExpenses";
import { ModalAddExpense } from "../../components/Expense/Modal/Create/index"
import { ModalEditBudget } from "../../components/Budget/Modal/Update/index";
import { useAuth } from "../../providers/AuthContext";
import { useExpenses } from "../../providers/ExpensesContext";
import { useEffect } from "react";
import { useBudgets } from "../../providers/BudgetsContext";

interface CardProps {
  budgetName: string;
  budgetCategories: string[];
  budgetId: string;
  maxValue: number;
}

export const CardBudget = ({
  budgetId,
  budgetName,
  budgetCategories,
  maxValue,
}: CardProps) => {
  const {
    isOpen: isModalViewExpensesOpen,
    onOpen: onModalViewExpensesOpen,
    onClose: onModalViewExpensesClose,
  } = useDisclosure();

  const {
    isOpen: isModalAddExpenseOpen,
    onOpen: onModalAddExpenseOpen,
    onClose: onModalAddExpenseClose,
  } = useDisclosure();

  const {
    isOpen: isModalEditBudgetOpen,
    onOpen: onModalEditBudgetOpen,
    onClose: onModalEditBudgetClose,
  } = useDisclosure();

  const { listAllExpenses, allExpenses, listExpenses, expenses } =
    useExpenses();
  const { accessToken } = useAuth();
  const { deleteBudget } = useBudgets();

  const handleClick = () => {
    onModalViewExpensesOpen();
    listExpenses(budgetId, accessToken);
  };

  const filteredExpenses = allExpenses.filter(
    (item) => item.budgetId === budgetId
  );
  const totalExpend = filteredExpenses.reduce(
    (acc, { amount }) => acc + amount,
    0
  );
  const percentage = (totalExpend * 100) / maxValue;

  const setColorOnCircularProgress = (value: number) => {
    if (Number(value.toFixed(1)) > 100) {
      return "red.500";
    }
    return "green.500";
  };

  useEffect(() => {
    listAllExpenses(accessToken);
  }, [expenses]);

  const toast = useToast();

  const handleDelete = (item: any, accessToken: string) => {
    toast({
      title: "Budget deleted!",
      duration: 3000,
      isClosable: true,
      status: "warning",
      position: "top",
    });
    deleteBudget(item, accessToken);
  };

  return (
    <Box
      w={["93%", "500px"]}
      h={["245px", "275px"]}
      bg="black.300"
      mt="4"
      mr="4"
      ml="4"
      borderRadius="10px"
      _hover={{
        transition: "0.2s",
        transform: "scale(1.02)",
      }}
    >
      <HStack h="40px" w="100%" justifyContent="space-between" pl="4" pt="4">
        <Heading as="h2" fontSize={["2xl", "3xl"]} fontWeight="normal">
          {budgetName}
        </Heading>
        <HStack pr="4" spacing="5">
          <Icon
            color="gray.300"
            as={AiFillEdit}
            fontSize={["25px", "30px"]}
            cursor="pointer"
            _hover={{
              transition: "0.2s",
              color: "green.500",
            }}
            onClickCapture={() => {
              onModalEditBudgetOpen();
            }}
          />
          <Icon
            color="gray.300"
            as={FaTrash}
            fontSize={["18px", "23px"]}
            cursor="pointer"
            _hover={{
              transition: "0.2s",
              color: "green.500",
            }}
            onClickCapture={() => {
              handleDelete(budgetId, accessToken);
            }}
          />
        </HStack>
      </HStack>
      <Flex w="100%" h="200px" justifyContent="space-around" mt={["1", "6"]}>
        <Flex
          w="190px"
          justifyContent="center"
          alignItems="center"
          _hover={{ transition: "0.4s", transform: "scale(1.08)" }}
        >
          <CircularProgress
            size="155px"
            value={Number(percentage.toFixed(1))}
            // color="green.500"
            color={setColorOnCircularProgress(percentage)}
            trackColor="purple.500"
            thickness="10px"
          >
            <CircularProgressLabel
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize={["xl", "2xl"]}
              fontWeight="bold"
              bg="#2F2E41"
              borderRadius="50%"
              h="75%"
              w="75%"
            >
              {percentage.toFixed(1)}%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <VStack
          spacing="4"
          w="50%"
          h="100%"
          justifyContent="center"
          pr={["2", "2"]}
        >
          <HStack ml="auto" pr={["2", "0"]} w="100%">
            <Heading
              fontSize={["17px", "25px"]}
              as="h4"
              color="green.500"
              fontFamily="other"
              fontWeight="medium"
            >
              {maxValue.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </Heading>
            <Text
              fontSize={["14px", "20px"]}
              color="gray.100"
              fontFamily="other"
            >
              /
            </Text>
            <Text
              fontSize={["14px", "20px"]}
              color="gray.100"
              fontFamily="other"
            >
              {totalExpend.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </HStack>
          <Button
            onClick={() => onModalAddExpenseOpen()}
            w={["90%", "100%"]}
            h={["50px", "60px"]}
            bg="black.500"
            fontSize={["lg", "xl"]}
            fontWeight="normal"
            color="white.0"
            border="2px solid"
            borderColor="purple.500"
            _hover={{ transform: "scale(1.02)" }}
          >
            Add expense
          </Button>
          <Button
            onClick={handleClick}
            w={["90%", "100%"]}
            h={["50px", "60px"]}
            bg="black.500"
            fontSize={["lg", "xl"]}
            fontWeight="normal"
            color="white.0"
            border="2px solid"
            borderColor="purple.500"
            _hover={{ transform: "scale(1.02)" }}
          >
            View expenses
          </Button>
        </VStack>
      </Flex>
      <ModalAddExpense
        isOpen={isModalAddExpenseOpen}
        onClose={onModalAddExpenseClose}
        budgetId={budgetId}
        budgetCategories={budgetCategories}
      />
      <ModalViewExpenses
        isOpen={isModalViewExpensesOpen}
        onClose={onModalViewExpensesClose}
        budgetId={budgetId}
        budgetName={budgetName}
      />
      <ModalEditBudget
        isOpen={isModalEditBudgetOpen}
        onClose={onModalEditBudgetClose}
        budgetId={budgetId}
        name_to_edit={budgetName}
        max_value_to_edit={maxValue.toString()}
      />
    </Box>
  );
};
