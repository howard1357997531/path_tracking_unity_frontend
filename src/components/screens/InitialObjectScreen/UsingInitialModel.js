import React from "react";
import { blue, grey, yellow } from "@mui/material/colors";
import {
  StyleBox1,
  StyleBox2,
  StyleBox3,
  StyleTypography,
} from "../../../styles/RobotControlScreen/Using3DModel.js";
import { Box, Card, CardMedia, Stack, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { brown } from "@mui/material/colors";
import { domain } from "../../../env.js";
import Swal from "sweetalert2";

function UsingInitialModel() {
  const { select } = useSelector((state) => state.initialObjectSetData);

  const StyleStack = styled(Stack)({
    position: "relative",
    justifyContent: !select ? "center" : "none",
    alignItems: "center",
    border: select ? `1px solid ${yellow[300]}` : `2px dashed ${yellow[300]}`,
    backgroundColor: select ? `${brown[500]}` : `transition`,
    color: grey[900],
    width: "100%",
    height: "14vh",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.03)",
      transition: "all 0.2s ease-in-out",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  });

  const DecsText = styled(Box)({
    paddingTop: "2px",
    fontSize: 18,
    fontWeight: 600,
  });

  const checkModel = () => {
    if (!select) {
      Swal.fire({
        icon: "warning",
        title: "尚未選擇模型",
        width: 300,
        background: `${brown[300]}`,
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
  };

  return (
    <>
      <StyleStack direction={"row"} onClick={checkModel}>
        {select ? (
          <>
            <StyleBox1>
              <Card>
                <CardMedia
                  component={"img"}
                  image={`${domain}/${select.image_path}`}
                  sx={{
                    height: "11vh",
                  }}
                />
              </Card>
            </StyleBox1>
            <StyleBox2>
              <DecsText>{select.name}</DecsText>
            </StyleBox2>
            <StyleBox3>
              <CheckBoxOutlinedIcon
                sx={{ marginRight: "1px", fontSize: "24px" }}
              />
              <DecsText>已選擇</DecsText>
            </StyleBox3>
          </>
        ) : (
          <StyleTypography variant="body1">尚未選擇模型</StyleTypography>
        )}
      </StyleStack>
    </>
  );
}

export default UsingInitialModel;
