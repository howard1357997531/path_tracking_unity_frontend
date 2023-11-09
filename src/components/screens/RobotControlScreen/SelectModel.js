import React from "react";
import {
  StyleBox,
  StyleCard,
  StyleUsingModelBox,
  StyleTabsBox,
  StyleTextFieldBox,
} from "../../../styles/RobotControlScreen/SelectModel";

import { Typography } from "@mui/material";
import Using3DModel from "./Using3DModel";
import SelectModelTabs from "./SelectModelTabs";
import TextInput from "./TextInput";
import { brown } from "@mui/material/colors";

function SelectModel() {
  return (
    <StyleCard variant="outlined">
      <StyleBox>
        <StyleUsingModelBox>
          <Typography
            variant="h5"
            align="center"
            color={brown[800]}
            fontWeight={600}
          >
            模型選擇
          </Typography>
          <Using3DModel />
        </StyleUsingModelBox>

        <StyleTabsBox>
          <StyleTextFieldBox>
            <TextInput />
          </StyleTextFieldBox>

          <SelectModelTabs />
        </StyleTabsBox>
      </StyleBox>
    </StyleCard>
  );
}

export default SelectModel;
