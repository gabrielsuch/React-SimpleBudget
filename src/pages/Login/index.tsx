import {
  Flex,
  Image,
  Text,
  FormControl,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";

import {
  MotionFlex,
  animationFlex,
  itemAnimation,
} from "../../styles/animation";

import { useHistory } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import LoginImage from "../../assets/LoginImage.png";
import Logo from "../../assets/Logo.png";

import { useAuth } from "../../providers/AuthContext/index";

import { FaEnvelope, FaLock } from "react-icons/fa";

import { InputForm } from "../../components/Input/index";

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const history = useHistory();

  const { login } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().required("Required field").email("Invalid email"),
    password: yup.string().required("Required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const sendData = (data: LoginProps) => {
    login(data);
  };

  return (
    <>
      <Flex alignContent="center" p="4" mb={["0", "4"]}>
        <Image src={Logo} alt="Logo" w="150px" />
      </Flex>
      <Flex
        display="flex"
        flexDirection={["column", "column", "row-reverse", "row-reverse"]}
        width="100%"
        height="80vh"
      >
        <Flex
          width={["100%", "100%", "60%", "60%"]}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={LoginImage}
            alt="Login Image"
            width={["300px", "400px", "600px"]}
            mt="8"
            mb="8"
            // mr="16"
          />
        </Flex>
        <MotionFlex
          width={["100%", "100%", "40%", "40%"]}
          height="80vh"
          alignItems="center"
          justifyContent="center"
          // framer-motion props
          initial="hidden"
          animate="visible"
          variants={animationFlex}
          // variants={itemAnimation}
          ml={["0", "16"]}
        >
          <FormControl
            maxWidth="440px"
            backgroundColor="green.500"
            padding={["10px", "20px"]}
            color="black.500"
            borderRadius="5px"
            mr="4"
            ml="4"
            mb="4"
          >
            <form onSubmit={handleSubmit(sendData)}>
              <Heading fontSize="24px" fontWeight="bold" mb="6">
                Login
              </Heading>

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
                placeholder="******"
                register={register}
                error={errors.password}
                icon={FaLock}
              />

              <Button
                width="100%"
                height="60px"
                background="purple.500"
                color="white"
                fontWeight="normal"
                fontSize="lg"
                type="submit"
                mt="2"
                _hover={{ transform: "scale(1.02)" }}
              >
                LOGIN
              </Button>
              <Text textAlign="right" mt="4" mb="2">
                Don't have an account yet?
              </Text>
              <Button
                width="100%"
                height="60px"
                background="purple.500"
                color="white"
                fontWeight="normal"
                fontSize="lg"
                _hover={{ transform: "scale(1.02)" }}
                onClick={() => history.push("/signup")}
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
