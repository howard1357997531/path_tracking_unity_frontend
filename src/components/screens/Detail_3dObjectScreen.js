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
import Spinner from "../tool/Spinner";
import { brown } from "@mui/material/colors";
import { useSelector } from "react-redux";

function Detail_3dObjectScreen({ sendBoolMessage }) {
  const { detail } = useSelector((state) => state.objectSetData);
  const customURL = "http://127.0.0.1:8000/get_object_3d/";
  const name = "output";
  const [dataID, setDataID] = useState(detail.id);
  const [objUrl, setObjUrl] = useState(detail.objUrl);

  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    sendMessage,
    isLoaded,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "ShowScene/Build/ShowScene_0801.loader.js",
    dataUrl: "ShowScene/Build/ShowScene_0801.data",
    frameworkUrl: "ShowScene/Build/ShowScene_0801.framework.js",
    codeUrl: "ShowScene/Build/ShowScene_0801.wasm",
  });

  const [saveImage, setSaveImage] = useState("");
  const [isDownload, setIsDownload] = useState(false);

  const [isAbleID, setAbleID] = useState(false);
  const [isAbleURL, setAbleURL] = useState(false);
  const [isEnglish, setIsEnglish] = useState(1);

  const sentObj = async (objUrl) => {
    const response = await fetch(objUrl);
    const dataString = await response.text();
    const blob = new Blob([dataString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    sendMessage("Canvas", "LoadPly", url);
  };

  const handleDownload = useCallback((saveImage) => {
    setSaveImage(saveImage);
    setIsDownload(true);
  }, []);

  const handleID = useCallback(() => {
    setAbleID(true);
  }, []);

  const handleURL = useCallback(() => {
    console.log("act url");
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
      console.log("activate");
      idSelect();
      setAbleID(false);
    }
    if (isAbleURL) {
      urlSwitch();
      setAbleURL(false);
    }
  }, [isDownload, isAbleID, isAbleURL]);

  const idSelect = async () => {
    sendMessage("Model", "WhichID", dataID);
    await new Promise((resolve) => setTimeout(resolve, 100));
    sentObj(objUrl); //告訴 unity 重新載入模型和點(這段不能刪)
  };

  const urlSwitch = async () => {
    sendMessage("Model", "ChangeURL", customURL);
  };

  const languageSwitch = async () => {
    sendMessage("Translator", "Translate", isEnglish === 1 ? 0 : 1);
    isEnglish === 1 ? setIsEnglish(0) : setIsEnglish(1);
  };

  const FullClick = () => {
    requestFullscreen(true);
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

  const getObjUrl = (e) => {
    axios
      .get(`http://127.0.0.1:8000/Detail_3D_object/${e.target.value}/`)
      .then((res) => {
        console.log(parseInt("react id:", e.target.value));
        console.log("react obj_url:", res.data.obj_url);
        setDataID(parseInt(e.target.value));
        setObjUrl(res.data.obj_url);
        setAbleID(true);
        // setTimeout(() => {
        //   sentObj(res.data.obj_url);
        // }, 100);
      });
  };

  const getObjUrl2 = (e) => {
    axios
      .get(`http://127.0.0.1:8000/Detail_3D_object/${e.target.value}/`)
      .then((res) => {
        console.log("react id 2:", e.target.value);
        console.log("react obj_url 2:", res.data.obj_url);
        setDataID(parseInt(e.target.value));
        setObjUrl(res.data.obj_url);
        setAbleID(true);
        // setTimeout(() => {
        //   sentObj(res.data.obj_url);
        // }, 100);
      });
  };

  const getObjUrl3 = (e) => {
    axios
      .get(`http://127.0.0.1:8000/Detail_3D_object/${e.target.value}/`)
      .then((res) => {
        console.log("react id 3:", e.target.value);
        console.log("react obj_url 3:", res.data.obj_url);
        setDataID(parseInt(e.target.value));
        setObjUrl(res.data.obj_url);
        setAbleID(true);
        // setTimeout(() => {
        //   sentObj(res.data.obj_url);
        // }, 100);
      });
  };

  // 還要傳檔案位置 blob
  const [isload, setIsLoad] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsLoad(true);
    }
  }, [isLoaded, setIsLoad]);

  useEffect(() => {
    if (sendBoolMessage) {
      sendMessage("Model", "CloseUnityApp");
    }
  }, [sendBoolMessage, sendMessage]);

  const StyleTypography = styled(Typography)({
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: isload ? 0 : 1,
  });

  const StyleSpinnerBox = styled(Box)({
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: isload ? 0 : 1,
  });

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
              opacity: isload ? 1 : 0,
            }}
            unityProvider={unityProvider}
            tabIndex={1}
          />
        </Box>
      </Stack>
      <Button variant="outline" onClick={getObjUrl} value="13">
        物件1
      </Button>
      <Button variant="outline" onClick={getObjUrl2} value="14">
        物件2
      </Button>
      <Button variant="outline" onClick={getObjUrl3} value="15">
        物件3
      </Button>
      <Button variant="outline" onClick={FullClick}>
        放大
      </Button>
      <Button variant="outline" onClick={languageSwitch}>
        切換語言
      </Button>
    </Container>
  );
}

export default Detail_3dObjectScreen;
