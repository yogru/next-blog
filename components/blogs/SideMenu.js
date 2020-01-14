import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import MenuItem from './SideMenuItem';

const propTypes ={
    list:PropTypes.object.isRequired,
}

const defaultProps = {
   list:{
      title:1,
      subList:[
          {
            title:2,  
            subList:[]
          },
          {
            title:2,  
            subList:[]
          },
          {
            title:3,  
            subList:[{
               title:'zz',  
               subList:[]
             }
            ]
          },
          {
            title:4,  
            subList:[
             {
                title:5,  
                subList:[]
             },
             {
                title:6,  
                subList:[]
             },
             {
                title:7,  
                subList:[]
             }
            ]
          },
      ]
   }
}

function Menu({children,...props}){
  const classes = useStyles();
   
  const Items=  Array(10).fill(true).map((_,key)=>{
      return  <MenuItem key={key} offset={0} list = {props.list} />
  })

  return (
    <List component="nav" aria-labelledby="nested-list-subheader"
      className={classes.root}
    > 
       {Items}

    </List>
  );
}

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 240,
      backgroundColor: theme.palette.background.paper,
    },
}));
  
Menu.propTypes=propTypes
Menu.defaultProps=defaultProps;

export default Menu;