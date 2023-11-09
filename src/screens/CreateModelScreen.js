import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CreateModelDesktop from "../components/screens/CreateModelScreen/CreateModelDesktop";
import CreateModelMobile from "../components/screens/CreateModelScreen/CreateModelMobile";

function CreateModelScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return matches ? <CreateModelDesktop /> : <CreateModelMobile />;
}

export default CreateModelScreen;
