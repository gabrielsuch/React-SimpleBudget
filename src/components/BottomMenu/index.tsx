import { Box, Center, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { AiOutlineHome, AiOutlinePieChart } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { ModalAddBudget } from "../Modais/addBudget";

export const BottomMenu = () => {
  const {
    isOpen: isModalAddBudgetOpen,
    onOpen: onModalAddBudgetOpen,
    onClose: onModalAddBudgetClose,
  } = useDisclosure();

  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <>
      <ModalAddBudget
        isOpen={isModalAddBudgetOpen}
        onClose={onModalAddBudgetClose}
      />
      <Box
        w="100%"
        h="55px"
        bg="purple.500"
        display={["block", "none", "none", "none"]}
        position="fixed"
        bottom="0"
        overflow="hidden"
        zIndex="1"
      >
        <Flex alignItems="center" justifyContent="center" w="100%" h="100%">
          <HStack spacing="16">
            <Center
              as="button"
              _hover={{
                transition: "0.4s",
                color: "green.500",
              }}
              onClick={() => redirect("/dashboard")}
            >
              <AiOutlineHome size={30} />
            </Center>
            <Center
              as="button"
              _hover={{
                transition: "0.2s",
                transform: "scale(1.1)",
              }}
              onClick={() => onModalAddBudgetOpen()}
            >
              <BsPlusCircleFill size={40} />
            </Center>
            <Center
              as="button"
              _hover={{
                transition: "0.4s",
                color: "green.500",
              }}
              onClick={() => redirect("/statistics")}
            >
              <AiOutlinePieChart size={30} />
            </Center>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};
