// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import SearchInput from './SearchInput';
// import Menu from './SideList';

// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
// }));

// export default function PersistentDrawerLeft() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//           [classes.appBarShift]: open,
//         })}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, open && classes.hide)}
//           >
//             <MenuIcon />
//           </IconButton>
//            <SearchInput />
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant="persistent"
//         anchor="left"
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </div>
//         <Divider />
//        <Menu />

//       </Drawer>
//       <main
//         className={clsx(classes.content, {
//           [classes.contentShift]: open,
//         })}
//       >
//       <div className={classes.drawerHeader} />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
//           facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
//           tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
//           nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
//           accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//       </main>
//     </div>
//   );
// }
