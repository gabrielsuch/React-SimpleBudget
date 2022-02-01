import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import {useAuth} from "../AuthContext/index"

import {useToast} from "@chakra-ui/react"

interface ExpenseProviderProps {
  children: ReactNode;
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  description: string;
  type: string;
  budgetId: string;
}

interface ExpensesContextData {
  expenses: Expense[];
  listExpenses: (budgetId: string, accessToken: string) => Promise<void>;
  createExpense: (
    dataCreate: Omit<Expense, "id">,
    accessToken: string
  ) => Promise<void>;
  updateExpense: (
    expenseId: string,
    accessToken: string,
    dataUpdate: Omit<Expense, "id" | "budgetId">
  ) => Promise<void>;
  deleteExpense: (expenseId: string, accessToken: string) => Promise<void>;
  listAllExpenses: (accessToken: string) => Promise<void>;
  allExpenses: Expense[];
  restoreInfos: (id: string, reset: ({}) => void) => void
}

const ExpensesContext = createContext<ExpensesContextData>(
  {} as ExpensesContextData
);

const useExpenses = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error("useExpenses must be used with in a ExpensesProvider");
  }
  return context;
};

const ExpensesProvider = ({ children }: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  //const [errMessage, setErrMessage] = useState<string>("");

  const toast = useToast()

  const {accessToken} = useAuth()

  const listAllExpenses = useCallback(async (accessToken: string) => {
    try {
      const res = await api.get("/expenses", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setAllExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const listExpenses = useCallback(
    async (budgetId: string, accessToken: string) => {
      try {
        const res = await api.get(`/expenses?budgetId=${budgetId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const createExpense = useCallback(
    async (dataCreate: Omit<Expense, "id">, accessToken: string) => {
      api
        .post("/expenses", dataCreate, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<Expense>) => {
          setExpenses((oldExpenses) => [...oldExpenses, response.data]);
        })
        .catch((err) => console.log(err));
    },
    []
  );

  const deleteExpense = useCallback(
    async (expenseId: string, accessToken: string) => {
      await api
        .delete(`/expenses/${expenseId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredExpenses = expenses.filter(
            (item) => item.id !== expenseId
          );
          setExpenses(filteredExpenses);
        })
        .catch((err) => console.log(err));
    },
    [expenses]
  );

  const updateExpense = useCallback(
    async (
      expenseId: string,
      accessToken: string,
      dataUpdate: Omit<Expense, "id" | "budgetId">
    ) => {
      await api
        .patch(`/expenses/${expenseId}`, dataUpdate, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredExpenses = expenses.filter(
            (item) => item.id !== expenseId
          );
          const expenseFind = expenses.find((item) => item.id === expenseId);

          if (expenseFind) {
            if (dataUpdate.name !== "") {
              expenseFind.name = dataUpdate.name;
            }
            if (dataUpdate.amount !== null) {
              expenseFind.amount = dataUpdate.amount;
            }
            if (dataUpdate.description !== "") {
              expenseFind.description = dataUpdate.description;
            }
            if (dataUpdate.type !== "") {
              expenseFind.type = dataUpdate.type;
            }

            toast({
              title: "Expense Updated!",
              duration: 3000,
              isClosable: true,
              status: "success",
              position: "top"
            })
            setExpenses([...filteredExpenses, expenseFind]);
          }
        })
        .catch((err) => console.log(err));
    },
    [expenses]
  );

  const restoreInfos = (id: string, reset: ({}) => void) => {
    api.get(`/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      reset({
        name: response.data.name,
        description: response.data.description,
        amount: response.data.amount
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        listExpenses,
        createExpense,
        updateExpense,
        deleteExpense,
        listAllExpenses,
        allExpenses,
        restoreInfos
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export { useExpenses, ExpensesProvider };
