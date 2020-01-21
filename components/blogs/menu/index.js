import {useState} from 'react';
import PropTypes from 'prop-types';
import TopMenu from './top';
import SideMenu from './side';

const propTypes={
  list: PropTypes.object.isRequired,
  sideOpen:PropTypes.bool,
  drawerWidth:PropTypes.number,
}
const defaultProps = {
   sideOpen:false,
}

function Menu({list,drawerWidth,...props}) {
  const [sideOpen, setSideOpen] = useState(props.sideOpen);
  const handleSideOpen = () => {
    setSideOpen(true);
  };
  const handleSideClose = () => {
    setSideOpen(false);
  };
  return (
    <>
       <TopMenu  handleSideOpen={handleSideOpen} />
       <SideMenu open={sideOpen} drawerWidth={drawerWidth} handleClose={handleSideClose} list={list} />
    </>
  );
}

Menu.defaultProps= defaultProps;
Menu.propTypes=propTypes;
export default Menu;