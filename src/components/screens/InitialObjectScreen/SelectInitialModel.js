import React, { useEffect } from "react";
import {
  StyleCard,
  StyleBox,
  StyleUsingModelBox,
  StyleTabsBox,
  StyleTextFieldBox,
} from "../../../styles/RobotControlScreen/SelectModel";
import { Typography } from "@mui/material";
import { brown } from "@mui/material/colors";
import SelectInitialModelTabs from "./SelectInitialModelTabs";
import UsingInitialModel from "./UsingInitialModel";
import TextInput from "../RobotControlScreen/TextInput";
import { useDispatch } from "react-redux";
import { initialObjectDeatilAction } from "../../../redux/actions/InitialObjectScreenAction";

function SelectInitialModel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialObjectDeatilAction());
  }, [dispatch]);
  return (
    <StyleCard variant="outlined">
      <StyleBox>
        {/* <StyleUsingModelBox>
          <Typography
            variant="h5"
            align="center"
            color={brown[800]}
            fontWeight={600}
          >
            初始模型選擇
          </Typography>
          <UsingInitialModel />
        </StyleUsingModelBox> */}

        <Typography
          variant="h5"
          align="center"
          color={brown[800]}
          fontWeight={600}
        >
          初始模型選擇
        </Typography>

        <StyleTabsBox>
          <StyleTextFieldBox>
            <TextInput />
          </StyleTextFieldBox>

          <SelectInitialModelTabs />
        </StyleTabsBox>
      </StyleBox>
    </StyleCard>
  );
}

export default SelectInitialModel;
