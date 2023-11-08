import { Box, Button, Stack, styled } from "@mui/material";
import {
  brown,
  lightBlue,
  orange,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";

export const StyleBox = styled(Box)({
  height: "46vh",
  overflowY: "auto",
  border: `1px solid ${brown[500]}`,
});

export const StyleCircularProgressBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(46vh - 2px)",
});

export const StyleStack = styled(Stack)({
  height: "13vh",
  borderBottom: `1px solid ${brown[500]}`,
  alignItems: "center",
  padding: "10px",
  "&:hover": {
    backgroundColor: "rgba(188, 160, 150, 0.545)",
  },
});

export const StyleIconBox = styled(Box)({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  paddingRight: "1%",
});

export const StyleSettingsApplicationsOutlinedIcon = styled(
  SettingsApplicationsOutlinedIcon
)({
  marginRight: "10px",
  color: brown[500],
  fontSize: "40px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.2)",
    transition: "all 0.1s ease-in-out",
  },
  "&:active": {
    transform: "scale(0.9)",
  },
});

export const StylePushPinOutlinedIcon = styled(PushPinOutlinedIcon)({
  color: yellow[500],
  fontSize: "30px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.2)",
    transition: "all 0.1s ease-in-out",
  },
  "&:active": {
    transform: "scale(0.9)",
  },
});

export const StylePushPinRoundedIcon = styled(PushPinRoundedIcon)({
  color: yellow[500],
  fontSize: "30px",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.2)",
    transition: "all 0.1s ease-in-out",
  },
  "&:active": {
    transform: "scale(0.9)",
  },
});

export const StyleDialogStack = styled(Stack)({
  width: "552px",
  height: "150px",
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const StyleDialogButton = styled(Button)({
  width: "30%",
  height: "70%",
  fontSize: "26px",
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

export const StyleDialogButton2 = styled(Button)({
  width: "30%",
  height: "70%",
  fontSize: "26px",
  backgroundColor: `${orange[300]}`,
  "&:hover": {
    backgroundColor: `${orange[200]}`,
    transform: "scale(1.1)",
    transition: "all 0.1s ease-in-out",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});

export const StyleDialogButton3 = styled(Button)({
  width: "30%",
  height: "70%",
  fontSize: "26px",
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

export const StyleDialogButton4 = styled(Button)({
  width: "30%",
  height: "70%",
  fontSize: "26px",
  backgroundColor: `${red[600]}`,
  "&:hover": {
    backgroundColor: `${red[500]}`,
    transform: "scale(1.1)",
    transition: "all 0.1s ease-in-out",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});
