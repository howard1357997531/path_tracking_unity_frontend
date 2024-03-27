import React from "react";
import { Box, Stack } from "@mui/material";
import SelectModel from "./SelectModel";
import RobotField from "./RobotField";

function RobotControlDesktop() {
  return (
    <Box
      sx={{
        padding: "0px 100px",
        paddingTop: "15px",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        sx={{
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <SelectModel />
        <RobotField />
      </Stack>
    </Box>
  );
}

export default RobotControlDesktop;
