import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SingleSideList from './SingleSideList'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';
import NestList from './NestList';

const propTypes = {
  list: PropTypes.object.isRequired,
  drawerWidth: PropTypes.number,
  open: PropTypes.bool,
  pageOfCount: PropTypes.number,
  sideName: PropTypes.string,
}
const defaultProps = {
  open: false,
  pageOfCount: 13,
  sideName: 'kyb-blog',
}

function SideMenu({ children, ...props }) {
  const { open, handleClose, pageOfCount } = props;
  const [curList, setCurList] = useState(props.list);
  const [selMenu, setMenu] = useState();
  const [curPageIdx, setPageIdx] = useState(1);
  
  const { drawer, drawerHeader, pageLeftArrow, pageBox, pageRightArrow,
    leftArrowBtn, drawerPaper, drawerHeaderContent } = useStyles(props);
    
    function next(plus) {
      const cirPageNum = createCircleNum(getMaxPageCount(curList, pageOfCount))
      setPageIdx(cirPageNum(curPageIdx - 1, plus) + 1);
    }
    
    function titleClick() {
      if (!selMenu) return handleClose;
      return (e) => {
        setCurList(props.list);
        setPageIdx(1);
        setMenu(undefined);
      }
    }
    
    return (
      <Drawer anchor='left' className={drawer} variant="persistent"
      open={open}
      classes={{ paper: drawerPaper }}
      >
      <div className={drawerHeader}>
        <List component="nav" aria-labelledby="drawer Header Content "
          className={drawerHeaderContent}>
          <ListItem button onClick={titleClick()}>
            {
              selMenu ? selMenu : props.sideName
            }
          </ListItem>
        </List>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />

      {
        selMenu ? <NestList list={curList} handleClose={handleClose} /> :
        <>
            <SingleSideList
              list={createPageOfIndex(Object.keys(curList), pageOfCount)(curPageIdx)}
              onItemClick={(e, name) => {
                setMenu(name);
                setCurList(curList[name]);
              }}
              />
            <Box className={pageBox} >
              <IconButton color='primary' className={leftArrowBtn} onClick={e => next(-1)} >
                <ChevronLeftIcon className={pageLeftArrow} />
              </IconButton>
              <IconButton color='primary' onClick={e => next(+1)} >
                <ChevronRightIcon className={pageRightArrow} />
              </IconButton>
            </Box>
          </>
      }
    </Drawer>
  )
}

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  drawer: (props) => ({
    width: props.drawerWidth,
    flexShrink: 0,
  }),
  drawerPaper: (props) => ({
    width: props.drawerWidth,
  }),
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  leftArrowBtn: {
    marginRight: 'auto',
  },
  pageLeftArrow: {
    marginLeft: '1rem',
    marginRight: '2rem',
  },
  pageRightArrow: {
    marginLeft: '2rem',
    marginRight: '1rem',
  },
  pageBox: {
    display: 'flex',
    marginTop: 'auto',
  },
  drawerHeaderContent: {
    width: '15rem', // 1.5rem 10글자 최대.
    marginRight: 'auto',
    fontSize: '1.5rem',
    alignItems: 'center',
  }
}));


SideMenu.defaultProps = defaultProps;
SideMenu.propTypes = propTypes;
export default SideMenu;

// utils...
function createCircleNum(cycleMax) {
  return (cur, plus) => {
    let nextIdx = cur + plus;
    nextIdx %= cycleMax;
    if (nextIdx < 0) nextIdx += cycleMax;
    return nextIdx;
  }
}
function createPageOfIndex(arr, pageOfCount) {
  return (idx) => {
    const ret = [];
    const sidx = (idx - 1) * pageOfCount;
    for (let i = sidx; i < sidx + pageOfCount; i++) {
      if (!arr[i]) break;
      ret.push(arr[i]);
    }
    return ret;
  }
}
function getMaxPageCount(obj, pageOfCount) {
  return Math.ceil((Object.keys(obj).length / pageOfCount));
}