import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import HomeDesktop from "../components/screens/HomeScreen/HomeDesktop";
import HomeMobile from "../components/screens/HomeScreen/HomeMobile";

function HomeScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return matches ? <HomeDesktop /> : <HomeMobile />;
}

export default HomeScreen;
