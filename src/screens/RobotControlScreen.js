import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import RobotControlDesktop from "../components/screens/RobotControlScreen/RobotControlDesktop";
import RobotControlMobile from "../components/screens/RobotControlScreen/RobotControlMobile";

function RobotControlScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <RobotControlDesktop /> : <RobotControlMobile />;
}

export default RobotControlScreen;
