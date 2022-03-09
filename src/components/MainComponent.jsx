/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Routes, Route, useNavigate, Link, useMatch } from "react-router-dom";
import Login from "./controller/Account/LoginController";
import QuestionManage from "./controller/Quiz/QuestionManageController";
import Loading from "./views/Container/Loading";
import StaffList from "./controller/Account/StaffListController";
import StaffInfo from "./controller/Account/StaffInfoController";
import RoleManage from "./controller/Account/RoleManageController";
import CompanyManage from "./controller/Account/CompanyManageController";
import QuizManage from "./controller/Quiz/QuizManageController";
import ListQuizById from "./views/QuizManage/ListQuizById";
import TakeTest from "./controller/Quiz/TakeTestController";
import StartQuiz from "./views/QuizManage/StartQuiz";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputBase from "@mui/material/InputBase";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SearchIcon from "@mui/icons-material/Search";
import { menuItem } from "./views/Container/MenuView";
import MenuItem from "@mui/material/MenuItem";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccActiveInfo from "./views/AccountManage/AccActiveInfo";
import LogoutIcon from "@mui/icons-material/Logout";
import QuizFinish from "./views/QuizManage/QuizFinish";

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
    width: `calc(${theme.spacing(9)} + 1px)`,
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

//NAVBAR

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    color: "black",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Main = () => {
  // localStorage.setItem('isLoggedIn', 'false')
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(sessionStorage.getItem("isLoggedIn"));
  const [openLogout, setOpenLogout] = useState(false);
  const loginSuccess = () => {
    setLogin(sessionStorage.getItem("isLoggedIn"));
    navigate("/admin/staff-list");
  };

  //MuiDrawer
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //NAVBAR

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";

  const MenuItemSide = ({ item }) => {
    let match = useMatch({
      path: item.path,
    });
    return (
      <Link to={item.path} className="menu-item">
        <ListItem
          button
          className={match ? "menu-item-active mx-auto" : "mx-auto"}
          style={{ padding: "15px" }}
        >
          <ListItemIcon>
            <img src={item.icon} />
          </ListItemIcon>
          <ListItemText primary={item.title} sx={{ fontWeight: "bold" }} />
        </ListItem>
      </Link>
    );
  };

  const signOut = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("company");
    sessionStorage.removeItem("id");
    navigate("/");
    window.location.reload();
  };
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  if (loading === false) {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {login === "true" ? (
          <>
            <AppBar
              position="fixed"
              open={open}
              style={{ background: "white", boxShadow: "none" }}
            >
              <Toolbar style={{ borderBottom: "1px solid rgb(200,200,200)" }}>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    color: "black",
                    // marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton
                  onClick={handleDrawerClose}
                  sx={{
                    color: "black",
                    marginRight: "36px",
                    ...(!open && { display: "none" }),
                  }}
                >
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    style={{ color: "black" }}
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    style={{ color: "black" }}
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    style={{ color: "black" }}
                  >
                    <Link to="/account">
                      <AccountCircle />
                      <span style={{ color: "black", fontSize: "13px" }}>
                        {sessionStorage.getItem("username")}
                      </span>
                    </Link>
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              open={open}
              sx={{ backgroundColor: "#F3F3F3", height: "100vh" }}
            >
              <DrawerHeader />
              {open === false ? (
                <img
                  src="/icon/LogoAIS.png"
                  alt="Logo"
                  // width="50px"
                  height="50px"
                  className="mx-auto"
                />
              ) : (
                <img
                  src="https://aisolutionsjsc.com/wp-content/uploads/2021/07/logo-ai.png"
                  alt="AISOLUTION"
                  // width="80%"
                  height="50px"
                  style={{ padding: "5px" }}
                />
              )}
              <List>
                {menuItem.map((item, index) => {
                  return <MenuItemSide item={item} key={index} />;
                })}
              </List>
              <Divider />
              <ListItem
                button
                onClick={handleOpenLogout}
                style={{ padding: "15px" }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" sx={{ fontWeight: "bold" }} />
              </ListItem>
            </Drawer>
          </>
        ) : null}
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <Routes>
            <Route
              index
              // path='/'
              element={
                <Login loginSuccess={loginSuccess} setLoading={setLoading} />
              }
            />
          </Routes>
          {login === "true" ? (
            <>
              <DrawerHeader />
              <Routes>
                {/* SUPPER_ADMIN */}
                <Route
                  path="/supperadmin/role-manage"
                  element={<RoleManage />}
                />
                <Route
                  path="/supperadmin/company-manage"
                  element={<CompanyManage />}
                />
                {/* ADMIN ROLE*/}
                <Route
                  path="/admin/staff-list"
                  element={<StaffList setLoading={setLoading} />}
                />
                <Route path="/admin/staff-list/:id" element={<StaffInfo />} />
                <Route
                  path="/quiz/create/question"
                  element={<QuestionManage />}
                />
                <Route path="/quiz/create/quiz" element={<QuizManage />} />
                <Route path="/quiz/quiz-user/:id" element={<ListQuizById />} />
                <Route path="/account" element={<AccActiveInfo />} />
                {/* HR ROLE */}
                
                <Route path="/list-test/take-quiz" element={<TakeTest />} />
                <Route path="/list-test/take-quiz/finish" element={<QuizFinish />} />
                <Route
                  path="/list-test/take-quiz/start/:id"
                  element={<StartQuiz />}
                />
              </Routes>
            </>
          ) : (
            // <div>
            //     <h2>404 Page not found</h2>
            // </div>
            ""
          )}
        </Box>
        <Dialog
          open={openLogout}
          onClose={handleCloseLogout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn muốn đăng xuất khỏi hệ thống?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseLogout}>Hủy</Button>
            <Button onClick={signOut} autoFocus>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else {
    return <Loading />;
  }
};

export default Main;
