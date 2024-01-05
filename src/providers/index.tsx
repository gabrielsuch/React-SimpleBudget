import { ReactNode } from "react";

import { AuthProvider } from "./AuthContext/index";
import { BudgetsProvider } from "./BudgetsContext/index";
import { ExpensesProvider } from "./ExpensesContext/index";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <BudgetsProvider>
        <ExpensesProvider>{children}</ExpensesProvider>
      </BudgetsProvider>
    </AuthProvider>
  );
};
