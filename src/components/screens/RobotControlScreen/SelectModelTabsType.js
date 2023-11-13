import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import {
  StyleBox,
  StyleCircularProgressBox,
  StyleStack,
  StyleIconBox,
  StyleSettingsApplicationsOutlinedIcon,
  StylePushPinOutlinedIcon,
  StylePushPinRoundedIcon,
  StyleDialogStack,
  StyleDialogButton,
  StyleDialogButton2,
  StyleDialogButton3,
  StyleDialogButton4,
} from "../../../styles/RobotControlScreen/SelectModelTabsType.js";
import { brown, deepPurple, pink } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  objectAddPinAction,
  objectRemovePinAction,
  objectSelectModelAction,
  objectSetDetailDataAction,
  objectSetModifyDataAction,
} from "../../../redux/actions/RobotControlScreenAction.js";
import "./css/SelectModelTabsType.css";
import { domain } from "../../../env";

function SelectModelTabsType({ title }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, objects } = useSelector((state) => state.objectDetail);
  const [dialogId, setDialogId] = useState("");

  const AddPinHandler = (id) => {
    dispatch(objectAddPinAction(id));
  };

  const RemovePinHandler = (id) => {
    if (title === "commonly used") {
      Swal.fire({
        title: "取消釘選?",
        icon: "warning",
        showCancelButton: true,
        background: `${brown[300]}`,
        confirmButtonColor: `${deepPurple[400]}`,
        cancelButtonColor: `${pink[400]}`,
        confirmButtonText: "確定",
        cancelButtonText: "返回",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(objectRemovePinAction(id));
        }
      });
    } else {
      dispatch(objectRemovePinAction(id));
    }
  };

  const selectModelHandler = () => {
    dispatch(objectSelectModelAction(dialogId));
    setOpen(false);
  };

  const modifyModelHandler = (id, objUrl) => {
    let url = "";
    if (id === 23) {
      url = `${domain}/media/hat.ply`;
    } else if (id === 25) {
      url = `${domain}/media/tool.ply`;
    } else {
      url = `${domain}/media/gun.ply`;
    }
    dispatch(objectSetModifyDataAction(id, url));
    localStorage.setItem("route", "/modify-3dObject");
    navigate("/fix-object");
  };

  const detailModelHandler = (id, objUrl) => {
    let url = "";
    if (id === 23) {
      url = `${domain}/media/hat.ply`;
    } else if (id === 25) {
      url = `${domain}/media/tool.ply`;
    } else {
      url = `${domain}/media/gun.ply`;
    }

    dispatch(objectSetDetailDataAction(id, url));
    localStorage.setItem("route", "/detail-3dObject");
    navigate("/show-object");
  };

  const deleteModelHandler = () => {
    setOpen(false);
    Swal.fire({
      title: "確定刪除?",
      icon: "warning",
      showCancelButton: true,
      background: `${brown[300]}`,
      confirmButtonColor: `${deepPurple[400]}`,
      cancelButtonColor: `${pink[400]}`,
      confirmButtonText: "確定",
      cancelButtonText: "返回",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "已刪除",
          icon: "success",
          background: `${brown[300]}`,
          confirmButtonColor: `${deepPurple[300]}`,
          confirmButtonText: "確定",
        });
      } else {
        setOpen(true);
      }
    });
  };

  // Dialog
  const handleClickOpen = (id) => {
    setDialogId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <StyleBox className="scroll">
      {loading ? (
        <StyleCircularProgressBox>
          <CircularProgress />
        </StyleCircularProgressBox>
      ) : title === "commonly used" ? (
        objects.map((object) =>
          object.is_pinned ? (
            <StyleStack direction="row" columnGap={2} key={object.id}>
              <Box flex={1}>
                <Card>
                  <CardMedia
                    component={"img"}
                    image={`data:image/png;base64, ${object.image}`}
                    sx={{
                      height: "11vh",
                    }}
                  />
                </Card>
              </Box>

              <Box flex={2} sx={{ marginLeft: "10px" }}>
                <Typography>{object.name}</Typography>
              </Box>

              <StyleIconBox flex={1}>
                <StyleSettingsApplicationsOutlinedIcon
                  onClick={() => handleClickOpen(object.id)}
                />
                {object.is_pinned ? (
                  <StylePushPinRoundedIcon
                    onClick={() => RemovePinHandler(object.id)}
                  />
                ) : (
                  <StylePushPinOutlinedIcon
                    onClick={() => AddPinHandler(object.id)}
                  />
                )}
              </StyleIconBox>
            </StyleStack>
          ) : null
        )
      ) : (
        objects.map((object) => (
          <StyleStack direction="row" columnGap={2} key={object.id}>
            <Box flex={1}>
              <Card>
                <CardMedia
                  component={"img"}
                  image={`data:image/png;base64, ${object.image}`}
                  sx={{
                    height: "11vh",
                  }}
                />
              </Card>
            </Box>

            <Box flex={2} sx={{ marginLeft: "10px" }}>
              <Typography>{object.name}</Typography>
            </Box>

            <StyleIconBox flex={1}>
              <StyleSettingsApplicationsOutlinedIcon
                onClick={() => handleClickOpen(object.id)}
              />
              {object.is_pinned ? (
                <StylePushPinRoundedIcon
                  onClick={() => RemovePinHandler(object.id)}
                />
              ) : (
                <StylePushPinOutlinedIcon
                  onClick={() => AddPinHandler(object.id)}
                />
              )}
            </StyleIconBox>
          </StyleStack>
        ))
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ backgroundColor: `${brown[300]}` }}>
          <StyleDialogStack direction="row" columnGap={3}>
            <StyleDialogButton variant="contained" onClick={selectModelHandler}>
              使用模型
            </StyleDialogButton>

            <StyleDialogButton2
              variant="contained"
              onClick={() => modifyModelHandler(dialogId, "http123")}
            >
              修改模型
            </StyleDialogButton2>
          </StyleDialogStack>
          <StyleDialogStack direction="row" columnGap={3}>
            <StyleDialogButton3
              variant="contained"
              onClick={() => detailModelHandler(dialogId, "http123")}
            >
              詳細資料
            </StyleDialogButton3>

            <StyleDialogButton4
              variant="contained"
              onClick={deleteModelHandler}
            >
              刪除
            </StyleDialogButton4>
          </StyleDialogStack>
        </DialogContent>
      </Dialog>
    </StyleBox>
  );
}

export default SelectModelTabsType;
