import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  blueGrey,
  brown,
  deepPurple,
  grey,
  red,
  yellow,
} from "@mui/material/colors";
import Swal from "sweetalert2";
import "./css/RobotField.css";
import {
  StyleCard,
  StyleBox,
  StyleControlRobotBox,
  StyleStack,
  StyleButton2,
  StyleButton3,
  StyleStatusBox,
  StyleStatusText1,
  StyleStatusText2Box,
  StyleDetailBox,
  StyleDetailSmallBox,
  StyleDetailTypography,
} from "../../../styles/RobotControlScreen/RobotField";
import { domain } from "../../../env";
import axios from "axios";

function RobotField() {
  const navigate = useNavigate();
  const date = new Date();
  const dateDetail = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const [initialStatus, setInitialStatus] = useState(true);
  const [activateBtn, setActivateBtn] = useState(false);
  const [stopBtn, setStopBtn] = useState(false);
  const [detailText, setDetailText] = useState([
    {
      mode: "initial",
      time: dateDetail,
    },
  ]);

  const StyleInitialTypography = styled(Typography)({
    color: `${blueGrey[900]}`,
    fontSize: "20px",
    fontWeight: "bolder",
    width: initialStatus ? "100%" : "1%",
    order: initialStatus ? 1 : 3,
    opacity: initialStatus ? 1 : 0,
  });

  const StyleActivateTypography = styled(Typography)({
    color: `${yellow[300]}`,
    fontSize: "20px",
    fontWeight: "bolder",
    width: activateBtn ? "100%" : "1%",
    order: activateBtn ? 1 : 3,
    opacity: activateBtn ? 1 : 0,
  });

  const StyleStopTypography = styled(Typography)({
    color: `${red[900]}`,
    fontSize: "20px",
    fontWeight: "bolder",
    width: stopBtn ? "100%" : "1%",
    order: stopBtn ? 1 : 3,
    opacity: stopBtn ? 1 : 0,
  });

  const createModelHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "建模中...",
      width: 300,
      background: `${brown[300]}`,
      showConfirmButton: false,
    }).then(() => {
      setTimeout(() => {
        navigate("/draw-point-3dObject");
        window.location.reload();
      }, 3000);
    });

    setTimeout(() => {
      navigate("/draw-point-3dObject");
      window.location.reload();
    }, 3000);
  };

  const activateRobotHandler = () => {
    setInitialStatus(false);
    setActivateBtn(true);
    setStopBtn(false);
    detailText.push({
      mode: "activate",
      time: dateDetail,
    });
    setDetailText(detailText);
    axios.post(`${domain}/execute_robot/`, { id: 36 }).then((res) => {
      console.log(res);
    });
  };

  const stopRobotHandler = () => {
    setInitialStatus(false);
    setActivateBtn(false);
    setStopBtn(true);
    detailText.push({
      mode: "stop",
      time: dateDetail,
    });
    setDetailText(detailText);
  };

  return (
    <StyleCard variant="outlined">
      <StyleBox>
        <StyleControlRobotBox>
          <Typography
            variant="h5"
            align="center"
            color={deepPurple[900]}
            fontWeight={600}
          >
            操作手臂
          </Typography>

          <StyleStack direction="row">
            <StyleButton2 variant="contained" onClick={activateRobotHandler}>
              啟動
            </StyleButton2>
            <StyleButton3 variant="contained" onClick={stopRobotHandler}>
              停止
            </StyleButton3>
          </StyleStack>
        </StyleControlRobotBox>

        <StyleStatusBox>
          <StyleStatusText1 variant="h6">目前狀態 :</StyleStatusText1>

          <StyleStatusText2Box>
            <StyleInitialTypography variant="h6">
              尚未啟動手臂
            </StyleInitialTypography>
            <StyleActivateTypography variant="h6">
              手臂操作中
            </StyleActivateTypography>
            <StyleStopTypography variant="h6">手臂已停止</StyleStopTypography>
          </StyleStatusText2Box>
        </StyleStatusBox>

        <StyleDetailBox className="controlRobotField-scroll">
          {detailText.map((text, index) => {
            if (text.mode === "initial") {
              return (
                <StyleDetailSmallBox key={index}>
                  <Box>
                    <StyleDetailTypography sx={{ color: `${grey[800]}` }}>
                      登入
                    </StyleDetailTypography>
                  </Box>
                  <Box>
                    <StyleDetailTypography sx={{ color: `${grey[800]}` }}>
                      {text.time}
                    </StyleDetailTypography>
                  </Box>
                </StyleDetailSmallBox>
              );
            } else if (text.mode === "activate") {
              return (
                <StyleDetailSmallBox key={index}>
                  <Box>
                    <StyleDetailTypography sx={{ color: `${yellow[300]}` }}>
                      啟動手臂中
                    </StyleDetailTypography>
                  </Box>
                  <Box>
                    <StyleDetailTypography sx={{ color: `${yellow[300]}` }}>
                      {text.time}
                    </StyleDetailTypography>
                  </Box>
                </StyleDetailSmallBox>
              );
            } else if (text.mode === "stop") {
              return (
                <StyleDetailSmallBox key={index}>
                  <Box>
                    <StyleDetailTypography sx={{ color: `${red[800]}` }}>
                      停止手臂
                    </StyleDetailTypography>
                  </Box>
                  <Box>
                    <StyleDetailTypography sx={{ color: `${red[800]}` }}>
                      {text.time}
                    </StyleDetailTypography>
                  </Box>
                </StyleDetailSmallBox>
              );
            } else {
              return null;
            }
          })}
        </StyleDetailBox>
      </StyleBox>
    </StyleCard>
  );
}

export default RobotField;
