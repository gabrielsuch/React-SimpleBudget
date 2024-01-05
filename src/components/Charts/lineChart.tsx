import { useExpenses } from "../../providers/ExpensesContext";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";
import Chart from "react-google-charts";

export const LineChart = () => {
  const { listUserExpenses, getUserExpenses } = useExpenses();
  const { budgets, listBudgets } = useBudgets();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    getUserExpenses(user.id, accessToken);
    listBudgets(user.id, accessToken);
  }, []);

  const january = budgets
    .filter((item) => item.month === "01")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const february = budgets
    .filter((item) => item.month === "02")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const march = budgets
    .filter((item) => item.month === "03")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const april = budgets
    .filter((item) => item.month === "04")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const may = budgets
    .filter((item) => item.month === "05")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const june = budgets
    .filter((item) => item.month === "06")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const july = budgets
    .filter((item) => item.month === "07")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const august = budgets
    .filter((item) => item.month === "08")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const september = budgets
    .filter((item) => item.month === "09")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const october = budgets
    .filter((item) => item.month === "10")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const november = budgets
    .filter((item) => item.month === "11")
    .reduce((acc, { max_value }) => acc + max_value, 0);
  const december = budgets
    .filter((item) => item.month === "12")
    .reduce((acc, { max_value }) => acc + max_value, 0);

  const januaryExp = listUserExpenses
    .filter((item) => item.month === "01")
    .reduce((acc, { amount }) => acc + amount, 0);
  const februaryExp = listUserExpenses
    .filter((item) => item.month === "02")
    .reduce((acc, { amount }) => acc + amount, 0);
  const marchExp = listUserExpenses
    .filter((item) => item.month === "03")
    .reduce((acc, { amount }) => acc + amount, 0);
  const aprilExp = listUserExpenses
    .filter((item) => item.month === "04")
    .reduce((acc, { amount }) => acc + amount, 0);
  const mayExp = listUserExpenses
    .filter((item) => item.month === "05")
    .reduce((acc, { amount }) => acc + amount, 0);
  const juneExp = listUserExpenses
    .filter((item) => item.month === "06")
    .reduce((acc, { amount }) => acc + amount, 0);
  const julyExp = listUserExpenses
    .filter((item) => item.month === "07")
    .reduce((acc, { amount }) => acc + amount, 0);
  const augustExp = listUserExpenses
    .filter((item) => item.month === "08")
    .reduce((acc, { amount }) => acc + amount, 0);
  const septemberExp = listUserExpenses
    .filter((item) => item.month === "09")
    .reduce((acc, { amount }) => acc + amount, 0);
  const octoberExp = listUserExpenses
    .filter((item) => item.month === "10")
    .reduce((acc, { amount }) => acc + amount, 0);
  const novemberExp = listUserExpenses
    .filter((item) => item.month === "11")
    .reduce((acc, { amount }) => acc + amount, 0);
  const decemberExp = listUserExpenses
    .filter((item) => item.month === "12")
    .reduce((acc, { amount }) => acc + amount, 0);

  const dataLine = [
    ["Category", "Expenses", "Budget"],
    ["January", 0, 0],
    ["February", 0, 0],
    ["March", 0, 0],
    ["April", 500, 1000],
    ["May", 0, 0],
    ["June", 0, 0],
    ["July", 0, 0],
    ["August", 0, 0],
    ["September", 0, 0],
    ["October", 0, 0],
    ["November", 0, 0],
    ["December", 0, 0],
  ];

  for (let i = 1; i < dataLine.length; i++) {
    if (dataLine[i][0] === "January") {
      dataLine[i][1] = januaryExp;
      dataLine[i][2] = january;
    }
    if (dataLine[i][0] === "February") {
      dataLine[i][1] = februaryExp;
      dataLine[i][2] = february;
    }
    if (dataLine[i][0] === "March") {
      dataLine[i][1] = marchExp;
      dataLine[i][2] = march;
    }
    if (dataLine[i][0] === "April") {
      dataLine[i][1] = aprilExp;
      dataLine[i][2] = april;
    }
    if (dataLine[i][0] === "May") {
      dataLine[i][1] = mayExp;
      dataLine[i][2] = may;
    }
    if (dataLine[i][0] === "June") {
      dataLine[i][1] = juneExp;
      dataLine[i][2] = june;
    }
    if (dataLine[i][0] === "July") {
      dataLine[i][1] = julyExp;
      dataLine[i][2] = july;
    }
    if (dataLine[i][0] === "August") {
      dataLine[i][1] = augustExp;
      dataLine[i][2] = august;
    }
    if (dataLine[i][0] === "September") {
      dataLine[i][1] = septemberExp;
      dataLine[i][2] = september;
    }
    if (dataLine[i][0] === "October") {
      dataLine[i][1] = octoberExp;
      dataLine[i][2] = october;
    }
    if (dataLine[i][0] === "November") {
      dataLine[i][1] = novemberExp;
      dataLine[i][2] = november;
    }
    if (dataLine[i][0] === "December") {
      dataLine[i][1] = decemberExp;
      dataLine[i][2] = december;
    }
  }

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={dataLine}
      options={{
        title: "Total expenses",
        curveType: "function",
        colors: ["blueviolet", "MediumSpringGreen"],
        legend: {
          textStyle: {
            color: "#ffffff",
          },
          position: "bottom",
        },
        backgroundColor: "transparent",
        hAxis: {
          textStyle: {
            color: "#cecece",
          },
        },
        vAxis: {
          textStyle: {
            color: "#cecece",
          },
        },
        titleTextStyle: {
          color: "#ffffff",
        },
        chartArea: {
          // left: 50,
          // top: 50,
          width: "100%",
          height: "500px",
        },
      }}
    />
  );
};
