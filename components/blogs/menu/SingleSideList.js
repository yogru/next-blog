import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const propTypes ={
    list:PropTypes.array.isRequired,
}
const defaultProps = {
}

function SingleSideList({children,...props}){
  const classes = useStyles();
  const {list} =props;
  
  function handleClick(name){
      return (e)=>{
        props.onItemClick(e,name); 
      }
  }
  const listes = list.map((title,key) => {
        return (
            <ListItem key={key} button onClick={handleClick(title)}>
                <ListItemText primary={title} />
            </ListItem>
        )
    })

  return (
    <List component="nav" aria-labelledby="nested-list-subheader"
      className={classes.root}
    > 
      {listes}
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
  
SingleSideList.propTypes=propTypes
SingleSideList.defaultProps=defaultProps;

export default SingleSideList;