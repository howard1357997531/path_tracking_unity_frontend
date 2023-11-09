import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DrawerHeader } from "./components/nav/DrawerHeader";
import MiniDrawer from "./components/nav/MiniDrawer";

import { useState } from "react";
import CreateModelScreen from "./screens/CreateModelScreen";
import HomeScreen from "./screens/HomeScreen";
import RobotControlScreen from "./screens/RobotControlScreen";
import DrawScreen from "./screens/DrawScreen";
import FixScreen from "./screens/FixScreen";
import ShowScreen from "./screens/ShowScreen";
import SettingScreen from "./components/screens/SettingScreen";

function App() {
  const [sendMessage, setSendMessage] = useState(false);
  const onSendMessageToUnity = (msg) => {
    setSendMessage(msg);
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer onSendMessageToUnity={onSendMessageToUnity} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />

          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/create-model" element={<CreateModelScreen />} />
            <Route path="/robot-control" element={<RobotControlScreen />} />
            <Route
              path="/draw-object"
              element={<DrawScreen sendBoolMessage={sendMessage} />}
            />
            <Route
              path="/fix-object"
              element={<FixScreen sendBoolMessage={sendMessage} />}
            />
            <Route
              path="/show-object"
              element={<ShowScreen sendBoolMessage={sendMessage} />}
            />
            <Route path="/setting" element={<SettingScreen />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
