import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  StyleBox,
  StyleCircularProgressBox,
  StyleStack,
  StyleIconBox,
  StylePushPinOutlinedIcon,
  StylePushPinRoundedIcon,
  SelectInitialBtn,
} from "../../../styles/RobotControlScreen/SelectModelTabsType.js";
import { brown, deepPurple, pink } from "@mui/material/colors";
import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import "./css/SelectModelTabsType.css";
import { domain } from "../../../env";
import {
  initialObjectAddPinAction,
  initialObjectRemovePinAction,
  initialObjectSelectModelAction,
} from "../../../redux/actions/InitialObjectScreenAction.js";

function SelectInitialModelTabsType({ title }) {
  const dispatch = useDispatch();
  const { loading, objects } = useSelector((state) => state.initialObject);

  const AddPinHandler = (id) => {
    dispatch(initialObjectAddPinAction(id));
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
          dispatch(initialObjectRemovePinAction(id));
        }
      });
    } else {
      dispatch(initialObjectRemovePinAction(id));
    }
  };

  const selectModelHandler = (id) => {
    const [data] = objects.filter((obj) => obj.id === id);
    dispatch(initialObjectSelectModelAction(data));
  };

  return (
    <StyleBox sx={{ height: "61vh" }} className="scroll">
      {loading ? (
        <StyleCircularProgressBox>
          <CircularProgress />
        </StyleCircularProgressBox>
      ) : title === "commonly used" ? (
        objects.map((object) =>
          object.is_pinned ? (
            <StyleStack direction="row" key={object.id}>
              <Box flex={1}>
                <Card>
                  <CardMedia
                    component={"img"}
                    image={`${domain}/${object.image_path}`}
                    sx={{
                      height: "11vh",
                    }}
                  />
                </Card>
              </Box>

              <Box flex={2} sx={{ marginLeft: "15px" }}>
                <Typography>{object.name}</Typography>
              </Box>

              <StyleIconBox flex={1}>
                <SelectInitialBtn onClick={() => selectModelHandler(object.id)}>
                  選擇
                </SelectInitialBtn>

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
          <StyleStack direction="row" key={object.id}>
            <Box flex={1}>
              <Card>
                <CardMedia
                  component={"img"}
                  image={`${domain}/${object.image_path}`}
                  sx={{
                    height: "11vh",
                  }}
                />
              </Card>
            </Box>

            <Box flex={2} sx={{ marginLeft: "15px" }}>
              <Typography sx={{ fontWeight: 600 }}>{object.name}</Typography>
            </Box>

            <StyleIconBox flex={1}>
              <SelectInitialBtn onClick={() => selectModelHandler(object.id)}>
                選擇
              </SelectInitialBtn>

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
    </StyleBox>
  );
}

export default SelectInitialModelTabsType;
