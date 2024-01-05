import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthContext";
import { useBudgets } from "../../providers/BudgetsContext";
import { InputForm } from "../Input";
import { InputMaskedCurrency } from "../Input/inputMasked";

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  max_value: yup.string().required("Max value required"),
});

interface ModalData {
  name: string;
  max_value: string;
  categories: string[];
  userId: number;
  month: string;
}

interface ModalAddBudgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAddBudget = ({ isOpen, onClose }: ModalAddBudgetProps) => {
  const { user, accessToken } = useAuth();
  const { createBudget } = useBudgets();

  const toast = useToast();

  let data = new Date();
  const month = String(data.getMonth() + 1).padStart(2, '0');

  const onSubmitFunction = ({ name, max_value }: ModalData) => {
    const newMaxValue = Number(max_value.replaceAll(".", "").replace(",", "."));

    const newData = {
      name: name,
      max_value: newMaxValue,
      categories: [
        "Food",
        "Entertainment",
        "Transport",
        "Home",
        "Health",
        "Others",
      ],
      userId: user.id,
      month: month,
    };
    createBudget(newData, accessToken)
      .then((_) => {
        toast({
          title: "Budget created successfully!",
          duration: 3000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        onClose();
        reset();
      })
      .catch((err) => console.log(err));
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          marginY="auto"
          bg="black.500"
          w="95%"
          border="1px solid"
          borderColor="green.500"
          pb="25px"
          borderRadius="10px"
          boxShadow="0px 1px 3px 2px #00F59B"
          as="form"
          onSubmit={handleSubmit(onSubmitFunction)}
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
              Add a new budget
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
            <FormControl
              display="flex"
              flexDir="column"
              justifyContent="center"
              color="white"
              >
              <InputForm
                name="name"
                label="Name"
                register={register}
                error={errors.name}
                placeholder="Type budget name"
              />
            </FormControl>

            <FormControl
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <InputMaskedCurrency
                name="max_value"
                label="Max value"
                register={register}
                placeholder="Ex: 3000.00"
                error={errors.max_value}
                prefix="R$"
              />
            </FormControl>

            <Button
              mt="2"
              h="60px"
              w="100%"
              type="submit"
              fontWeight="normal"
              fontSize="lg"
              bg="purple.500"
              border="2px solid"
              borderColor="purple.500"
              _hover={{ transform: "scale(1.08)" }}
            >
              Add a new budget now
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
