import React, { useState , useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Toolbar, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, Person, School, Menu, Book, ExpandMore, ExpandLess, Add, ListAlt, InsertDriveFile, Category,  AccountBalance, Money } from '@mui/icons-material';
import L from '../assets/L.jpeg';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [batchManagementOpen, setBatchManagementOpen] = useState(false);
  const [courseModuleOpen, setCourseModuleOpen] = useState(false);
  const [studentManagementOpen, setStudentManagementOpen] = useState(false);
  const [assetOpen, setAssetOpen] = useState(false)

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

  useEffect(() => {
    if (!open) {
      setBatchManagementOpen(false);
      setCourseModuleOpen(false);
      setStudentManagementOpen(false);
      setAssetOpen(false);
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
            src={L}
            alt="Logo"
            style={{ height: '40px' }}
          />
        </Box>

        <Toolbar />
        <List>
          <ListItem
            button
            component={Link} to="/"
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
                to="/batch-registration"
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
                to="/applied-student"
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
                to="/student-registration"
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
                to="/registered-students"
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
                to="/course"
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
                to="/manage-course-category"
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
                to="/income"
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
                to="/expense"
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
          
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
