import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const propTypes={
   submitFunc : PropTypes.func.isRequired,
}
const defaultProps= {
  submitFunc:()=>{
    console.log("검색 버튼 만들어야되..")
  }
}

function CustomizedInputBase({submitFunc}) {
  const classes = useStyles();
  const [text,setText] =  useState('');

  function onMySubmit(e){
    if(typeof submitFunc ==='function')submitFunc(text);
     e.stopPropagation();
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={(e)=>{ setText(e.target.value)} }
      />
      <IconButton  type="submit"  onClick={onMySubmit} 
          className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width:'15rem',
    marginLeft:'auto',
    height:'2.0rem'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

CustomizedInputBase.propTypes=propTypes;
CustomizedInputBase.defaultProps=defaultProps;
export default CustomizedInputBase;
