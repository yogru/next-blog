import { useState } from 'react';
import { makeStyles, Drawer, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import NestList from './NestList';
import Header from './Header';
import SingleList from './SingleList';

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

  return (
    <Drawer anchor='left' className={drawer} open={open}
      variant="persistent"
      classes={{ paper: drawerPaper }}
    >
      <Header title={selMenu} onClose={handleClose}
        onTitleClick={titleClick()} />
      <Divider />
      {
        selMenu ? <NestList list={curList} handleClose={handleClose} /> :
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
