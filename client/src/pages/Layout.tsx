import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../ThemedApp";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const colorMode = useContext(ColorModeContext);
  const [isDrawserOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Box>
      <NavBar 
      toggleOnChange={colorMode.toggleColorMode} 
      onMenuBtnClick={() => setDrawerOpen(!isDrawserOpen)}
      />
      <Outlet />
    </Box>
  );
};

export default Layout;
