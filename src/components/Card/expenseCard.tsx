import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import { useAuth } from "../../providers/AuthContext";

interface ItemDataApi {
  name: string;
  description: string;
  amount: number;
  budgetId: string;
  id: string;
  type: string;
  month: string,
}

interface ExpenseCardProps {
  item: ItemDataApi;
  handleDelete: (expenseId: string, accessToken: string) => void;
  modalSelect: (item: ItemDataApi) => void;
}

export const ExpenseCard = ({
  item,
  handleDelete,
  modalSelect,
}: ExpenseCardProps) => {
  const { accessToken } = useAuth();

  return (
    <Flex
      bgColor="black.300"
      borderRadius="5px"
      gap="10px"
      m="10px 0"
      p="10px 15px"
      justifyContent="space-between"
    >
      <Flex flexDirection="column">
        <Flex
          fontSize="16px"
          gap="10px"
          width="200px"
          justifyContent="space-between"
        >
          <Heading color="white.0" size="md">
            {item.name}
          </Heading>
          <Heading color="gray.350" size="md">
            {item.type}
          </Heading>
        </Flex>
        <Text fontSize="sm" color="white.0" marginLeft="5px" p="10px">
          {item.description}
        </Text>
      </Flex>
      <Box display="block">
        <Text fontFamily="other" color="green.500" fontWeight="500">
          {item?.amount?.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
        <Flex m="10px" alignItems="center" gap="10px">
          <AiFillEdit
            color="gray.300"
            size={25}
            cursor="pointer"
            onClick={() => modalSelect(item)}
          />
          <FaTrash
            color="gray.300"
            size={18}
            cursor="pointer"
            onClick={() => handleDelete(item.id, accessToken)}
          />
        </Flex>
      </Box>
    </Flex>
  );
};
