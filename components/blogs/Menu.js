import {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchInput from './SearchInput';
import SideList from './SideList';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const propTypes={
  list: PropTypes.array.isRequired,
  drawerWidth:PropTypes.number,
  sideOpen:PropTypes.bool,
}
const defaultProps = {
  drawerWidth:240,
  sideOpen:false,
}

function TopMenu({ children, ...props }) {
  const {classes,sideOpen,handleSideOpen} = props;
  const { appBar ,appBarShift ,menuButton,hide } =classes;
  return (
    <AppBar position="fixed"
      className={clsx(appBar, {[appBarShift]: sideOpen,})}
    >
      <Toolbar>
        <IconButton color="inherit"  aria-label="open drawer"  edge="start"
          onClick={handleSideOpen}
          className={clsx(menuButton, sideOpen && hide)}
        >
          <MenuIcon />
        </IconButton>
        <SearchInput />
      </Toolbar>
    </AppBar>
  )
}

function SideMenu({ children, ...props }) {
  const { open, classes, handleClose, list } = props;
  const { drawer, drawerHeader, drawerPaper,drawerHeaderContent } = classes;
  return (
    <Drawer anchor='left' className={drawer} variant="persistent"
      open={open}
      classes={{ paper: drawerPaper }}
    >
      <div className={drawerHeader}>
      <List component="nav" aria-labelledby="drawer Header Content "
      className={drawerHeaderContent}>
          <ListItem button>{list.title} </ListItem>
      </List>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <SideList list={list} />
    </Drawer>
  )
}

function Menu({children, ...props}) {
  const { list } = props;
  const useStyles = propsStyleMather(props);
  const classes = useStyles();
  const [sideOpen, setSideOpen] = useState();
  
  const handleSideOpen = () => {
    setSideOpen(true);
  };
  
  const handleSideClose = () => {
    setSideOpen(false);
  };
  
  return (
    <>
    <TopMenu sideOpen={sideOpen} classes= {classes} 
     handleSideOpen={handleSideOpen} />
    <SideMenu open ={sideOpen} classes= {classes}
     handleClose={handleSideClose} list={list} />
    </>
  );
}

function propsStyleMather({...props}){
 const {drawerWidth} =props;
 return makeStyles(theme => ({
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      // justifyContent: 'flex-end',
    },
    drawerHeaderContent:{
        width:'15rem', // 1.5rem 10글자 최대.
        marginRight:'auto',
        fontSize:'1.5rem',
        alignItems: 'center',
    }
  }));
}

Menu.defaultProps= defaultProps;
Menu.propTypes=propTypes;
export default Menu;