import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Typography, styled } from "@mui/material";
import { brown } from "@mui/material/colors";

function AlertList({ alert }) {
  const StyleBox = styled(Box)({
    display: alert ? "initial" : "none",
    width: "100%",
    maxWidth: "250px",
    backgroundColor: `${brown[100]}`,
    position: "absolute",
    top: "90%",
    right: "24px",
  });

  const StyleList = styled(List)({
    padding: "0px",
  });

  const StyleTitleListItem = styled(ListItem)({
    justifyContent: "center",
    backgroundColor: `${brown[400]}`,
  });

  const StyleContentListItem = styled(ListItem)({
    justifyContent: "left",
    padding: "15px",
    "&:hover": {
      backgroundColor: `${brown[300]}`,
    },
  });

  return (
    <StyleBox>
      <nav aria-label="main mailbox folders">
        <StyleList>
          <StyleTitleListItem>
            <Typography variant="2">通知</Typography>
          </StyleTitleListItem>
          <Divider sx={{ backgroundColor: `${brown[700]}` }} />
          <StyleContentListItem>
            <Typography variant="2">通知</Typography>
          </StyleContentListItem>
          <StyleContentListItem>
            <Typography variant="2">通知</Typography>
          </StyleContentListItem>
        </StyleList>
      </nav>
    </StyleBox>
  );
}

export default AlertList;
