import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchInput from './SearchInput';
import IconCreater from '@material-ui/icons/Create';
import LockOpenIcon from '@material-ui/icons/LockOpen';

function TopMenu({ children, ...props }) {
    const {handleSideOpen} = props;
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit"  aria-label="open drawer"  edge="start"
            onClick={handleSideOpen}
          >
            <MenuIcon />
          </IconButton>
             <IconCreater />
             <LockOpenIcon />
          <SearchInput />
        </Toolbar>
      </AppBar>
    )
  }

export default TopMenu;