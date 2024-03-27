import React, { useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import {
  StyleBox1,
  StyleBox2,
  StyleBox3,
  StyleCircularProgress,
  StyleDialogButton,
  StyleDialogButton2,
  StyleDialogButton3,
  StyleDialogStack,
  StyleTypography,
} from "../../../styles/RobotControlScreen/Using3DModel.js";
import {
  Box,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  objectDeatilAction,
  objectRemoveSelectModelAction,
} from "../../../redux/actions/RobotControlScreenAction.js";
import { brown } from "@mui/material/colors";
import { OBJECT_SET_SELECT_DATA } from "../../../redux/constants.js";

function Using3DModel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, objects } = useSelector((state) => state.objectDetail);
  const { select } = useSelector((state) => state.objectSetData);

  const [selectObject, setSelectObject] = useState({});
  const [hasSelectObject, setHasSelectObject] = useState(false);

  const StyleStack = styled(Stack)({
    position: "relative",
    justifyContent: !hasSelectObject ? "center" : "none",
    alignItems: "center",
    border: hasSelectObject
      ? `1px solid ${yellow[300]}`
      : `2px dashed ${yellow[300]}`,
    backgroundColor: hasSelectObject ? `${brown[500]}` : `transition`,
    color: `${yellow[300]}`,
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

  // Dialog
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState("");

  useEffect(() => {
    dispatch(objectDeatilAction());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (select) {
        const hasSelect = objects.filter((item) => {
          return item.id === select;
        });
        setSelectObject(hasSelect[0]);
        setHasSelectObject(true);
      } else {
        setHasSelectObject(false);
      }
    }
  }, [loading, objects]);

  // Dialog
  const selectObjectHandler = () => {
    if (selectObject === undefined) {
      Swal.fire({
        title: "請選擇模型",
        icon: "warning",
        background: `${brown[300]}`,
      });
    } else {
      if (selectObject.length !== 0) {
        setDialogId(selectObject.id);
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeSlectModelHandler = () => {
    dispatch(objectRemoveSelectModelAction(dialogId));
    setOpen(false);
  };

  const detailModelHandler = () => {
    navigate("/show-object");
  };

  const modifyModelHandler = () => {
    navigate("/fix-object");
  };
  return (
    <>
      <StyleStack direction={"row"} onClick={selectObjectHandler}>
        {loading ? (
          <StyleCircularProgress />
        ) : hasSelectObject ? (
          <>
            <StyleBox1>
              <Card>
                <CardMedia
                  component={"img"}
                  image={`data:image/png;base64, ${selectObject.image}`}
                  sx={{
                    height: "11vh",
                  }}
                />
              </Card>
            </StyleBox1>
            <StyleBox2>
              <DecsText>{selectObject.name}</DecsText>
            </StyleBox2>
            <StyleBox3>
              <CheckBoxOutlinedIcon
                sx={{ marginRight: "1px", fontSize: "24px" }}
              />
              <DecsText>目前使用</DecsText>
            </StyleBox3>
          </>
        ) : (
          <StyleTypography variant="body1">尚未選擇模型</StyleTypography>
        )}
      </StyleStack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ backgroundColor: `${brown[300]}` }}>
          <StyleDialogStack direction="row" columnGap={3}>
            <StyleDialogButton
              variant="contained"
              onClick={removeSlectModelHandler}
            >
              移除選擇
            </StyleDialogButton>

            <StyleDialogButton2
              variant="contained"
              onClick={detailModelHandler}
            >
              詳細資料
            </StyleDialogButton2>

            <StyleDialogButton3
              variant="contained"
              onClick={modifyModelHandler}
            >
              修改模型
            </StyleDialogButton3>
          </StyleDialogStack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Using3DModel;
