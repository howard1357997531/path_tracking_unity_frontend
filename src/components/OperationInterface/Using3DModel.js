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
import { brown, lightBlue, orange, teal, yellow } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  objectDeatil,
  objectRemoveSelectModel,
} from "../../actions/objectActions";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Using3DModel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, objects } = useSelector((state) => state.objectDetail);
  // const [objectDetail, setObjectDetail] = useState(objects);
  const [selectObject, setSelectObject] = useState({});
  const [hasSelectObject, setHasSelectObject] = useState(false);

  // Dialog
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState("");

  useEffect(() => {
    dispatch(objectDeatil());
  }, [dispatch]);

  useEffect(() => {
    const hasSelect = objects.filter((item) => {
      return item.is_selected === true;
    });
    setSelectObject(hasSelect[0]);
    setHasSelectObject(hasSelect.length === 0 ? false : true);
  }, [objects]);

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
    dispatch(objectRemoveSelectModel(dialogId));
    setOpen(false);
  };

  const detailModelHandler = () => {
    navigate("/detail-3dObject");
  };

  const modifyModelHandler = () => {
    navigate("/modify-3dObject");
  };

  //vh
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

  const StyleCircularProgress = styled(CircularProgress)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) !important",
  });

  const StyleBox1 = styled(Box)({
    width: "25%",
    padding: "10px",
  });

  const StyleBox2 = styled(Box)({
    flexGrow: 1,
    paddingLeft: "5%",
  });

  const StyleBox3 = styled(Box)({
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    width: "30%",
  });

  const StyleTypography = styled(Typography)({
    color: yellow[500],
  });

  const StyleDialogStack = styled(Stack)({
    width: "552px",
    height: "300px",
    justifyContent: "space-evenly",
    alignItems: "center",
  });

  const StyleDialogButton = styled(Button)({
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

  const StyleDialogButton2 = styled(Button)({
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

  const StyleDialogButton3 = styled(Button)({
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
              <Typography variant="h6">{selectObject.name}</Typography>
            </StyleBox2>
            <StyleBox3
              sx={{
                paddingRight: "10px",
                color: "#76ff03",
              }}
            >
              <CheckBoxOutlinedIcon
                sx={{ marginRight: "1px", fontSize: "24px" }}
              />
              <Typography variant="h6">目前使用</Typography>
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
