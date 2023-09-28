import { Box, Card, Typography } from "@mui/material";
import React from "react";
import Using3DModel from "./Using3DModel";
import ModelTabs from "./ModelTabs";
import { brown } from "@mui/material/colors";
import styled from "@emotion/styled";
import TextInput from "../tool/TextInput";

function SelectModelField() {
  const StyleCard = styled(Card)({
    width: "47%",
    height: "85vh",
    padding: "0px 30px",
    backgroundColor: `${brown[300]}`,
  });

  const StyleBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "85vh",
    padding: "2vh 0px",
  });

  const StyleUsingModelBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "20vh",
  });

  const StyleTabsBox = styled(Box)({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "60vh",
  });

  const StyleTextFieldBox = styled(Box)({
    postion: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8vh",
  });

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

          <ModelTabs />
        </StyleTabsBox>
      </StyleBox>
    </StyleCard>
  );
}

export default SelectModelField;
