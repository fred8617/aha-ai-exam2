"use client";
import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#FF9B33",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          height: 40,
          backgroundColor: "var(--Primary-Main)!important",
          color: "var(--BG-Default)",
          fontFamily: "Ubuntu",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "14px",
          padding: "13px 16px",
          border: "1px solid var(--BG-Default)",
          ":hover": {
            border: "1px solid var(--Primary-Main)",
            color: "var(--Primary-Main)",
            backgroundColor: "var(--BG-Default)!important",
          },
        },
      },
    },
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
          height: 21,
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
          padding: "6px 0",
          "@media (pointer: coarse)": {
            padding: "6px 0",
          },
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
        markLabel: ({ ownerState, ["data-index"]: index }) => ({
          "@media (pointer: coarse)": {
            top: 28,
          },
          fontSize: 16,
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "0.15px",
          color: "#fff",
          top: 28,
          opacity: ownerState.value === (index as number) + 1 ? 1 : 0.5,
        }),
        thumb: {
          "::after": {
            width: 14,
            height: 14,
            boxSizing: "content-box",
            borderColor: "var(--Tutor-Light)",
            borderWidth: 6,
            backgroundColor: "var(--Greyscale-BG---light)",
          },
        },
      },
    },
  },
});
