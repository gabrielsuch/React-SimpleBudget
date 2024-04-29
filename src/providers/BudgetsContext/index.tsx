import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";

interface BudgetProviderProps {
  children: ReactNode;
}

interface Budget {
  id: string;
  name: string;
  max_value: number;
  categories: string[];
  userId: number;
  month: string;
}

interface BudgetsContextData {
  budgets: Budget[];
  listBudgets: (userId: number, accessToken: string) => Promise<void>;
  createBudget: (
    dataCreate: Omit<Budget, "id">,
    accessToken: string
  ) => Promise<void>;
  updateBudget: (
    budgetId: string,
    accessToken: string,
    dataUpdate: Omit<Budget, "id" | "userId">
  ) => Promise<void>;
  deleteBudget: (budgetId: string, accessToken: string) => Promise<void>;
}

const BudgetsContext = createContext<BudgetsContextData>(
  {} as BudgetsContextData
);

const useBudgets = () => {
  const context = useContext(BudgetsContext);

  if (!context) {
    throw new Error("useBudgets must be used with in a BudgetProvider");
  }
  return context;
};

const BudgetsProvider = ({ children }: BudgetProviderProps) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const listBudgets = useCallback(
    async (userId: number, accessToken: string) => {
      try {
        const res = await api.get(`/budgets?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setBudgets(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const createBudget = useCallback(
    async (dataCreate: Omit<Budget, "id">, accessToken: string) => {
      api
        .post("/budgets", dataCreate, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<Budget>) => {
          setBudgets((oldBudgets) => [...oldBudgets, response.data]);
        })
        .catch((err) => console.log(err));
    },
    []
  );

  const deleteBudget = useCallback(
    async (budgetId: string, accessToken: string) => {
      await api
        .delete(`/budgets/${budgetId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredBudgets = budgets.filter(
            (item) => item.id !== budgetId
          );
          setBudgets(filteredBudgets);
        })
        .catch((err) => console.log(err));
    },
    [budgets]
  );

  const testArraysEquality = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) {
      return true;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return true;
      }
    }
    return false;
  };

  const updateBudget = useCallback(
    async (
      budgetId: string,
      accessToken: string,
      dataUpdate: Omit<Budget, "id" | "userId">
    ) => {
      await api
        .patch(`/budgets/${budgetId}`, dataUpdate, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredBudgets = budgets.filter(
            (item) => item.id !== budgetId
          );
          const budgetFind = budgets.find((item) => item.id === budgetId);

          if (budgetFind) {
            if (dataUpdate.name !== "") {
              budgetFind.name = dataUpdate.name;
            }
            if (dataUpdate.max_value !== null) {
              budgetFind.max_value = dataUpdate.max_value;
            }
            if (
              testArraysEquality(dataUpdate.categories, budgetFind.categories)
            ) {
              budgetFind.categories = dataUpdate.categories;
            }
            setBudgets([...filteredBudgets, budgetFind]);
          }
        })
        .catch((err) => console.log(err));
    },
    [budgets]
  );

  return (
    <BudgetsContext.Provider
      value={{ budgets, listBudgets, createBudget, updateBudget, deleteBudget }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};

export { useBudgets, BudgetsProvider };
