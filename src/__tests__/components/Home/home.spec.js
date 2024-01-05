import {screen, render} from "@testing-library/react"
import {Home} from "../../../pages/Home/index"

describe("Home Page", () => {
    it("Should be able to have Login Button and Signup Button", async () => {
        render (
            <Home/>
        )

        expect(screen.getByText("Login")).toBeTruthy()
        expect(screen.getByText("Sign up")).toBeTruthy()
    })
})