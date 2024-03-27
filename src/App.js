import "./App.css";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DrawerHeader } from "./components/nav/DrawerHeader";
import MiniDrawer from "./components/nav/MiniDrawer";

import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import CreateModelScreen from "./screens/CreateModelScreen";
import InitialObjectScreen from "./screens/InitialObjectScreen";
import RobotControlScreen from "./screens/RobotControlScreen";
import DrawScreen from "./screens/DrawScreen";
import FixScreen from "./screens/FixScreen";
import ShowScreen from "./screens/ShowScreen";
import SettingScreen from "./components/screens/SettingScreen";
import NavMobile from "./components/nav/NavMobile";

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <BrowserRouter>
      {matches ? (
        <Box sx={{ display: "flex" }}>
          <MiniDrawer />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <DrawerHeader />

            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/create-model" element={<CreateModelScreen />} />
              <Route path="/initial-object" element={<InitialObjectScreen />} />
              <Route path="/robot-control" element={<RobotControlScreen />} />
              <Route path="/draw-object" element={<DrawScreen />} />
              <Route path="/fix-object" element={<FixScreen />} />
              <Route path="/show-object" element={<ShowScreen />} />
              <Route path="/setting" element={<SettingScreen />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        // <NavMobile />
        <Box sx={{ display: "flex" }}>
          <MiniDrawer />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <DrawerHeader />

            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/create-model" element={<CreateModelScreen />} />
              <Route path="/robot-control" element={<RobotControlScreen />} />
              <Route path="/draw-object" element={<DrawScreen />} />
              <Route path="/fix-object" element={<FixScreen />} />
              <Route path="/show-object" element={<ShowScreen />} />
              <Route path="/setting" element={<SettingScreen />} />
            </Routes>
          </Box>
        </Box>
      )}
    </BrowserRouter>
  );
}

export default App;
