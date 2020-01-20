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

function SideList({children,...props}){
  const classes = useStyles();
  const {list} =props;
  
  const Items =Object.keys(list).map((key ,idx)=>{
       return <SideListItem key={idx} offset={0} list = {list[key]}/>
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
  
SideList.propTypes=propTypes
SideList.defaultProps=defaultProps;

export default SideList;