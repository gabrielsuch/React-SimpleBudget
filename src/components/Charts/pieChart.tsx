import { useExpenses } from "../../providers/ExpensesContext";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";
import Chart from "react-google-charts";
import { Flex } from "@chakra-ui/react";

export const PieChart = () => {
  const { listUserExpenses, getUserExpenses } = useExpenses();
  const { listBudgets } = useBudgets();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    getUserExpenses(user.id, accessToken);
    listBudgets(user.id, accessToken);
  }, []);

  const health = listUserExpenses
    .filter((item) => item.type === "Health")
    .reduce((acc, { amount }) => acc + amount, 0);
  const entertainment = listUserExpenses
    .filter((item) => item.type === "Entertainment")
    .reduce((acc, { amount }) => acc + amount, 0);
  const transport = listUserExpenses
    .filter((item) => item.type === "Transport")
    .reduce((acc, { amount }) => acc + amount, 0);
  const home = listUserExpenses
    .filter((item) => item.type === "Home")
    .reduce((acc, { amount }) => acc + amount, 0);
  const food = listUserExpenses
    .filter((item) => item.type === "Food")
    .reduce((acc, { amount }) => acc + amount, 0);
  const others = listUserExpenses
    .filter((item) => item.type === "Others")
    .reduce((acc, { amount }) => acc + amount, 0);

  const data = [
    ["Categories", "Expenses"],
    ["Health", 0],
    ["Entertainment", 0],
    ["Transport", 0],
    ["Home", 0],
    ["Food", 0],
    ["Others", 0],
  ];

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === "Health") {
      data[i][1] = Number(health);
    }
    if (data[i][0] === "Entertainment") {
      data[i][1] = Number(entertainment);
    }
    if (data[i][0] === "Transport") {
      data[i][1] = Number(transport);
    }
    if (data[i][0] === "Home") {
      data[i][1] = Number(home);
    }
    if (data[i][0] === "Food") {
      data[i][1] = Number(food);
    }
    if (data[i][0] === "Others") {
      data[i][1] = Number(others);
    }
  }

  return (
    // <Flex left="120px">
    <Chart
      chartType="PieChart"
      data={data}
      options={{
        is3D: true,
        title: "",
        colors: [
          "blueviolet",
          "Indigo",
          "DarkViolet",
          "MediumSeaGreen",
          "SpringGreen",
        ],
        backgroundColor: "transparent",
        titleTextStyle: {
          color: "#ffffff",
        },
        legend: {
          textStyle: {
            color: "#ffffff",
          },
          position: "bottom",
        },
        chartArea: {
          // left: 80,
          top: 160,
          width: "100%",
          height: "100px",
        },
      }}
      width="100%"
      height="500px"
    />
    // </Flex>
  );
};
