import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { lightBlue, orange, teal, yellow } from "@mui/material/colors";

export const StyleCircularProgress = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) !important",
});

export const StyleBox1 = styled(Box)({
  width: "25%",
  padding: "10px",
});

export const StyleBox2 = styled(Box)({
  flexGrow: 1,
  marginLeft: "8px",
  color: yellow[300],
});

export const StyleBox3 = styled(Box)({
  position: "absolute",
  top: "50%",
  right: "12px",
  transform: "translateY(-50%)",
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  color: "#76ff03",
});

export const StyleTypography = styled(Typography)({
  color: yellow[500],
});

export const StyleDialogStack = styled(Stack)({
  width: "552px",
  height: "300px",
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const StyleDialogButton = styled(Button)({
  width: "30%",
  height: "40%",
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
  height: "40%",
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

export const StyleDialogButton3 = styled(Button)({
  width: "30%",
  height: "40%",
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
