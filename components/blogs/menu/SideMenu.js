import {useState ,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SideList from './SideList';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SingleSideList from './SingleSideList'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';


const propTypes={
  list: PropTypes.object.isRequired,
  drawerWidth: PropTypes.number,
  open: PropTypes.bool,
}
const defaultProps = {
  open:false,
}

function SideMenu({ children, ...props }) {
  const { open, handleClose } = props;
  const list = useRef(props.list);
  const [selMenu ,setMenu ] =  useState();
  const [curPageIdx, setPageIdx] =  useState(1);
  const pageCount = 13;
  const { drawer, drawerHeader,pageLeftArrow,pageBox,pageRightArrow,
    leftArrowBtn, drawerPaper,drawerHeaderContent } =  useStyles(props);
  
    function circlePage(plus){
     let nextIdx= curPageIdx +plus;
     const maxCount= Math.ceil( Object.keys(list.current).length /pageCount);
      nextIdx %= maxCount;
       if(nextIdx<1)nextIdx = maxCount+nextIdx;
      setPageIdx(nextIdx);
    }

  function paging(idx) {
    const arr = Object.keys(list.current);
    const ret = [];
    const sidx = (idx - 1) * pageCount;
    for (let i = sidx; i < sidx + pageCount; i++) {
      if(arr[i])
       ret.push(arr[i]);
    }
    return ret;
  }

  return (
    <Drawer anchor='left' className={drawer} variant="persistent"
      open={open}
      classes={{ paper: drawerPaper }}
    >
      <div className={drawerHeader}>
      <List component="nav" aria-labelledby="drawer Header Content "
      className={drawerHeaderContent}>
              <ListItem button  onClick={handleClose}>
               {
                  selMenu ? selMenu : "kyb-blog"
               }
              </ListItem>
      </List>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
       <SingleSideList list={paging(curPageIdx)}
        onItemClick={(e,name)=>console.log(name)}
       />
      <Box className={pageBox} >
        <IconButton color='primary' className={leftArrowBtn} onClick={e=>circlePage(-1)} >
          <ChevronLeftIcon className={pageLeftArrow} />
        </IconButton>
        <IconButton color='primary' onClick={e=>circlePage(+1)} >
          <ChevronRightIcon className={pageRightArrow} />
        </IconButton>
      </Box>
      {/* <SideList list={list} /> */}
    </Drawer>
  )
}

const useStyles =  makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  drawer:(props)=>({
    width:props.drawerWidth,
    flexShrink: 0,
  }),
  drawerPaper:(props)=>({
    width: props.drawerWidth,
  }),
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  leftArrowBtn:{
    marginRight:'auto',
  },
  pageLeftArrow:{
    marginLeft:'1rem',
    marginRight:'2rem',
  },
  pageRightArrow:{
    marginLeft:'2rem',
    marginRight:'1rem',
  },
  pageBox:{
   display:'flex',
   marginTop:'auto',
  },
  drawerHeaderContent:{
      width:'15rem', // 1.5rem 10글자 최대.
      marginRight:'auto',
      fontSize:'1.5rem',
      alignItems: 'center',
  }
}));


SideMenu.defaultProps= defaultProps;
SideMenu.propTypes=propTypes;
export default SideMenu;