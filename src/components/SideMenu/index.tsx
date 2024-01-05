import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineHome, AiOutlinePieChart } from "react-icons/ai";
import { ModalAddBudget } from "../Budget/Modal/Create/index";
import { useAuth } from "../../providers/AuthContext";
import logo from "../../assets/LogoSm.svg";
import { useHistory } from "react-router-dom";

interface SideMenuProps {
  isSelected: any;
}

export const SideMenu = ({ isSelected }: SideMenuProps) => {
  const {
    isOpen: isModalAddBudgetOpen,
    onOpen: onModalAddBudgetOpen,
    onClose: onModalAddBudgetClose,
  } = useDisclosure();

  const { logout } = useAuth();
  const history = useHistory();

  return (
    <>
      <ModalAddBudget
        isOpen={isModalAddBudgetOpen}
        onClose={onModalAddBudgetClose}
      />
      <Flex
        flexDirection="column"
        width="75px"
        bgColor="purple.500"
        h="200vh"
        justifyContent="flex-start"
        alignItems="center"
        gap="30px"
        boxSizing="border-box"
        overflow="hidden"
        position="fixed"
        left="0"
        display={["none", "flex"]}
      >
        <Image
          src={logo}
          alt="logo"
          p="5px 5px"
          w="90px"
          h="90px"
          // marginTop="10px"
        />
        <Flex
          alignItems="center"
          justifyContent="center"
          _hover={{
            // borderRadius: "50%",
            // w: "50px",
            // h: "50px",
            // boxShadow: "0px 1px 7px 2px #c28cff",
            transition: "0.2s",
            transform: "scale(1.1)",
          }}
          cursor="pointer"
        >
          <BsPlusCircleFill
            size={40}
            color="white.0"
            onClick={() => onModalAddBudgetOpen()}
            data-testid="addbudget"
          />
        </Flex>
        <Flex alignItems="center" w="100%">
          {isSelected === "dashboard" && (
            <Flex
              // boxShadow="0px 1px 7px 2px #5210AF"
              width="20px"
              h="60px"
              position="fixed"
              alignItems="center"
              justifyContent="flex"
              _hover={{
                transition: "0.2s",
                color: "green.500",
                // transform: "scale(1.1)",
              }}
            >
              <Flex w="3px" h="100%" bgColor="white.0" alignSelf="flex-start" />
            </Flex>
          )}
          <Box
            position="relative"
            left="20px"
            _hover={{
              transition: "0.2s",
              color: "green.500",
              // transform: "scale(1.1)",
            }}
          >
            <AiOutlineHome
              size={35}
              color="white.0"
              cursor="pointer"
              onClick={() => history.push("/dashboard")}
            />
          </Box>
        </Flex>
        <Flex className="boxIcone" alignItems="center" w="100%">
          {isSelected === "statistics" && (
            <Flex
              // boxShadow="0px 1px 7px 2px #5210AF"
              position="fixed"
              width="20px"
              h="60px"
              alignItems="center"
              justifyContent="flex"
              _hover={{
                transition: "0.2s",
                color: "green.500",
                // transform: "scale(1.1)",
              }}
            >
              <Flex w="3px" h="100%" bgColor="white.0" alignSelf="flex-start" />
            </Flex>
          )}
          <Box
            position="relative"
            left="20px"
            _hover={{
              transition: "0.2s",
              color: "green.500",
              // transform: "scale(1.1)",
            }}
          >
            <AiOutlinePieChart
              size={35}
              color="white.0"
              cursor="pointer"
              onClick={() => history.push("/statistics")}
            />
          </Box>
        </Flex>
        <Box
          position="fixed"
          bottom="28px"
          cursor="pointer"
          _hover={{
            transition: "0.2s",
            color: "green.500",
            // transform: "scale(1.1)",
          }}
        >
          <IoExitOutline
            size={40}
            onClick={() => logout("/Login")}
            data-testid="logout"
          />
        </Box>
      </Flex>
    </>
  );
};
