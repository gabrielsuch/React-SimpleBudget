import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { TopBar } from "../../components/TopBar";
import { SideMenu } from "../../components/SideMenu";
import { BottomMenu } from "../../components/BottomMenu";
import { BsPlusCircleFill } from "react-icons/bs";
import { CardBudget } from "../../components/Card/index";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect, useState } from "react";
import BlankBoard from "../../assets/DashboardImage3.svg";
import {
  MotionFlex,
  animationFlex,
  itemAnimation,
} from "../../styles/animation";
import { CardSkeleton } from "../../components/Loading";

import { useAuth } from "../../providers/AuthContext";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { listBudgets, budgets } = useBudgets();
  const { user, accessToken } = useAuth();
  const userId = user.id;

  useEffect(() => {
    listBudgets(userId, accessToken).then((rest) => setLoading(false));
  }, []);

  /* if(!accessToken) {
    return <Redirect to="/"/>
  } */

  return (
    <>
      <Flex justifyContent="center" alignItems="flex-start">
        <TopBar />
        <SideMenu isSelected={true} />
        <BottomMenu />
        <SideMenu isSelected={"dashboard"} />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pl={["0", "85px"]}
        >
          <Heading
            position="absolute"
            textAlign="center"
            fontSize={["2xl", "3xl"]}
            top={["110px", "28px"]}
            left={["20px", "220px"]}
            fontWeight="normal"
          >
            Hi, <b>{user.name}</b>!
          </Heading>

          {budgets.length > 0 ? (
            <>
              {loading ? (
                <Flex
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="center"
                  gap={3}
                >
                  <CardSkeleton repeatCount={4} />
                </Flex>
              ) : (
                <>
                  <Flex
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                    mt={["150px", "90px"]}
                    mb={["90px", "40px"]}
                  >
                    {budgets.map((item, idx) => {
                      return (
                        <CardBudget
                          key={idx}
                          budgetId={item.id}
                          budgetName={item.name}
                          budgetCategories={item.categories}
                          maxValue={item.max_value}
                        />
                      );
                    })}
                  </Flex>
                </>
              )}
            </>
          ) : (
            <MotionFlex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              h="100vh"
              pl={["0", "40px"]}
              // framer-motion props
              initial="hidden"
              animate="visible"
              variants={animationFlex}
              // variants={itemAnimation}
            >
              <Text
                fontSize={["xl", "3xl", "3xl", "3xl"]}
                color="green.500"
                // p="20px"
              >
                You don't have any registered budget
              </Text>
              <Flex alignItems="center" justifyContent="center" ml="auto">
                <Text mr={2} fontSize="lg" color="purple.400">
                  click on the button
                </Text>
                <BsPlusCircleFill />
                <Text ml={2} fontSize="lg" color="purple.400">
                  to start
                </Text>
              </Flex>
              <Image src={BlankBoard} w="300px" mt="4" />
            </MotionFlex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
