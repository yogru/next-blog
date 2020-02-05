import { useState } from 'react';
import { makeStyles, Drawer, Divider, } from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from './Header';
import { useSelector } from 'react-redux'
import loadSelector from '../../../../selector/hookLoad';
import SingleList from './SingleList';
import Nest from './nest/Nest';
import CrudMenu from './CrudMenu';


const propTypes = {
  drawerWidth: PropTypes.number,
  open: PropTypes.bool,
}
const defaultProps = {
  open: false,
  pageOfCount: 13,
  drawerWidth:240
}

function SideMenu({ children, ...props }) {
  const { open, setSideOpen } = props;
  const { drawer, drawerPaper } = useStyles(props);

  const [loadList , pendding]= useSelector(loadSelector('menuList'));
  const [curSubject, setCurSubject] =  useState();
  
  const onClose= (e)=>{
    setSideOpen(false);
  }

  function titleClick() {
    return (e)=>{
       if(!curSubject){
          onClose(e);
         return;
       }
       setCurSubject(undefined);
    }
  }

  return (
    <Drawer anchor='left' className={drawer} open={open} 
      onClose={onClose}
      classes={{ paper: drawerPaper }}
    >
      <Header title={curSubject?curSubject.name:undefined} 
          onClose={onClose}
        onTitleClick={titleClick()} />
      <Divider/>
         {
             pendding? <div>로딩 중 </div>:
               !curSubject ? <SingleList list={loadList.data} 
                              onItemClick={(e,sub)=>setCurSubject(sub)}/>:
                           <CrudMenu>
                              <Nest parentSubjectId ={curSubject._id} />
                           </CrudMenu>
                             
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
