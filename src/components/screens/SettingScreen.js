import React, { useEffect, useState } from "react";
import AlertList from "../nav/AlertList";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { domain } from "../../env";

function SettingScreen() {
  const [camera, setCamera] = useState(false);
  const [connect, setConnect] = useState(false);
  const [image, setImage] = useState(null);

  const open_camera = (e) => {
    setCamera(true);
    setConnect(true);
    axios
      .post(`${domain}/open_camera/`)
      .then((res) => {
        if (res.data.state !== "error") {
          setConnect(true);
          if (res.data.state === "ok") {
            console.log(res.data);
            setImage(res.data.image);
          }
        }
      })
      .catch((error) => {
        setConnect(false);
      });
  };

  const screenshot = () => {
    setConnect(true);
    axios
      .post(`${domain}/screen_shot/`)
      .then((res) => {
        if (res.data.state === "ok") {
          console.log(res.data);
          setImage(res.data.image);
        } else {
          setImage(null);
        }
      })
      .catch((error) => {
        setConnect(false);
      });
  };

  const [name, setName] = useState("");
  const savePly = () => {
    axios.post(`${domain}/save_ply/`).then((res) => {
      console.log(res.data);
      setName(res.data.obj_data.name);
    });
  };

  const preprocess = () => {
    try {
      axios.post(`${domain}/preprocessing_ply/`, { name }).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    axios.get(`${domain}/get_initial_object`).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <Button variant="contained" sx={{ margin: 2 }} onClick={open_camera}>
        啟動相機
      </Button>

      <Button variant="contained" sx={{ margin: 2 }} onClick={screenshot}>
        截圖
      </Button>

      <Button variant="contained" sx={{ margin: 2 }} onClick={savePly}>
        save ply
      </Button>

      <Box
        sx={{
          width: "600px",
          height: "400px",
          border: `1px solid #000`,
          display: camera ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!connect ? (
          "尚未連線"
        ) : image ? (
          <img
            src={`${domain}/${image}`}
            alt={`${domain}/${image}`}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          "相機拍照中"
        )}
      </Box>

      <Box mt={4}>
        <input
          style={{ color: "#000" }}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" onClick={preprocess}>
          送出
        </Button>
      </Box>
    </div>
  );
}

export default SettingScreen;
