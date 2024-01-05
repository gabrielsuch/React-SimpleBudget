import {screen, render} from "@testing-library/react"
import {SideMenu} from "../../../components/SideMenu/index"

describe("SideMenu Component", () => {
    it("Should be able to have Add Budget Button", async () => {
        render (
            <SideMenu />
        )

        expect(screen.getByTestId("addbudget")).toBeTruthy()
        expect(screen.getByTestId("logout")).toBeTruthy()
    })
})