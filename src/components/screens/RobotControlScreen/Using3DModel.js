import React, { useEffect, useState } from "react";
import {
  StyleBox1,
  StyleBox2,
  StyleBox3,
  StyleCircularProgress,
  StyleDialogButton,
  StyleDialogButton2,
  StyleDialogButton3,
  StyleDialogStack,
  StyleStack,
  StyleTypography,
} from "../../../styles/RobotControlScreen/Using3DModel.js";
import {
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  objectDeatilAction,
  objectRemoveSelectModelAction,
} from "../../../redux/actions/RobotControlScreenAction.js";

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
    dispatch(objectDeatilAction());
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
    dispatch(objectRemoveSelectModelAction(dialogId));
    setOpen(false);
  };

  const detailModelHandler = () => {
    navigate("/detail-3dObject");
  };

  const modifyModelHandler = () => {
    navigate("/modify-3dObject");
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
