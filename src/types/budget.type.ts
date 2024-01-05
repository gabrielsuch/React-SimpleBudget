import * as yup from "yup"

import {createAndUpdateBudgetSchema} from "../schemas/budget.schema"


export type TCreateAndUpdateBudget = yup.InferType<typeof createAndUpdateBudgetSchema>