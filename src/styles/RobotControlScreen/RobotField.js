import { Box, Button, Card, Stack, Typography, styled } from "@mui/material";
import { deepPurple, lightBlue, red, teal } from "@mui/material/colors";

export const StyleCard = styled(Card)({
  width: "47%",
  height: "85vh",
  padding: "0px 30px",
  backgroundColor: `${deepPurple[300]}`,
});

export const StyleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "85vh",
  padding: "2vh 0px",
  // backgroundColor: "green",
});

export const StyleControlRobotBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "25vh",
});

export const StyleStack = styled(Stack)({
  justifyContent: "space-around",
  alignItems: "center",
  height: "20vh",
  // backgroundColor: "#fff",
});

export const StyleButton = styled(Button)({
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

export const StyleButton2 = styled(Button)({
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

export const StyleButton3 = styled(Button)({
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

export const StyleStatusBox = styled(Box)({
  position: "relative",
  width: "100%",
  height: "8vh",
});

export const StyleStatusText1 = styled(Typography)({
  color: deepPurple[800],
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-100%, -100%)",
  paddingRight: "10px",
  fontWeight: "600",
});

export const StyleStatusText2Box = styled(Box)({
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(0, -100%)",
  display: "flex",
  alignItems: "flex-end",
  fontWeight: "600",
});

export const StyleDetailBox = styled(Box)({
  width: "100%",
  height: "46vh",
  border: `1px solid ${deepPurple[500]}`,
  overflowY: "auto",
});

export const StyleDetailSmallBox = styled(Box)({
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

export const StyleDetailTypography = styled(Typography)({
  fontSize: "26px",
  fontWeight: "bolder",
});
