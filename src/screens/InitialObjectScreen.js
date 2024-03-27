import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import InitialObjectDesktop from "../components/screens/InitialObjectScreen/InitialObjectDesktop";

function InitialObjectScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <InitialObjectDesktop /> : <InitialObjectDesktop />;
}

export default InitialObjectScreen;
