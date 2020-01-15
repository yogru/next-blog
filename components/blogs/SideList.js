import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import SideListItem from './SideListItem';

const propTypes ={
    list:PropTypes.object.isRequired,
}

const defaultProps = {
}

function Menu({children,...props}){
  const classes = useStyles();
  const {list} =props;
  
  const Items=  Array(10).fill(true).map((_,key)=>{
      return  <SideListItem key={key} offset={0} list = {props.list} />
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