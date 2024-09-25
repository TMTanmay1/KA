import React, { useState , useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Toolbar, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, Person, School, Menu, Book, ExpandMore, ExpandLess, Add, ListAlt, InsertDriveFile, Category,  AccountBalance, Money } from '@mui/icons-material';
import L from '../assets/L.jpeg';
import Logo from '../assets/ka1.png';
import PeopleIcon from '@mui/icons-material/People';
import Group from '@mui/icons-material/Group';
import TaskIcon from '@mui/icons-material/Task';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [batchManagementOpen, setBatchManagementOpen] = useState(false);
  const [courseModuleOpen, setCourseModuleOpen] = useState(false);
  const [studentManagementOpen, setStudentManagementOpen] = useState(false);
  const [assetOpen, setAssetOpen] = useState(false)
  const [studyMaterialOpen, setStudyMaterialOpen] = useState(false)
  const [staffManagementOpen, setStaffManagementOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleBatchManagementClick = () => {
    setBatchManagementOpen(!batchManagementOpen);
  };

  const handleCourseModuleClick = () => {
    setCourseModuleOpen(!courseModuleOpen);
  };

  const handleStudentManagementClick = () => {
    setStudentManagementOpen(!studentManagementOpen);
  };

  const handleAssetClick = () => {
    setAssetOpen(!assetOpen);
  };

  const handleStudyMaterialClick = () => {
    setStudyMaterialOpen(!studyMaterialOpen);
  };

  const handleStaffManagementClick = () => {
    setStaffManagementOpen(!staffManagementOpen);
  };

  useEffect(() => {
    if (!open) {
      setBatchManagementOpen(false);
      setCourseModuleOpen(false);
      setStudentManagementOpen(false);
      setAssetOpen(false);
      setStudyMaterialOpen(false);
      setStaffManagementOpen(false);
    }
  }, [open]);

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          overflowX: 'hidden',
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            boxSizing: 'border-box',
            backgroundColor: '#f1f1f1',
            color: '#000',
            transition: 'width 0.3s ease-in-out',
            overflowX: 'hidden',
            overflowY: 'auto', // Enable vertical scrolling
            '&::-webkit-scrollbar': {
              width: '8px', // Width of the scrollbar
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888', // Color of the scrollbar thumb
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555', // Color of the scrollbar thumb on hover
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1', // Color of the scrollbar track
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: 'white',
            color: '#000',
            position: 'relative',
            zIndex: 2,
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ marginRight: 2, zIndex: 2 }}
          >
            <Menu />
          </IconButton>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: '40px' }}
          />
        </Box>

        <Toolbar />
        <List>
          <ListItem
            button
            component={Link} to="/dashboard"
            sx={{
              my: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItem>

          <ListItem
            button
            onClick={handleBatchManagementClick}
            sx={{
              my: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <School />
            </ListItemIcon>
            {open && <ListItemText primary="Batch Management" />}
            {open && (batchManagementOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={batchManagementOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/dashboard/batch-registration"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Batch Registration" />
              </ListItem>
              {/* <ListItem
                button
                component={Link}
                to="/add-batch-students"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary="Add Batch Students" />
              </ListItem> */}
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleStudentManagementClick}
            sx={{
              my: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            {open && <ListItemText primary="Student Management" />}
            {open && (studentManagementOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={studentManagementOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

            <ListItem
                button
                component={Link}
                to="/dashboard/student-registration"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Student Registration" />
              </ListItem>
              
              <ListItem
                button
                component={Link}
                to="/dashboard/applied-student"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Applied Student" />
              </ListItem>
              
              <ListItem
                button
                component={Link}
                to="/dashboard/registered-students"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText primary="Registered Students" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/dashboard/all-students"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="All Students" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleCourseModuleClick}
            sx={{
              my: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            {open && <ListItemText primary="Course Module" />}
            {open && (courseModuleOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={courseModuleOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/dashboard/course"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add Course" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/dashboard/manage-course-category"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Add Course Category" />
              </ListItem>
            </List> 
          </Collapse>
          
          <ListItem
            button
            onClick={handleAssetClick}
            sx={{
              my: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <AccountBalance />
            </ListItemIcon>
            {open && <ListItemText primary="Asset" />}
            {open && (assetOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={assetOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/dashboard/income"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Money />
                </ListItemIcon>
                <ListItemText primary="Income" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/dashboard/expense"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Money />
                </ListItemIcon>
                <ListItemText primary="Expense" />
              </ListItem>
            </List>
          </Collapse>
          
          <ListItem
            button
            onClick={handleStudyMaterialClick}
            sx={{
              my: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            {open && <ListItemText primary="Study Material" />}
            {open && (studyMaterialOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={studyMaterialOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/dashboard/study-material"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add Study Material" />
              </ListItem>
            </List>
          </Collapse>
          
          <ListItem
            button
            onClick={handleStaffManagementClick}
            sx={{
              my: 1.5,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            {open && <ListItemText primary="Staff Management" />}
            {open && (staffManagementOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={staffManagementOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/dashboard/staff"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Staff Registration" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/dashboard/assigned-staff-tasks"
                sx={{
                  pl: 4,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Assign Task" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
