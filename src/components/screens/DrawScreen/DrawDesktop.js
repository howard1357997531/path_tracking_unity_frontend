import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Unity, useUnityContext } from "react-unity-webgl";
import Spinner from "../../../tool/Spinner";
import { brown } from "@mui/material/colors";
import { domain } from "../../../env";
import "./css/DrawDesktop.css";
import { useDispatch, useSelector } from "react-redux";
import { NAV_inUnityPage, NAV_leaveUnityPage } from "../../../redux/constants";

function DrawDesktop() {
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "Build/DrawScene_0801.loader.js",
    dataUrl: "Build/DrawScene_0801.data",
    frameworkUrl: "Build/DrawScene_0801.framework.js",
    codeUrl: "Build/DrawScene_0801.wasm",
  });
  const customURL = `${domain}/get_object_3d/`;

  // 上傳成功時 isUplaod = true
  const [isUpload, setIsUpload] = useState(false);
  const [isParseByte, setIsParseByte] = useState(false);
  const [plyByte, setPlyByte] = useState(new Uint8Array());
  const [isEnglish, setIsEnglish] = useState(1);
  // const [objPath, setObjPath] = useState();
  const [isload, setIsLoad] = useState(false);
  const [isAbleURL, setAbleURL] = useState(false);
  const objPath = "../../backend/bun_zipper.obj";

  const urlSwitch = async () => {
    sendMessage("Model", "ChangeURL", customURL);
  };

  const handleURL = useCallback(() => {
    setAbleURL(true);
  }, []);

  // 這段是使用上傳 ply 會觸發的
  const handleModel = useCallback(() => {}, []);

  // 上傳 ply用
  const handleByteConvert = useCallback((byteArray) => {
    console.log(typeof byteArray);
    console.log("byte!");
    setPlyByte(byteArray);
    setIsParseByte(true);
  }, []);

  // 無用到
  const handleNews = useCallback(() => {
    console.log("Upload / Update data from Unity successfully!");
    setIsUpload(true);
  }, []);

  // 偵測 unity 調用 react function 的行為
  // 一進來偵測 啟動 unity 那邊的function(SendPlyData)
  // 在 unity 版上按 import 會觸發此 useEffect
  useEffect(() => {
    addEventListener("AbleGetURL", handleURL);
    return () => {
      removeEventListener("AbleGetURL", handleURL);
    };
  }, [addEventListener, removeEventListener, handleURL]);

  useEffect(() => {
    addEventListener("AbleGetModel", handleModel);
    return () => {
      removeEventListener("AbleGetModel", handleModel);
    };
  }, [addEventListener, removeEventListener, handleModel]);

  useEffect(() => {
    addEventListener("DownLoadPLY", handleByteConvert);
    return () => {
      removeEventListener("DownLoadPLY", handleByteConvert);
    };
  }, [addEventListener, removeEventListener, handleByteConvert]);

  useEffect(() => {
    addEventListener("IsUploadData", handleNews);
    return () => {
      removeEventListener("IsUploadData", handleNews);
    };
  }, [addEventListener, removeEventListener, handleNews]);

  useEffect(() => {
    if (isLoaded) {
      setIsLoad(true);
    }
    if (isAbleURL) {
      urlSwitch();
      setAbleURL(false);
    }
    if (isParseByte) {
      PLYLink(plyByte);
      setIsParseByte(false);
    }
  }, [isLoaded, isAbleURL, isParseByte]);

  // isParse=true 把剛剛接收到unity的ply string 轉成 ply檔案(賦予一個url給他)
  const PLYLink = (plyData) => {
    const blob = new Blob([plyData], { type: "model/ply" });
    const url = URL.createObjectURL(blob);
    console.log("blob: ", blob); //blob:  Blob {size: 15493097, type: 'model/ply'}
    console.log(url); // blob:http://localhost:3000/58ade1a1-c40a-4c60-aba2-ac82cde04811

    const formData = new FormData();
    formData.append("blob", blob);
    // axios.post("http://127.0.0.1:8000/SavePly/", formData).then((res) => {
    //   console.log(res.data);
    // });
    // const downloadLink = document.createElement("a");
    // downloadLink.href = URL.createObjectURL(blob);
    // downloadLink.download = "model.ply";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
  };

  const OBJLink = (objPath) => {
    //first call setIsConvert(true)、setObjPath(...) to link to this function;
    sendMessage("Canvas_Import", "LoadPly", objPath);
  };

  // 切換路由時(因為適用useNavigate，沒有reload)，要先把unity關掉(要把後端處理的東西全部關掉)
  // const recordCheck = async () => {
  //   sendMessage("Model", "CloseUnityApp");
  //   await new Promise((resolve) => setTimeout(resolve, 100));
  // };

  const sentObj = async (objUrl) => {
    const response = await fetch(objUrl);
    const dataString = await response.text();
    const blob = new Blob([dataString], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    // blob:http://localhost:3000/6424e6e8-0a55-48ac-bb9c-e770ff511bdf

    sendMessage("Canvas_Import", "LoadPly", url);
  };

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

  const theme = useTheme();

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
            [theme.breakpoints.between("sm", "md")]: {
              width: "800px",
              height: "500px",
            },
            "@media (max-width: 900px) and (min-width: 600px) and (max-height: 400px)":
              {
                width: "464px",
                height: "290px",
              },
          }}
        >
          <StyleSpinnerBox>
            <Spinner />
          </StyleSpinnerBox>
          <StyleTypography>載入中</StyleTypography>
          <Unity
            style={{
              width: "960px", //比例一定要 960*600(請等比例縮小放大)
              height: "600px",
              borderRadius: "30px",
              opacity: isload ? 1 : 0, //使用opacity去切換unity畫面
            }}
            unityProvider={unityProvider}
            tabIndex={1} // 一定要這段才能用 shift 或輸入名字
            className="unity"
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

export default DrawDesktop;
