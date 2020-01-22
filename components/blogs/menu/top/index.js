import { AppBar, Toolbar, IconButton, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import IconCreater from '@material-ui/icons/Create';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
import SearchInput from './SearchInput';
import styled from 'styled-components';



function TopMenu({ children, ...props }) {
  const { handleSideOpen } = props;
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start"
          onClick={handleSideOpen}
        >
          <MenuIcon />
        </IconButton>

        <MenuBtnList>

          <IconButton color='inherit'>
            <HomeIcon />
          </IconButton>

          <IconButton color='inherit'>
            <IconCreater />
          </IconButton>

          <IconButton color='inherit'>
            <LockOpenIcon />
          </IconButton>

        </MenuBtnList>

        <SearchInput />
      </Toolbar>
    </AppBar>
  )
}

const MenuBtnList = styled.div`
  display:flex;
  margin-left:auto;
`

export default TopMenu;