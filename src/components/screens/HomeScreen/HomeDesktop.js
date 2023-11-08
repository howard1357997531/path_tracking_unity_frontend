import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import aos from "aos";
import "aos/dist/aos.css";
import "./css/HomeDesktop.css";
import {
  StyleBox,
  StyleButton,
  StyleIntroduction,
  StyleIntroductionBox,
  StyleStack,
  StyleTypography,
  StyleTypographyBox,
} from "../../../styles/HomeScreen/HomeDesktop";

function HomeDesktop() {
  const navigate = useNavigate();
  const [firstButtonIsHovered, setFirstButtonIsHovered] = useState(false);
  const [secondButtonIsHovered, setsecondButtonIsHovered] = useState(false);

  const introduction = [
    "使用3D相機掃描物體，接著會開啟3D繪圖頁面給使用者做畫點、繪圖之功能",
    "之前已經掃描過物體，直接選擇3D物體然後啟動手臂",
  ];

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
    // setBtnEffect(true);
    // setTimeout(() => {
    //   setBtnEffect(false);
    //   navigate("/create-model");
    // }, 1000);
    // setTimeout(() => {}, 1200);
    navigate("/create-model");
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
        <StyleTypography variant="h4" className="aoxItem">
          請選擇方式
        </StyleTypography>
      </StyleTypographyBox>

      <StyleStack direction="row">
        <StyleButton
          variant="outlined"
          onClick={createModelHandler}
          onMouseEnter={() => handleMouseEnter("firstBtn")}
          onMouseLeave={() => handleMouseLeave("firstBtn")}
          className="aoxItem"
        >
          創建新模型
        </StyleButton>
        <StyleButton
          variant="outlined"
          onClick={existModelHandler}
          onMouseEnter={() => handleMouseEnter("secondBtn")}
          onMouseLeave={() => handleMouseLeave("secondBtn")}
          className="aoxItem"
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

export default HomeDesktop;
