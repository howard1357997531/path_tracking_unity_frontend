import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ShowDesktop from "../components/screens/ShowScreen/ShowDesktop";
import ShowMobile from "../components/screens/ShowScreen/ShowMobile";

function ShowScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <ShowDesktop /> : <ShowMobile />;
}

export default ShowScreen;
