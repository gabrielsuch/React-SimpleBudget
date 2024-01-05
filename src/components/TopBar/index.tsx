import { Box, Center, Flex, Image } from "@chakra-ui/react";
import SmallLogo from "../../assets/LogoSm.svg";
import { IoExitOutline } from "react-icons/io5";
import { useAuth } from "../../providers/AuthContext";

export const TopBar = () => {
  const { logout } = useAuth();

  return (
    <Box
      w="100%"
      h="80px"
      bg="black.500"
      display={["block", "none", "none", "none"]}
      position="fixed"
      top="0"
      overflow="hidden"
      zIndex="1"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        h="80px"
        pt="4"
        pl="4"
        pr="4"
        pb="4"
      >
        <Image src={SmallLogo} w="50px" />
        <Center
          as="button"
          _hover={{
            transition: "0.4s",
            color: "green.500",
          }}
          onClick={() => logout('/')}
        >
          <IoExitOutline size={35} />
        </Center>
      </Flex>
    </Box>
  );
};
