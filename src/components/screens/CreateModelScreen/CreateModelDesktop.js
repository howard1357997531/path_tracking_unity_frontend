import {
  StyleBox,
  StyleStepperBox,
  StyleStepperContentBox,
  StyleStepper1Typography,
  StyleStepper1CameraSelectBox,
  StyleStepper2Title,
  StyleStepper2CameraBox,
  StyleStepper2SpinnerBox,
  StyleStepper2Typography,
  StyleStepper3SpinnerBox,
  StyleStepper3Typography,
} from "../../../styles/CreateModelScreen/CreateModelDesktop";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import { brown, deepPurple, grey, orange, teal } from "@mui/material/colors";
import Swal from "sweetalert2";
import Spinner2 from "../../../tool/Spinner2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { domain } from "../../../env";
import { useDispatch } from "react-redux";
import { INITIAL_OBJECT_SET_INITIAL_DATA } from "../../../redux/constants";
import "./css/CreateModelDesktop.css";

const steps = ["選擇相機", "掃描物件", "完成"];

export default function CreateModelDesktop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState(null);

  const screenshot = () => {
    setLoading(true);
    axios
      .post(`${domain}/screen_shot/`)
      .then((res) => {
        if (res.data.state === "ok") {
          setImage(res.data.image);
        } else {
          setImage(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleNext = (step) => {
    if (step === 1) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      axios
        .post(`${domain}/open_camera/`)
        .then((res) => {
          if (res.data.state !== "error") {
            setLoading(false);
            if (res.data.state === "ok") {
              setImage(res.data.image);
            }
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else if (step === 2) {
      // delete
      Swal.fire({
        title: "請輸入物件名稱",
        input: "text",
        background: grey[800],
        color: "#fff",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "送出",
        cancelButtonText: "返回",
        cancelButtonColor: grey[600],
        showLoaderOnConfirm: true,
        preConfirm: async (inputText) => {
          if (inputText === "") {
            return Swal.showValidationMessage(`請輸入名稱`);
          }
          try {
            const { data } = await axios.post(`${domain}/save_ply/`, {
              inputText,
            });

            dispatch({
              type: INITIAL_OBJECT_SET_INITIAL_DATA,
              payload: data.obj_data.id,
            });
          } catch (error) {
            Swal.showValidationMessage(`${error.response.data.error_msg}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          let newSkipped = skipped;
          if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
          }

          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        }
      });
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // select
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <StyleBox>
      <StyleStepperBox>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <Typography variant="h6">{label}</Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <StyleStepperContentBox>
              <Typography sx={{ mt: 2, mb: 1 }}>全部完成</Typography>
            </StyleStepperContentBox>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* content */}
            <StyleStepperContentBox>
              {activeStep + 1 === 1 && (
                <>
                  <StyleStepper1Typography variant="h4" className="aoxItem">
                    請選擇相機
                  </StyleStepper1Typography>

                  <StyleStepper1CameraSelectBox>
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <Select
                          value={age}
                          onChange={handleChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="">
                            <em>Kientic 相機</em>
                          </MenuItem>
                          <MenuItem value={10}>Mech_Mind 相機</MenuItem>
                          <MenuItem value={20}>Zed 相機</MenuItem>
                          <MenuItem value={30}>Zivid 相機</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </StyleStepper1CameraSelectBox>
                </>
              )}
              {activeStep + 1 === 2 && (
                <>
                  <StyleStepper2Title variant="h5">
                    請確認物體是否擺放正確
                  </StyleStepper2Title>

                  <Button
                    variant="outlined"
                    sx={{
                      position: "absolute",
                      right: 0,
                      bottom: "15%",
                      // width: "92px",
                      // height: "43px",
                      fontSize: "20px",
                      padding: "5px 15px",
                    }}
                    onClick={screenshot}
                  >
                    重拍
                  </Button>

                  <StyleStepper2CameraBox>
                    {loading ? (
                      <>
                        <StyleStepper2SpinnerBox>
                          <CircularProgress sx={{ color: `${brown[300]}` }} />
                        </StyleStepper2SpinnerBox>
                        <StyleStepper2Typography>
                          拍攝中
                        </StyleStepper2Typography>
                      </>
                    ) : (
                      <img
                        src={`${domain}/${image}`}
                        alt={`${domain}/${image}`}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </StyleStepper2CameraBox>
                </>
              )}
              {activeStep + 1 === 3 && (
                <>
                  <StyleStepper3SpinnerBox>
                    {/* <Spinner2 /> */}
                    掃描成功
                  </StyleStepper3SpinnerBox>
                  <StyleStepper3Typography variant="h6">
                    是否前往繪圖 ?
                    <Button
                      disableElevation
                      variant="contained"
                      sx={{ marginLeft: "15px" }}
                      onClick={() => navigate("/draw-object")}
                    >
                      前往繪圖
                    </Button>
                    <Button
                      disableElevation
                      variant="contained"
                      sx={{
                        marginLeft: "15px",
                        backgroundColor: brown[300],
                        "&:hover": {
                          backgroundColor: brown[400],
                        },
                      }}
                      onClick={() => navigate("/")}
                    >
                      返回首頁
                    </Button>
                  </StyleStepper3Typography>
                </>
              )}
            </StyleStepperContentBox>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                  display: activeStep === steps.length - 1 ? "none" : "initial",
                }}
              >
                <Typography variant="h6">返回</Typography>
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleSkip}
                  sx={{
                    mr: 1,
                    display: "none",
                  }}
                >
                  <Typography variant="h6">跳過</Typography>
                </Button>
              )}

              <Button
                variant="outlined"
                sx={{
                  display: activeStep === steps.length - 1 ? "none" : "initial",
                }}
                onClick={() => handleNext(activeStep + 1)}
              >
                {/* {activeStep === steps.length - 1 ? (
                  "完成"
                ) : (
                  <Typography variant="h6">下一步</Typography>
                )} */}

                {activeStep === 0 ? (
                  <Typography variant="h6">下一步</Typography>
                ) : (
                  <Typography variant="h6">掃描</Typography>
                )}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </StyleStepperBox>
    </StyleBox>
  );
}
