import { useState } from 'react';
import { makeStyles, Drawer, Divider } from '@material-ui/core';
import {dispatch, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Nest from './Nest';
import Header from './Header';
import SingleList from './SingleList';
import { loadAction } from '../../../../actions/load'
//import NestList from './NestList';

const propTypes = {
  list: PropTypes.object.isRequired,
  drawerWidth: PropTypes.number,
  open: PropTypes.bool,
}
const defaultProps = {
  open: false,
  pageOfCount: 13,
}

function SideMenu({ children, ...props }) {
  const { open, handleClose } = props;
  const [curList, setCurList] = useState(props.list);
  const [selMenu, setMenu] = useState();
  const { drawer, drawerPaper } = useStyles(props);
   const dispatch = useDispatch();
  function titleClick() {
    if (!selMenu) return handleClose;
    return (e) => {
      setCurList(props.list);
      setMenu(undefined);
    }
  }

  function sigleItemClick(e, name) {
    setMenu(name);
    setCurList(curList[name]);
  }
  function onNestItemClick(postID){
       console.log('onNest',postID);
       dispatch(loadAction('post',`http://localhost:3000/post/${postID}`))
       handleClose();
  }

  return (
    <Drawer anchor='left' className={drawer} open={open}
      variant="persistent"
      classes={{ paper: drawerPaper }}
    >
      <Header title={selMenu} onClose={handleClose}
        onTitleClick={titleClick()} />
      <Divider />
       {
        selMenu ? <Nest list={curList} onItemClick={onNestItemClick} handleClose={handleClose} /> :
                  <SingleList list={curList}  onItemClick={sigleItemClick} />
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
}));

SideMenu.defaultProps = defaultProps;
SideMenu.propTypes = propTypes;
export default SideMenu;
