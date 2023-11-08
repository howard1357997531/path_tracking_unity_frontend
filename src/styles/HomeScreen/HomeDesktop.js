import { Box, Button, Stack, Typography, styled } from "@mui/material";

export const StyleBox = styled(Box)({
  position: "relative",
  height: "calc(100vh - 64px)",
});
export const StyleTypographyBox = styled(Box)({
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
export const StyleTypography = styled(Typography)({});
export const StyleStack = styled(Stack)({
  position: "absolute",
  top: "calc(50% - 32px)",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "space-between",
  width: "40vw",
  padding: "20px",
});
export const StyleButton = styled(Button)(({ theme }) => ({
  height: "10vw",
  width: "45%",
  fontSize: "26px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    color: "orange",
  },
  [theme.breakpoints.up("sm")]: {
    // width: "100px",
    color: "red",
  },
  [theme.breakpoints.up("md")]: {
    // width: "200px",
    color: "yellow",
  },
  [theme.breakpoints.up("lg")]: {
    // width: "300px",
    color: "green",
  },
  [theme.breakpoints.up("xl")]: {
    // width: "400px",
    color: "blue",
  },
  "&:hover": {
    transform: "scale(1.1)",
    transition: "all 0.2s ease-in-out",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));
export const StyleIntroductionBox = styled(Box)({
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
export const StyleIntroduction = styled(Typography)({});
