import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import aos from "aos";
import "aos/dist/aos.css";
import "./css/Home.css";

function HomeScreen() {
  const navigate = useNavigate();
  const [firstButtonIsHovered, setFirstButtonIsHovered] = useState(false);
  const [secondButtonIsHovered, setsecondButtonIsHovered] = useState(false);

  const introduction = [
    "使用3D相機掃描物體，接著會開啟3D繪圖頁面給使用者做畫點、繪圖之功能",
    "之前已經掃描過物體，直接選擇3D物體然後啟動手臂",
  ];
  const StyleBox = styled(Box)({
    position: "relative",
    height: "calc(100vh - 64px)",
  });
  const StyleTypographyBox = styled(Box)({
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });
  const StyleTypography = styled(Typography)({});
  const StyleStack = styled(Stack)({
    position: "absolute",
    top: "calc(50% - 32px)",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "space-between",
    width: "40vw",
    padding: "20px",
  });
  const StyleButton = styled(Button)(({ theme }) => ({
    height: "10vw",
    width: "45%",
    fontSize: "26px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      color: "orange",
    },
    [theme.breakpoints.up("sm")]: {
      // width: "100px",
      color: "red",
    },
    [theme.breakpoints.up("md")]: {
      // width: "200px",
      color: "yellow",
    },
    [theme.breakpoints.up("lg")]: {
      // width: "300px",
      color: "green",
    },
    [theme.breakpoints.up("xl")]: {
      // width: "400px",
      color: "blue",
    },
    "&:hover": {
      // transform: "scale(1.1)",
      transition: "all 0.2s ease-in-out",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  }));
  const StyleIntroductionBox = styled(Box)({
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });
  const StyleIntroduction = styled(Typography)({});

  const [btnEffect, setBtnEffect] = useState(false);
  const btnClassName = `aoxItem ${btnEffect ? "btn-effect" : ""}`;
  useEffect(() => {
    if (!btnEffect) {
      document.querySelectorAll(".aoxItem").forEach((el) => {
        el.setAttribute("data-aos", "zoom-in");
      });
      setTimeout(() => {
        aos.init();
        // 初始化 AOS 并手动触发动画
        aos.refresh();
      }, 200);
      setTimeout(() => {
        document.querySelectorAll(".aoxItem").forEach((el) => {
          el.removeAttribute("data-aos");
        });
      }, 400);
    }
  }, [btnEffect]);

  const createModelHandler = () => {
    setBtnEffect(true);
    setTimeout(() => {
      setBtnEffect(false);
      navigate("/create-model");
    }, 1000);
    setTimeout(() => {}, 1200);
  };

  const existModelHandler = () => {
    navigate("/operation-Interface");
  };

  const handleMouseEnter = (btn) => {
    if (btn === "firstBtn") {
      setFirstButtonIsHovered(true);
    } else if (btn === "secondBtn") {
      setsecondButtonIsHovered(true);
    }
  };

  const handleMouseLeave = (btn) => {
    if (btn === "firstBtn") {
      setFirstButtonIsHovered(false);
    } else if (btn === "secondBtn") {
      setsecondButtonIsHovered(false);
    }
  };

  return (
    <StyleBox>
      <StyleTypographyBox>
        <StyleTypography variant="h4" className={btnClassName}>
          請選擇方式
        </StyleTypography>
      </StyleTypographyBox>

      <StyleStack direction="row">
        <StyleButton
          variant="outlined"
          onClick={createModelHandler}
          // onMouseEnter={() => handleMouseEnter("firstBtn")}
          // onMouseLeave={() => handleMouseLeave("firstBtn")}
          className={btnClassName}
        >
          創建新模型
        </StyleButton>
        <StyleButton
          variant="outlined"
          onClick={existModelHandler}
          // onMouseEnter={() => handleMouseEnter("secondBtn")}
          // onMouseLeave={() => handleMouseLeave("secondBtn")}
          className={btnClassName}
        >
          使用現有模型
        </StyleButton>
      </StyleStack>

      <StyleIntroductionBox>
        <StyleIntroduction variant="h6">
          {firstButtonIsHovered ? introduction[0] : null}
          {secondButtonIsHovered ? introduction[1] : null}
        </StyleIntroduction>
      </StyleIntroductionBox>
    </StyleBox>
  );
}

export default HomeScreen;
