import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { MotionFlex, animationFlex } from "../../styles/animation";
import Logo from "../../assets/Logo.png";
import HomeImage from "../../assets/HomeImage.svg";
import { AiFillHeart } from "react-icons/ai";

export const Home = () => {
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <Box height="100vh">
      <Flex justifyContent="space-between" alignContent="center" p="4">
        <Image src={Logo} alt="Logo" w="150px" />
        <Center display={["none", "flex"]}>
          <Button
            h="60px"
            w="150px"
            fontWeight="normal"
            fontSize="2xl"
            variant="outline"
            border="2px solid"
            borderColor="purple.500"
            mr="4"
            _hover={{ color: "green.500", transform: "scale(1.08)" }}
            onClick={() => redirect("/login")}
          >
            Login
          </Button>
          <Button
            h="60px"
            w="150px"
            fontWeight="normal"
            fontSize="2xl"
            variant="outline"
            border="2px solid"
            borderColor="purple.500"
            _hover={{ color: "green.500", transform: "scale(1.08)" }}
            onClick={() => redirect("/signup")}
          >
            Sign up
          </Button>
        </Center>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt="14"
        h="75vh"
        display={["none", "flex"]}
      >
        <Flex w="50%" flexDirection="column" alignSelf="flex-start">
          <Flex flexDirection="column">
            <Text fontSize="45px" color="purple.500">
              gain control over your financial life
            </Text>
            <Text color="gray.200" fontSize="xl" maxWidth="650px">
              no more being caught off guard by unexpected and unnecessary
              expenses — with the SimpleBudget application, you can keep your
              budget in order in an extremely <strong>simple</strong> and{" "}
              <strong>elegant</strong> way
            </Text>
          </Flex>

          <Flex flexDirection="column" w="520px" p="2" mt="32">
            <Center mr="auto">
              <Text color="gray.100" fontSize="lg" mr="2">
                Made with
              </Text>
              <AiFillHeart color="red" />
              <Text color="gray.100" fontSize="lg" ml="2">
                for Kenzie Academy Brazil
              </Text>
            </Center>

            <Flex mt="4">
              <HStack spacing="4" mt="4">
                <Center flexDirection="column">
                  <Image
                    src="https://ca.slack-edge.com/TQZR39SET-U028XELAP7D-ad95927054d1-512"
                    alt=""
                    w="50px"
                  />
                  <Text fontSize="sm" color="gray.100">
                    André Martins
                  </Text>
                </Center>
                <Center flexDirection="column">
                  <Image
                    src="https://ca.slack-edge.com/TQZR39SET-U028V6PB08M-99b1721f96b7-512"
                    alt=""
                    w="50px"
                    filter="grayscale(100%)"
                  />
                  <Text fontSize="sm" color="gray.100">
                    Breno Santos
                  </Text>
                </Center>
                <Center flexDirection="column">
                  <Image
                    src="https://ca.slack-edge.com/TQZR39SET-U02448EMNU8-abd456066848-512"
                    alt=""
                    w="50px"
                    h="50px"
                    objectFit="cover"
                    filter="grayscale(100%)"
                  />
                  <Text fontSize="sm" color="gray.100">
                    Bruno Guedes
                  </Text>
                </Center>
                <Center flexDirection="column">
                  <Image
                    src="https://ca.slack-edge.com/TQZR39SET-U0292DJA9U3-e081f7d54400-512"
                    alt=""
                    w="50px"
                    h="50px"
                    objectFit="cover"
                    filter="grayscale(100%)"
                  />
                  <Text fontSize="sm" color="gray.100">
                    Gabriel Such
                  </Text>
                </Center>
                <Center flexDirection="column">
                  <Image
                    src="https://ca.slack-edge.com/TQZR39SET-U028ZT6QCDB-68710b0dffa3-512"
                    alt=""
                    w="50px"
                    filter="grayscale(100%)"
                  />
                  <Text fontSize="sm" color="gray.100">
                    Ingridy Rodrigues
                  </Text>
                </Center>
              </HStack>
            </Flex>
          </Flex>
        </Flex>
        <MotionFlex
          w="30%"
          ml="12"
          // framer-motion props
          initial="hidden"
          animate="visible"
          variants={animationFlex}
        >
          <Flex flexDirection="column" mt={["16", "0"]}>
            <Image
              src={HomeImage}
              alt="home image"
              w={["300px", "300px", "400px", "800px"]}
            />
            <Text fontSize="3xl" mt="4" align="center" fontWeight="bold">
              ...starting now
            </Text>
          </Flex>
        </MotionFlex>
      </Flex>

      {/* Mobile */}
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        display={["flex", "none"]}
      >
        <Text fontSize="xl" color="purple.500" mt="16">
          gain control over your financial life
        </Text>
        <Image src={HomeImage} alt="home image" w="300px" mt="8" />
        <Text fontSize="3xl" mt="8" align="center" fontWeight="bold">
          ...starting now
        </Text>
        <Center mt="8">
          <Button
            h="60px"
            w="150px"
            fontWeight="normal"
            fontSize="2xl"
            variant="outline"
            border="2px solid"
            borderColor="purple.500"
            mr="4"
            _hover={{ color: "green.500", transform: "scale(1.08)" }}
            onClick={() => redirect("/login")}
          >
            Login
          </Button>
          <Button
            h="60px"
            w="150px"
            fontWeight="normal"
            fontSize="2xl"
            variant="outline"
            border="2px solid"
            borderColor="purple.500"
            _hover={{ color: "green.500", transform: "scale(1.08)" }}
            onClick={() => redirect("/signup")}
          >
            Sign up
          </Button>
        </Center>
      </Flex>
    </Box>
  );
};
