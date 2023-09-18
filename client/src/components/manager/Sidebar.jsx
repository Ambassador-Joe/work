import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    text: "Manage Staff",
    icon: <GroupsIcon />,
    submenu: [
      { text: "Add New Staff", link: "addstaff" },
      { text: "Staff List", link: "staff" },
      { text: "Staffs On Leave", link: "leave" },
      { text: "Staffs on suspension", link: "suspension" },
      { text: "Temporal Staffs", link: "temporal" },
      { text: "Retired/Resigned Staff", link: "exited" },
    ],
  },
  {
    text: "Leave Management",
    icon: <AdminPanelSettingsIcon />,
    submenu: [
      { text: "Staff Leave Schedule", link: "leaveSchedule" },
      { text: "Run Leave", link: "runLeave" },
      { text: "Leave Requests", link: "requests" },
      { text: "Apply For Leave", link: "applyLeave" },
    ],
  },
  {
    text: "Staff Contracts",
    icon: <ReceiptLongIcon />,
  },
  {
    text: "Performance Appraisal",
    icon: <TrendingUpIcon />,
  },
  {
    text: "Payroll",
    icon: <PaidSharpIcon />,
  },

  {
    text: "Annual Calendar",
    icon: <CalendarMonthIcon />,
  },
  {
    text: "Make Notification",
    icon: <NotificationAddIcon />,
  },
  {
    text: "Accounts Settings",
    icon: <AccountCircleSharpIcon />,
  },
  {
    text: "Logout",
    icon: <LogoutOutlinedIcon />,
  },
];

const ManageStaffSubMenu = ({ submenuItems, active, setActive, navigate }) => {
  const theme = useTheme();

  return (
    <List>
      {submenuItems.map(({ text, link }) => (
        <ListItem disablePadding key={text}>
          <ListItemButton
            onClick={() => {
              navigate(link);
              setActive(link.substring(1));
            }}
            sx={{
              backgroundColor:
                active === link.substring(1)
                  ? theme.palette.secondary[300]
                  : "transparent",
              color:
                active === link.substring(1)
                  ? theme.palette.primary[500]
                  : theme.palette.secondary[100],
            }}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const LeaveManagementSubMenu = ({ submenuItems, active, setActive, navigate }) => {
  const theme = useTheme();

  return (
    <List>
      {submenuItems.map(({ text, link }) => (
        <ListItem disablePadding key={text}>
          <ListItemButton
            onClick={() => {
              navigate(link);
              setActive(link.substring(1));
            }}
            sx={{
              backgroundColor:
                active === link.substring(1)
                  ? theme.palette.secondary[300]
                  : "transparent",
              color:
                active === link.substring(1)
                  ? theme.palette.primary[500]
                  : theme.palette.secondary[100],
            }}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const [isManageStaffSubMenuOpen, setIsManageStaffSubMenuOpen] = useState(false);
  const [isLeaveManagementSubMenuOpen, setIsLeaveManagementSubMenuOpen] = useState(false);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleManageStaffClick = () => {
    setIsManageStaffSubMenuOpen(!isManageStaffSubMenuOpen);
    setIsLeaveManagementSubMenuOpen(false);
  };

  const handleLeaveManagementClick = () => {
    setIsLeaveManagementSubMenuOpen(!isLeaveManagementSubMenuOpen);
    setIsManageStaffSubMenuOpen(false);
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ALCON
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftIcon />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, submenu }) => (
                <React.Fragment key={text}>
                  {submenu ? (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={text === "Manage Staff" ? handleManageStaffClick : handleLeaveManagementClick}
                          sx={{
                            backgroundColor:
                              active === text.toLowerCase()
                                ? theme.palette.secondary[300]
                                : "transparent",
                            color:
                              active === text.toLowerCase()
                                ? theme.palette.primary[500]
                                : theme.palette.secondary[100],
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ml: "2rem",
                              color:
                                active === text.toLowerCase()
                                  ? theme.palette.primary[600]
                                  : theme.palette.secondary[200],
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {text === "Manage Staff" ? (
                            isManageStaffSubMenuOpen ? (
                              <ChevronRightOutlinedIcon sx={{ ml: "auto" }} />
                            ) : (
                              <ExpandMoreIcon sx={{ ml: "auto" }} />
                            )
                          ) : (
                            isLeaveManagementSubMenuOpen ? (
                              <ChevronRightOutlinedIcon sx={{ ml: "auto" }} />
                            ) : (
                              <ExpandMoreIcon sx={{ ml: "auto" }} />
                            )
                          )}
                        </ListItemButton>
                      </ListItem>
                      {/* Submenu */}
                      {text === "Manage Staff" && isManageStaffSubMenuOpen && (
                        <ManageStaffSubMenu
                          submenuItems={submenu}
                          active={active}
                          setActive={setActive}
                          navigate={navigate}
                        />
                      )}
                      {text === "Leave Management" && isLeaveManagementSubMenuOpen && (
                        <LeaveManagementSubMenu
                          submenuItems={submenu}
                          active={active}
                          setActive={setActive}
                          navigate={navigate}
                        />
                      )}
                    </>
                  ) : (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          switch (text) {
                            case "Dashboard":
                              navigate("/managerDashboard");
                              setActive("managerDashboard");
                              break;
                            case "Staff Contracts":
                              navigate("/contract");
                              setActive("contract");
                              break;
                            case "Performance Appraisal":
                              navigate("/performance");
                              setActive("performance");
                              break;
                            case "Payroll":
                              navigate("/payroll");
                              setActive("payroll");
                              break;
                            case "Annual Calendar":
                              navigate("/calendar");
                              setActive("calendar");
                              break;
                            case "Make Notification":
                              navigate("/notification");
                              setActive("notification");
                              break;
                            case "Accounts Settings":
                              navigate("/settings");
                              setActive("settings");
                              break;
                            case "Logout":
                              navigate("/");
                              setActive("");
                              break;
                            default:
                              break;
                          }
                        }}
                        sx={{
                          backgroundColor:
                            active === text.toLowerCase()
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === text.toLowerCase()
                              ? theme.palette.primary[500]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === text.toLowerCase()
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === text.toLowerCase() && (
                          <ChevronRightOutlinedIcon sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
