import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  Text,
  Heading,
  useToast,
  FormControl,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthContext/index";
import { useExpenses } from "../../providers/ExpensesContext/index";
import { InputForm } from "../Input";
import { InputMaskedCurrency } from "../Input/inputMasked";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  amount: yup.string().required("Amount is required"),
  type: yup.string().required("Choose a category"),
});

interface ModalData {
  name: string;
  description: string;
  amount: string;
  budgetId: string;
  id: string;
  type: string;
}

interface SelectedItem {
  name: string;
  description: string;
  amount: string;
  budgetId: string;
  id: string;
  type: string;
}

interface ModalEditExpenseProps {
  budgetCategories: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedItem: SelectedItem;
}

export const ModalEditExpense = ({
  budgetCategories,
  isOpen,
  onClose,
  selectedItem,
}: ModalEditExpenseProps) => {
  const { accessToken } = useAuth();
  const { restoreInfos, updateExpense, deleteExpense } = useExpenses();

  const toast = useToast();

  const handleDelete = () => {
    deleteExpense(selectedItem.id, accessToken);
    onClose();
  };

  const changeExpenseData = (data: ModalData) => {
    const newAmount = Number(data.amount.replace(",", "."));

    const newData = {
      name: data.name,
      description: data.description,
      amount: newAmount,
      type: data.type,
    };

    updateExpense(selectedItem.id, accessToken, newData)
      .then((_) => {
        toast({
          title: "Expense updated successfully!",
          duration: 2000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        onClose();
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

  useEffect(() => {
    if (selectedItem.id) {
      restoreInfos(selectedItem.id, reset);
    }
  }, [selectedItem]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          marginY="auto"
          bg="black.500"
          border="1px solid"
          borderColor="green.500"
          pb="20px"
          borderRadius="10px"
          boxShadow="0px 1px 7px 2px #00F59B"
          as="form"
          onSubmit={handleSubmit(changeExpenseData)}
        >
{/* <!--           <ModalHeader paddingY="20px">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h4" fontSize="24px" ml="20px">
                Edit expense
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
            </Flex>
          </ModalHeader> -->
<!--           boxShadow="1px 0px 6px 0px rgb(0,245,155)"
          as="form"
          onSubmit={handleSubmit(changeExpenseData)} --> */}
        {/* > */}
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
              Edit expense
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
          <ModalBody
            // pb={3.5}
            w="90%"
            display="flex"
            flexDir="column"
            alignSelf="center"
          >
            <Box h="50px" w="60%" mb="12px">
              <Box
                w="95%"
                border="2px solid"
                borderColor="purple.500"
                borderRadius="5px"
                _hover={{ borderColor: "#474747", cursor: "pointer" }}
                padding="2px"
                bg="black.500"
                as="select"
                fontSize="20px"
                mb="1px"
                paddingRight="5px"
                defaultValue={""}
                {...register("type")}
              >
                <Box as="option" disabled value="">
                  Categories
                </Box>

                {budgetCategories.map((item, index) => (
                  <Box as="option" value={item} key={index}>
                    {item}
                  </Box>
                ))}
              </Box>
              <Text color="red.500" fontSize="md" pl="2" mb="0" pb="0" h="20px">
                {errors.type?.message}
              </Text>
            </Box>

            <InputForm
              name="name"
              label="Name"
              register={register}
              placeholder="Ex: Cardiologist"
              error={errors.name}
            />

            <InputForm
              name="description"
              label="Description"
              register={register}
              placeholder="Ex: Medical check - Dr.Strauss"
              error={errors.description}
            />

            <InputMaskedCurrency
              name="amount"
              label="Amount"
              register={register}
              placeholder="Ex: 300.00"
              error={errors.amount}
              prefix="R$"
            />
            
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
              />
            </FormControl>
            <FormControl
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <InputForm
                name="description"
                label="Description"
                register={register}
                error={errors.description}
              />
            </FormControl>
            <FormControl
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <InputForm
                name="amount"
                label="Amount"
                register={register}
                placeholder="Ex: 200"
                error={errors.amount}
              />
            </FormControl>

            <Button
              h="60px"
              w="100%"
              type="submit"
              fontWeight="normal"
              fontSize="lg"
              bg="purple.500"
              // border="2px solid"
              borderColor="purple.500"
              onClickCapture={() => {}}
              _hover={{ transform: "scale(1.08)" }}
            >
              Confirm changes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
