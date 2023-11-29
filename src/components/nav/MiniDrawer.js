import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import NotificationsIcon from "@mui/icons-material/Notifications";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { brown, grey, yellow } from "@mui/material/colors";
import { Badge, Box, Tooltip } from "@mui/material";
import AlertList from "./AlertList";
import { useDispatch, useSelector } from "react-redux";
import { NAV_inUnityPage, NAV_leaveUnityPage } from "../../redux/constants";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { leaveUnityPage } = useSelector((state) => state.nav);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const route = (url) => {
    const currentPage = localStorage.getItem("route")
      ? localStorage.getItem("route")
      : "/";
    localStorage.setItem("route", url);

    // 離開有外嵌 unity 的頁面要 sendMessage("Model", "CloseUnityApp") 給C#,
    // 不然很容易會發生問題
    if (
      currentPage === "/draw-object" ||
      currentPage === "/fix-object" ||
      currentPage === "/show-object"
    ) {
      dispatch({
        type: NAV_inUnityPage,
        payload: true,
      });
    } else {
      navigate(url);
    }
  };

  React.useEffect(() => {
    if (leaveUnityPage) {
      dispatch({
        type: NAV_leaveUnityPage,
        payload: false,
      });

      navigate(localStorage.getItem("route"));
      window.location.reload();
    }
  }, [leaveUnityPage]);

  const drawerItem = [
    { name: "首頁", url: "/" },
    { name: "手臂控制台", url: "/robot-control" },
    { name: "3D模型畫點", url: "/draw-object" },
    { name: "3D模型修改", url: "/fix-object" },
    { name: "3D模型展示", url: "/show-object" },
    { name: "設定", url: "/setting" },
  ];

  const iconStyle = [
    <OtherHousesIcon />,
    <PrecisionManufacturingIcon />,
    <ModeEditOutlineTwoToneIcon />,
    <AutoFixHighIcon />,
    <HistoryIcon />,
    <SettingsIcon />,
  ];

  const StyleListItemButton = styled(ListItemButton)({
    "&:hover": {
      color: `${brown[500]}`,
      backgroundColor: `${brown[100]}`,
      "& .MuiListItemIcon-root": {
        color: `${brown[500]}`,
      },
    },
  });

  const StyleNavButtonGroup = styled(Box)({
    paddingRight: "1%",
  });

  const StyleNotificationsIcon = styled(NotificationsIcon)({
    color: `${yellow[300]}`,
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.2)",
    },
  });

  const [alert, setAlert] = React.useState(false);

  const alertHandler = () => {
    setAlert(!alert);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: `${grey[800]}` }}
      >
        <Toolbar sx={{ position: "relative" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            3D 路徑生成界面
          </Typography>

          <StyleNavButtonGroup>
            <Badge badgeContent={3} color="primary">
              <StyleNotificationsIcon onClick={alertHandler} />
            </Badge>
          </StyleNavButtonGroup>

          <AlertList alert={alert} />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ padding: "0px" }}>
          {drawerItem.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
              {open ? (
                <StyleListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      item.url === window.location.pathname
                        ? `${brown[300]}`
                        : "none",
                  }}
                  onClick={() => route(item.url)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {iconStyle[index]}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </StyleListItemButton>
              ) : (
                <Tooltip title={item.name} placement="right">
                  <StyleListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor:
                        item.url === window.location.pathname
                          ? `${brown[300]}`
                          : "none",
                    }}
                    onClick={() => route(item.url)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {iconStyle[index]}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </StyleListItemButton>
                </Tooltip>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

/*
<Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
*/
