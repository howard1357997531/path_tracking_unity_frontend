import { Box, Card, Typography, styled } from "@mui/material";
import { brown } from "@mui/material/colors";

export const StyleCard = styled(Card)({
  width: "47%",
  height: "85vh",
  padding: "0px 30px",
  backgroundColor: `${brown[300]}`,
});
export const StyleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "85vh",
  padding: "2vh 0px",
});
export const StyleUsingModelBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "20vh",
});
export const StyleTabsBox = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "space-between",
  width: "100%",
  // height: "60vh",
  flex: 1,
});
export const StyleTextFieldBox = styled(Box)({
  postion: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "8vh",
});
