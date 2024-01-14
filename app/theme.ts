"use client";
import { Interpolation, Theme, createTheme } from "@mui/material/styles";

type Style = Interpolation<{
  theme: Omit<Theme, "components">;
}>;

const ahaButtonBaseStyle: Style = {
  textTransform: "none",
  fontFamily: "Ubuntu",
};

const ahaButtonDefaultSize: Style = {
  height: 40,
  fontSize: "14px",
  lineHeight: "14px",
  fontWeight: 700,
};

const ahaButtonSmallSize: Style = {
  height: 29,
  fontSize: "12px",
  lineHeight: "12px",
  fontWeight: 400,
  padding: "8px 10px",
};

const ahaButtonContainedStyle: Style = {
  backgroundColor: "var(--Primary-Main)!important",
  color: "var(--BG-Default)",
  border: "1px solid var(--BG-Default)",
  ":hover": {
    border: "1px solid var(--Primary-Main)",
    color: "var(--Primary-Main)",
    backgroundColor: "var(--BG-Default)!important",
  },
  ...ahaButtonBaseStyle,
};

const ahaButtonOutlinedStyle: Style = {
  border: "1px solid var(--Primary-Main)",
  color: "var(--Primary-Main)",
  backgroundColor: "var(--BG-Default)!important",
  ":hover": {
    backgroundColor: "var(--Primary-Main)!important",
    color: "var(--BG-Default)",
    border: "1px solid var(--BG-Default)",
  },
  ...ahaButtonBaseStyle,
};

const ahaButtonOutlinedSmall = {
  ...ahaButtonSmallSize,
  ...ahaButtonOutlinedStyle,
};

const ahaButtonContained: Style = {
  ...ahaButtonDefaultSize,
  ...ahaButtonContainedStyle,
};

const ahaButtonContainedSmall: Style = {
  ...ahaButtonSmallSize,
  ...ahaButtonContainedStyle,
};

const ahaButtonRound: Style = {
  borderRadius: 20,
};

export default createTheme({
  palette: {
    primary: {
      main: "#FF9B33",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "aha-contained" },
          style: ahaButtonContained,
        },
        {
          props: { variant: "aha-contained", size: "small" },
          style: ahaButtonContainedSmall,
        },
        {
          props: { variant: "aha-contained-round", size: "small" },
          style: { ...ahaButtonContainedSmall, ...ahaButtonRound },
        },
        {
          props: { variant: "aha-outlined-round", size: "small" },
          style: { ...ahaButtonOutlinedSmall, ...ahaButtonRound },
        },
      ],
      styleOverrides: {},
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
          marginBottom: 26,
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
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--Primary-Main)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 16,
          textTransform: "none",
          fontFamily: "Ubuntu",
          letterSpacing: "0.15px",
          minHeight: "0",
          padding: "13px 0",
          color: "var(--Greyscale-500)",
          lineHeight: "20px",
          "&.Mui-selected": {
            color: "var(--Primary-Main)",
            fontWeight: 700,
          },
        },
      },
    },
  },
});
