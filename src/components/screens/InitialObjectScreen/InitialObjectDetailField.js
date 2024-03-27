import { Box, Card, CardMedia, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { blue, grey } from "@mui/material/colors";
import {
  StyleCard,
  StyleBox,
} from "../../../styles/RobotControlScreen/RobotField";
import { domain } from "../../../env";
import { useSelector } from "react-redux";
// import "./css/RobotField.css";

function InitialObjectDetailField() {
  const navigate = useNavigate();
  const { select } = useSelector((state) => state.initialObjectSetData);

  const DecsText = styled(Typography)({
    marginBottom: "2px",
    color: grey[900],
    fontSize: 18,
    fontWeight: 600,
  });

  const StyleButton = styled(Box)({
    position: "absolute",
    bottom: "2.5vh",
    right: 0,
    display: "flex",
    justifyContent: "center",
    algnItems: "center",
    padding: "10px 20px",
    color: blue[500],
    backgroundColor: grey[900],
    fontSize: 18,
    fontWeight: 600,
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(1)",
    },
  });

  const drawPointHandler = () => {
    navigate("/draw-object");
  };

  return (
    <StyleCard variant="outlined" sx={{ backgroundColor: blue[500] }}>
      <StyleBox sx={{ position: "relative", justifyContent: "left" }}>
        <Typography
          variant="h5"
          align="center"
          color={grey[900]}
          fontWeight={600}
        >
          詳細資訊
        </Typography>

        <Card sx={{ margin: "11px 0px" }}>
          <CardMedia
            component={"img"}
            image={`${domain}/${select.image_path}`}
          />
        </Card>

        <DecsText>名稱: {select.name}</DecsText>
        <DecsText>創建時間: {select.created_at}</DecsText>

        <StyleButton onClick={drawPointHandler}>去畫點</StyleButton>
      </StyleBox>
    </StyleCard>
  );
}

export default InitialObjectDetailField;
