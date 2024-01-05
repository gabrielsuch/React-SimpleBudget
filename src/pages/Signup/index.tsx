import {
  Box,
  Flex,
  Image,
  Text,
  FormControl,
  Button,
  Heading,
  Link,
  useToast,
} from "@chakra-ui/react";

import {
  MotionFlex,
  animationFlex,
  itemAnimation,
} from "../../styles/animation";

import { Link as ReactRouterLink } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SignupImage from "../../assets/SignupImage.png";
import Logo from "../../assets/Logo.png";

import { useAuth } from "../../providers/AuthContext/index";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import { InputForm } from "../../components/Input/index";

interface DataProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const Signup = () => {
  const { createRegister } = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Required field"),
    email: yup.string().required("Required field").email("Invalid email"),
    password: yup.string().required("Required field"),
    confirm_password: yup
      .string()
      .required("Required field")
      .oneOf([yup.ref("password")], "Passwords didn't match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    resolver: yupResolver(schema),
  });

  const sendData = (data: DataProps) => {
    createRegister(data);
  };

  return (
    <>
      <Box h={["150px", "200px"]} p="4">
        <Image src={Logo} alt="Logo" w="150px" />
      </Box>
      <Flex
        display="flex"
        flexDirection={["column", "column", "row", "row"]}
        width="100%"
        height="60vh"
        mb="32"
      >
        <Flex
          width={["100%", "100%", "60%", "60%"]}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            width="70%"
            textAlign="right"
            fontSize="3xl"
            marginBottom="30px"
            display={["none", "none", "flex", "flex"]}
          >
            an easy and simple way to befriend with your financial life
          </Text>
          <Image
            src={SignupImage}
            alt="Signup Image"
            maxWidth="350px"
            mt="6"
            ml={["220px", "0px"]}
            display={["none", "none", "flex", "flex"]}
          />
        </Flex>
        <MotionFlex
          width={["100%", "100%", "50%", "40%"]}
          marginTop={["100px", "50px", "0px"]}
          alignItems="center"
          justifyContent="center"
          height="60vh"
          // framer-motion props
          initial="hidden"
          animate="visible"
          variants={animationFlex}
        >
          <FormControl
            maxWidth="440px"
            backgroundColor="green.500"
            padding={["10px", "20px"]}
            color="black.500"
            borderRadius="5px"
            mr="4"
            ml="4"
          >
            <form onSubmit={handleSubmit(sendData)}>
              <Flex justifyContent="space-between" alignItems="center" mb="6">
                <Heading
                  fontSize={["24px", "24px", "20px", "24px"]}
                  fontWeight="bold"
                >
                  Sign up
                </Heading>
                <Flex flexDirection={["column", "row"]}>
                  <Text color="gray.350" mr={["0", "2"]}>
                    Already have an account?{" "}
                  </Text>
                  <Link
                    color="purple.500"
                    fontWeight="bold"
                    _hover={{ color: "purple.700" }}
                    as={ReactRouterLink}
                    to="/login"
                    textAlign="right"
                  >
                    Login now
                  </Link>
                </Flex>
              </Flex>

              <InputForm
                name="name"
                label="Name"
                register={register}
                error={errors.name}
                icon={FaUser}
                placeholder="John Smith"
              />
              <InputForm
                name="email"
                label="Email"
                register={register}
                error={errors.email}
                icon={FaEnvelope}
                placeholder="your@email.com"
              />
              <InputForm
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password}
                icon={FaLock}
                data-testid="SignUpPassword"
                placeholder="******"
              />
              <InputForm
                name="confirm_password"
                label="Confirm password"
                type="password"
                register={register}
                error={errors.confirm_password}
                icon={FaLock}
                data-testid="SignUpConfirmPassword"
                placeholder="******"
              />

              <Button
                width="100%"
                height="60px"
                background="purple.500"
                color="white"
                type="submit"
                fontWeight="normal"
                fontSize="lg"
                mt="2"
                _hover={{ transform: "scale(1.02)" }}
              >
                SIGN UP
              </Button>
            </form>
          </FormControl>
        </MotionFlex>
      </Flex>
    </>
  );
};
