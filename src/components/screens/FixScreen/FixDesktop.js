import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../tool/Spinner";
import { brown } from "@mui/material/colors";
import { domain } from "../../../env";
import { NAV_inUnityPage, NAV_leaveUnityPage } from "../../../redux/constants";

function FixDesktop() {
  const { modify } = useSelector((state) => state.objectSetData);

  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    sendMessage,
    isLoaded,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "FixScene/Build/FixScene_0801.loader.js",
    dataUrl: "FixScene/Build/FixScene_0801.data",
    frameworkUrl: "FixScene/Build/FixScene_0801.framework.js",
    codeUrl: "FixScene/Build/FixScene_0801.wasm",
  });

  const [saveImage, setSaveImage] = useState("");
  const [isDownload, setIsDownload] = useState(false);
  const name = "output";
  const customURL = `${domain}/Detail_3D_object/`;
  // const customURL = `${domain}/get_single_draw_object/`;
  const [isAbleID, setAbleID] = useState(false);
  const [isAbleURL, setAbleURL] = useState(false);
  const [isEnglish, setIsEnglish] = useState(1);

  const sentObj = async (objUrl) => {
    const response = await fetch(objUrl);
    const dataString = await response.text();
    const blob = new Blob([dataString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    sendMessage("Canvas_Import", "LoadPly", url);
  };

  const objDownload = async (objPath) => {
    try {
      const response = await axios.get(objPath, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "model.ply";

      //link.click();

      await new Promise((resolve) => setTimeout(resolve, 100));
      sendMessage("Canvas_Import", "LoadPly", url);
      await new Promise((resolve) => setTimeout(resolve, 100));
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PLY file:", error);
    }
  };

  const handleDownload = useCallback((saveImage) => {
    setSaveImage(saveImage);
    setIsDownload(true);
  }, []);

  const handleID = useCallback(() => {
    setAbleID(true);
  }, []);

  const handleURL = useCallback(() => {
    setAbleURL(true);
  }, []);

  useEffect(() => {
    addEventListener("DownloadPicture", handleDownload);
    return () => {
      removeEventListener("DownloadPicture", handleDownload);
    };
  }, [addEventListener, removeEventListener, handleDownload]);

  useEffect(() => {
    addEventListener("AbleGetData", handleID);
    return () => {
      removeEventListener("AbleGetData", handleID);
    };
  }, [addEventListener, removeEventListener, handleID]);

  useEffect(() => {
    addEventListener("AbleGetURL", handleURL);
    return () => {
      removeEventListener("AbleGetURL", handleURL);
    };
  }, [addEventListener, removeEventListener, handleURL]);

  useEffect(() => {
    if (isDownload) {
      downloadImage();
      setIsDownload(false);
    }
    if (isAbleID) {
      idSelect();
      setAbleID(false);
    }
    if (isAbleURL) {
      urlSwitch();
      setAbleURL(false);
    }
  }, [isDownload, isAbleID, isAbleURL]);

  const [objPath, setObjPath] = useState("./1_1.ply");

  const idSelect = async () => {
    console.log(modify.id, modify.objUrl);
    sendMessage("Model", "WhichID", modify.id);
    await new Promise((resolve) => setTimeout(resolve, 100));
    objDownload(modify.objUrl); //告訴 unity 重新載入模型和點(這段不能刪)
  };

  const urlSwitch = async () => {
    sendMessage("Model", "ChangeURL", customURL);
  };

  const downloadImage = () => {
    const byteCharacters = atob(saveImage);
    const byteArrays = [...byteCharacters].map((char) => char.charCodeAt(0));
    const blob = new Blob([new Uint8Array(byteArrays)], { type: "image/png" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = name;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  //<Button variant="outline" onClick={getObjUrl} value="13">物件1</Button>

  // const getObjUrl = (e) => {
  //   axios.get(`${domain}/Detail_3D_object/${e.target.value}/`).then((res) => {
  //     console.log("getObjUrl: ", e.target.value);
  //     console.log("getObjUrl: ", res.data.obj_url);
  //     setDataID(parseInt(e.target.value));
  //     setAbleID(true);
  //     setTimeout(() => {
  //       sentObj(res.data.obj_url);
  //     }, 100);
  //   });
  // };

  // 還要傳檔案位置 blob
  const [isload, setIsLoad] = useState(false);

  // 當 unity 完全載入時設地為true
  useEffect(() => {
    if (isLoaded) {
      setIsLoad(true);
    }
  }, [isLoaded, setIsLoad]);

  const { inUnityPage } = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  useEffect(() => {
    if (inUnityPage) {
      sendMessage("Model", "CloseUnityApp");

      dispatch({
        type: NAV_inUnityPage,
        payload: false,
      });

      dispatch({
        type: NAV_leaveUnityPage,
        payload: true,
      });
    }
  }, [inUnityPage, sendMessage]);

  // useEffect(() => {
  //   if (sendBoolMessage) {
  //     sendMessage("Model", "CloseUnityApp");
  //   }
  // }, [sendBoolMessage, sendMessage]);

  // 以上為 unity 串接部分
  // 請看以下-----------------------------
  const StyleSpinnerBox = styled(Box)({
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: isload ? 0 : 1, //使用opacity去切換loading畫面
    display: isload ? "none" : "block",
  });

  const StyleTypography = styled(Typography)({
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: isload ? 0 : 1,
  });

  // 切換語言
  const languageSwitch = async () => {
    sendMessage("Translator", "Translate", isEnglish === 1 ? 0 : 1);
    isEnglish === 1 ? setIsEnglish(0) : setIsEnglish(1);
  };

  // 全螢幕
  const FullClick = () => {
    requestFullscreen(true);
  };

  return (
    <Container sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="center">
        <Box
          sx={{
            width: "960px",
            height: "600px",
            position: "relative",
            backgroundColor: brown[500],
            borderRadius: "30px",
            outline: `6px solid ${brown[700]}`,
          }}
        >
          <StyleSpinnerBox>
            <Spinner />
          </StyleSpinnerBox>
          <StyleTypography>載入中</StyleTypography>
          <Unity
            style={{
              width: "960px",
              height: "600px",
              borderRadius: "30px",
              opacity: isload ? 1 : 0, //使用opacity去切換unity畫面
            }}
            unityProvider={unityProvider}
            tabIndex={1}
          />
        </Box>
      </Stack>
      <Button variant="contained" onClick={FullClick}>
        放大
      </Button>
      <Button variant="contained" onClick={languageSwitch} sx={{ margin: 2 }}>
        切換語言
      </Button>
    </Container>
  );
}

export default FixDesktop;
