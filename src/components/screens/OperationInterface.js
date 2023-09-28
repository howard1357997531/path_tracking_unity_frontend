import React from "react";
import { Box, Stack } from "@mui/material";
import SelectModelField from "../OperationInterface/SelectModelField";
import ControlRobotField from "../OperationInterface/ControlRobotField";

function OperationInterface() {
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
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <SelectModelField />
        <ControlRobotField />
      </Stack>
    </Box>
  );
}

export default OperationInterface;
