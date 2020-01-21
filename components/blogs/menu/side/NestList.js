import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import NestItem from './NestItem';
import {useDispatch} from 'react-redux'
import {loadAction} from '../../../../actions/load'
const propTypes ={
    list:PropTypes.object.isRequired,
}
const defaultProps = {
}

function NestList({children,...props}){
  const classes = useStyles();
  const {list ,handleClose} =props;
  const dispatch =useDispatch();
  function itemClick(list,depth){
    // console.log(list);
    // console.log(depth);
    const  {idList} = list;
    if(idList.length ===1){
      dispatch(loadAction('post',`http://localhost:3000/post/${idList[0]}`))
      handleClose();
    }
  }
  
  return (
    <List component="nav" aria-labelledby="nested-list-subheader"
      className={classes.root}
    > {
       Object.keys(list.subList).map((key, idx) => {
          return (
          <NestItem   key={idx} open  parentTitle={ [list.title] }
             onClick={itemClick} 
           list={list.subList[key]} />)
        })
      }
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
  
NestList.propTypes=propTypes
NestList.defaultProps=defaultProps;
export default NestList;