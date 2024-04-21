import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { Tab, ThemeProvider, createTheme, styled } from "@mui/material";
import { brown, yellow } from "@mui/material/colors";
import SelectInitialModelTabsType from "./SelectInitialModelTabsType";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function SelectInitialModelTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: `${yellow[500]}`,
      },
    },
  });

  const StyleTab = styled(Tab)({
    color: brown[500],
    fontSize: "18px",
    fontWeight: "600",
    borderTop: `1px solid ${brown[500]}`,
  });

  // Tabs 外面有包東西會跑不出動畫，請移到上一層
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ThemeProvider theme={theme}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyleTab
              label="選擇模型"
              sx={{
                borderLeft: `1px solid ${brown[500]}`,
              }}
              {...a11yProps(0)}
            />
            <StyleTab
              label="常用"
              sx={{ borderRight: `1px solid ${brown[500]}` }}
              {...a11yProps(1)}
            />
          </Tabs>
        </ThemeProvider>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <SelectInitialModelTabsType title="select model" />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <SelectInitialModelTabsType title="commonly used" />
      </CustomTabPanel>
    </Box>
  );
}

export default SelectInitialModelTabs;