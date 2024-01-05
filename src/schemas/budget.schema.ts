import * as yup from "yup"


export const createAndUpdateBudgetSchema = yup.object().shape({
    name: yup.string().required("Campo Obrigatório"),
    max_value: yup.string().required("Campo Obrigatório")
})