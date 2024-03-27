import { Box, Stack } from "@mui/material";
import React from "react";
import SelectInitialModel from "./SelectInitialModel";
import InitialObjectDetailField from "./InitialObjectDetailField";
import { useSelector } from "react-redux";

function InitialObjectDesktop() {
  const { select } = useSelector((state) => state.initialObjectSetData);
  return (
    <Box
      sx={{
        padding: "0px 100px",
        paddingTop: "15px",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          justifyContent: select ? "space-between" : "center",
          padding: "10px",
        }}
      >
        <SelectInitialModel />
        {select ? <InitialObjectDetailField /> : null}
      </Stack>
    </Box>
  );
}

export default InitialObjectDesktop;
