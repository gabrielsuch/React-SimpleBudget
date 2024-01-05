import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useExpenses } from "../../providers/ExpensesContext";
import { BottomMenu } from "../../components/BottomMenu";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect } from "react";
import { LineChart } from "../../components/Charts/lineChart";
import { PieChart } from "../../components/Charts/pieChart";
import { SideMenu } from "../../components/SideMenu";
import { useAuth } from "../../providers/AuthContext";
import { TopBar } from "../../components/TopBar";
import EmptyStreet from "../../assets/Empty.svg";
import { animationFlex, MotionFlex } from "../../styles/animation";

export const Statistics = () => {
  const { listUserExpenses, getUserExpenses } = useExpenses();
  const { listBudgets } = useBudgets();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    getUserExpenses(user.id, accessToken);
    listBudgets(user.id, accessToken);
  }, []);

  return (
    <>
      <Flex justifyContent="center">
        <TopBar />
        <BottomMenu />
        <SideMenu isSelected={"statistics"} />
        <Box w="70%">
          <Heading
            position="absolute"
            textAlign="center"
            fontSize={["2xl", "3xl"]}
            top={["110px", "28px"]}
            left={["20px", "220px"]}
            fontWeight="normal"
          >
            Statistics
          </Heading>
          <Box m="auto" w="100%" className="paidografico">
            {listUserExpenses.length > 0 ? (
              <MotionFlex
                alignItems="center"
                flexDirection="column"
                pl={["0", "120px"]}
                // framer-motion props
                initial="hidden"
                animate="visible"
                variants={animationFlex}
              >
                <PieChart />
                <Box width="100%" mb="32">
                  <LineChart />
                </Box>
              </MotionFlex>
            ) : (
              <MotionFlex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                pl={["0", "120px"]}
                // framer-motion props
                initial="hidden"
                animate="visible"
                variants={animationFlex}
                mt="52"
              >
                <Text fontSize={["2xl", "3xl", "3xl", "3xl"]} color="green.500">
                  You have to add an expense to view the charts
                </Text>
                <Image
                  src={EmptyStreet}
                  alt="Empty"
                  mt="4"
                  mb="4"
                  w={["300px", "600px"]}
                />
              </MotionFlex>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
};
