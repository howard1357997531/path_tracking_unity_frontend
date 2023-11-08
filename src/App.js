import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DrawerHeader } from "./components/nav/DrawerHeader";
import MiniDrawer from "./components/nav/Nav_plus_Sidebar";

import DrawPoint3dObjectScreen from "./components/screens/DrawPoint_3dObjectScreen";
import Modify3dObjectScreen from "./components/screens/Modify_3dObjectScreen";
import Detail3dObjectScreen from "./components/screens/Detail_3dObjectScreen";
import SettingScreen from "./components/screens/SettingScreen";
import { useState } from "react";
import OperationInterface from "./components/screens/OperationInterface";
import CreateModelScreen from "./components/screens/CreateModelScreen";
import HomeScreen from "./screen/HomeScreen";

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
            <Route
              path="/operation-Interface"
              element={<OperationInterface />}
            />
            <Route
              path="/draw-point-3dObject"
              element={
                <DrawPoint3dObjectScreen sendBoolMessage={sendMessage} />
              }
            />
            <Route
              path="/modify-3dObject"
              element={<Modify3dObjectScreen sendBoolMessage={sendMessage} />}
            />
            <Route
              path="/detail-3dObject"
              element={<Detail3dObjectScreen sendBoolMessage={sendMessage} />}
            />
            <Route path="/setting" element={<SettingScreen />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
