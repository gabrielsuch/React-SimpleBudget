import * as yup from "yup"

import {createUserSchema, loginSchema} from "../schemas/user.schema"


export type TCreateUser = yup.InferType<typeof createUserSchema>
export type TLogin = yup.InferType<typeof loginSchema>