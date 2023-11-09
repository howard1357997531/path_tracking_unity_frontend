import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { brown } from "@mui/material/colors";

export const StyleBox = styled(Box)({
  position: "relative",
  height: "calc(100vh - 64px)",
});

export const StyleStepperBox = styled(Box)({
  position: "absolute",
  top: "calc(50% - 32px)",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
});

export const StyleStepperContentBox = styled(Box)({
  height: "50vh",
  backgroundColor: "#red",
});

export const StyleStepper1Typography = styled(Typography)({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: `${brown[500]}`,
});

export const StyleStepper1CameraSelectBox = styled(Box)({
  position: "absolute",
  top: "53%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const StyleStepper2Title = styled(Typography)({
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: `${brown[500]}`,
});

export const StyleStepper2CameraBox = styled(Box)({
  position: "absolute",
  top: "58%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // backgroundColor: "red",
  width: "60%",
  height: "70%",
  border: `2px solid ${brown[300]}`,
});

export const StyleStepper2SpinnerBox = styled(Box)({
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const StyleStepper2Typography = styled(Typography)({
  position: "absolute",
  top: "58%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: `${brown[500]}`,
});

export const StyleStepper3SpinnerBox = styled(Box)({
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const StyleStepper3Typography = styled(Typography)({
  position: "absolute",
  top: "63%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: `${brown[500]}`,
});
