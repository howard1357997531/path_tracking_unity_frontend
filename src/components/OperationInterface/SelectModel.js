import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  brown,
  deepPurple,
  lightBlue,
  orange,
  pink,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import React, { useState } from "react";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  objectAddPin,
  objectRemovePin,
  objectSelectModel,
  objectSetDetailData,
  objectSetModifyData,
} from "../../actions/objectActions";
import { domain } from "../../env";

function SelectModel({ title }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, objects } = useSelector((state) => state.objectDetail);
  const [dialogId, setDialogId] = useState("");

  // vh
  const StyleBox = styled(Box)({
    height: "46vh",
    overflowY: "auto",
    border: `1px solid ${brown[500]}`,
  });

  const StyleCircularProgressBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(46vh - 2px)",
  });

  const StyleStack = styled(Stack)({
    height: "13vh",
    borderBottom: `1px solid ${brown[500]}`,
    alignItems: "center",
    padding: "10px",
    "&:hover": {
      backgroundColor: "rgba(188, 160, 150, 0.545)",
    },
  });

  const StyleIconBox = styled(Box)({
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    paddingRight: "1%",
  });

  const StyleSettingsApplicationsOutlinedIcon = styled(
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

  const StylePushPinOutlinedIcon = styled(PushPinOutlinedIcon)({
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

  const StylePushPinRoundedIcon = styled(PushPinRoundedIcon)({
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

  const StyleDialogStack = styled(Stack)({
    width: "552px",
    height: "150px",
    justifyContent: "space-evenly",
    alignItems: "center",
  });

  const StyleDialogButton = styled(Button)({
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

  const StyleDialogButton2 = styled(Button)({
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

  const StyleDialogButton3 = styled(Button)({
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

  const StyleDialogButton4 = styled(Button)({
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

  const AddPinHandler = (id) => {
    dispatch(objectAddPin(id));
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
          dispatch(objectRemovePin(id));
        }
      });
    } else {
      dispatch(objectRemovePin(id));
    }
  };

  const selectModelHandler = () => {
    dispatch(objectSelectModel(dialogId));
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
    dispatch(objectSetModifyData(id, url));
    localStorage.setItem("route", "/modify-3dObject");
    navigate("/modify-3dObject");
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

    dispatch(objectSetDetailData(id, url));
    localStorage.setItem("route", "/detail-3dObject");
    navigate("/detail-3dObject");
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

export default SelectModel;
