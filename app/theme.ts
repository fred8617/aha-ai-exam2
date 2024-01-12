"use client";
import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#FF9B33",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: "#fff",
          opacity: 0.3,
          lineHeight: "21px",
          fontFamily: "inherit",
          letterSpacing: 0.25,
          transform:
            ownerState.focused || ownerState.shrink
              ? undefined
              : "translate(18px, 20px) scale(1)",
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          borderRadius: 6,
        },
        input: {
          padding: "20px 18px 19px",
        },
        notchedOutline: {
          border: "3px solid var(--greyscale-white-50)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "#fff",
          opacity: 0.1,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "transparent",
          height: 8,
          padding: "6px 0!important",
        },
        track: {
          background: "linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%)",
        },
        rail: {
          background: "#fff",
        },
        mark: {
          display: "none",
        },
        markLabel: ({ ownerState, ["data-index"]: index }) => {
          return {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            color: "#fff",
            top: 18,
            opacity: ownerState.value === (index as number) + 1 ? 1 : 0.5,
          };
        },
      },
    },
  },
});
