import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    black: {
      300: "#141416",
      500: "#0B0B0B",
    },
    green: {
      500: "#00F59B",
    },
    purple: {
      500: "#7014F2",
    },
    white: {
      0: "#FFFFFF",
    },
    gray: {
      100: "#6C757D",
      300: "#595959",
      350: "#3C3D38",
    },
    gradient: {
      0: "linear-gradient(180deg, hsla(265, 90%, 51%, 1) 0%, hsla(0, 0%, 4%, 1) 100%)",
    },
  },

  fonts: {
    heading: "PT Sans",
    body: "PT Sans",
    other: "Roboto",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  styles: {
    global: {
      body: {
        bg: "black.500",
        color: "white",
      },
    },
  },
});
