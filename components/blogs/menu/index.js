import {useState} from 'react';
import PropTypes from 'prop-types';
import TopMenu from './top';
import SideMenu from './sideMenu';

const propTypes={
  sideOpen:PropTypes.bool,
}
const defaultProps = {
   sideOpen:false,
}

function Menu({drawerWidth,...props}) {
  const [sideOpen, setSideOpen] = useState(props.sideOpen);
  const handleSideOpen = () => {
    setSideOpen(true);
  };
  return (
    <>
       <TopMenu  handleSideOpen={handleSideOpen} />
       <SideMenu open={sideOpen} setSideOpen={setSideOpen} />
    </>
  );
}

Menu.defaultProps= defaultProps;
Menu.propTypes=propTypes;
export default Menu;