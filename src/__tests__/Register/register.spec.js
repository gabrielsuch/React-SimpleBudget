import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Signup } from "../../pages/Signup";
import { Login } from "../../pages/Login";
import { Routes } from "../../routes/index";
import { theme } from "../../styles/theme";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Providers } from "../../providers";

describe("Sign Up", () => {
  it("Should be able to register a new user", async () => {
    //render(<BrowserRouter><MyComponent/></BrowserRouter>);
    render(
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Providers>
            <App />
          </Providers>
        </ChakraProvider>
      </BrowserRouter>
    );
    const ButtonSignUp = screen.getByText("Sign up");
    expect(screen.getByText("Login")).toBeTruthy();
    fireEvent.click(ButtonSignUp);

    await waitFor(() => {
      const inputName = screen.getByPlaceholderText("John Smith");
      const inputEmail = screen.getByPlaceholderText("your@email.com");
      const inputPassowrd = screen.getByTestId("SignUpPassword");
      const inputConfirm = screen.getByTestId("SignUpConfirmPassword");
      expect(
        inputName && inputEmail && inputPassowrd && inputConfirm
      ).toBeTruthy();
    });
  });
});
