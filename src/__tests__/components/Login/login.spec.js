import {screen, render} from "@testing-library/react"
import {Login} from "../../../pages/Login/index"

describe("Login Page", () => {
    it("Should be able to have Email and Password Inputs", async () => {
        render (
            <Login />
        )

        expect(screen.getByText("Email")).toBeTruthy()
        expect(screen.getByText("Password")).toBeTruthy()
    })
})