import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import FixDesktop from "../components/screens/FixScreen/FixDesktop";
import FixMobile from "../components/screens/FixScreen/FixMobile";

function FixScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <FixDesktop /> : <FixMobile />;
}

export default FixScreen;
