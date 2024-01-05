import * as yup from "yup"

import {createAndUpdateExpenseSchema} from "../schemas/expense.schema"


export type TCreateAndUpdateExpense = yup.InferType<typeof createAndUpdateExpenseSchema>