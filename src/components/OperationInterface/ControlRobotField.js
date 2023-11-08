import { Box, Button, Card, Stack, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  blueGrey,
  brown,
  deepPurple,
  grey,
  lightBlue,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import "./style.css";
import Swal from "sweetalert2";

function ControlRobotField() {
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
  console.log(detailText);

  const StyleCard = styled(Card)({
    width: "47%",
    height: "85vh",
    padding: "0px 30px",
    backgroundColor: `${deepPurple[300]}`,
  });

  const StyleBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "85vh",
    padding: "2vh 0px",
    // backgroundColor: "green",
  });

  const StyleControlRobotBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "25vh",
  });

  const StyleStack = styled(Stack)({
    justifyContent: "space-around",
    alignItems: "center",
    height: "20vh",
    // backgroundColor: "#fff",
  });

  const StyleButton = styled(Button)({
    width: "10vh",
    height: "10vh",
    fontSize: "20px",
    backgroundColor: `${lightBlue[300]}`,
    "&:hover": {
      backgroundColor: `${lightBlue[200]}`,
      transform: "scale(1.1)",
      transition: "all 0.1s ease-in-out",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  });

  const StyleButton2 = styled(Button)({
    width: "18vh",
    height: "18vh",
    borderRadius: "50%",
    fontSize: "30px",
    backgroundColor: `${teal[300]}`,
    "&:hover": {
      backgroundColor: `${teal[200]}`,
      transform: "scale(1.1)",
      transition: "all 0.1s ease-in-out",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  });

  const StyleButton3 = styled(Button)({
    width: "18vh",
    height: "18vh",
    fontSize: "30px",
    backgroundColor: `${red[600]}`,
    "&:hover": {
      backgroundColor: `${red[500]}`,
      transform: "scale(1.1)",
      transition: "all 0.1s ease-in-out",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
    position: "relative",
    zIndex: 2,
  });

  const StyleStatusBox = styled(Box)({
    position: "relative",
    width: "100%",
    height: "8vh",
  });

  const StyleStatusText1 = styled(Typography)({
    color: deepPurple[800],
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translate(-100%, -100%)",
    paddingRight: "10px",
    fontWeight: "600",
  });

  const StyleStatusText2Box = styled(Box)({
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translate(0, -100%)",
    display: "flex",
    alignItems: "flex-end",
    fontWeight: "600",
  });

  const StyleInitialTypography = styled(Typography)({
    color: `${blueGrey[900]}`,
    fontSize: "20px",
    fontWeight: "bolder",
    width: initialStatus ? "100%" : "1%",
    order: initialStatus ? 1 : 3,
    opacity: initialStatus ? 1 : 0,
    // backgroundColor: "red",
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

  const StyleDetailBox = styled(Box)({
    width: "100%",
    height: "46vh",
    border: `1px solid ${deepPurple[500]}`,
    overflowY: "auto",
  });

  const StyleDetailSmallBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
    height: "7vh",
    borderBottom: `1px solid ${deepPurple[500]}`,
    "&:hover": {
      backgroundColor: deepPurple[400],
    },
  });

  const StyleDetailTypography = styled(Typography)({
    fontSize: "26px",
    fontWeight: "bolder",
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
    // axios.post("http://127.0.0.1:8000/test/").then((res) => {
    //   console.log(res);
    // });
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

export default ControlRobotField;
