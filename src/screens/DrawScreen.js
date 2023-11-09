import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import DrawDesktop from "../components/screens/DrawScreen/DrawDesktop";
import DrawMobile from "../components/screens/DrawScreen/DrawMobile";

function DrawScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <DrawDesktop /> : <DrawMobile />;
}

export default DrawScreen;
