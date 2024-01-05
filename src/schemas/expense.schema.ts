import * as yup from "yup"


export const createAndUpdateExpenseSchema = yup.object().shape({
    name: yup.string().required("Campo Obrigatório"),
    description: yup.string().required("Campo Obrigatório"),
    amount: yup.string().required("Campo Obrigatório"),
    type: yup.string().required("Campo Obrigatório")
})