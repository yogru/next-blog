import {useState ,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
                         
const propTypes={
   onClick:PropTypes.func,
   open:PropTypes.bool,
   offset:PropTypes.number,
   list:PropTypes.object.isRequired,
   parentTitle:PropTypes.array,
}
const defaultProps={
   open:false,
   offset:0,
}

// recursive compoent. 
function NestItem({onClick,offset,list, ...props}){
   const [open , SetOpen]= useState(props.open);
   const classes = useStyles(offset);
   const cursor = useRef([...props.parentTitle,list.title]);

   const handleClick = (e)=>{
      onClick&&onClick(list,cursor);
      SetOpen(!open);
      e.stopPropagation();
   }
   return (
      <>
         <ListItem button onClick={handleClick}>
            <ListItemText primary={list.title} />
         </ListItem>
         {
            Object.keys(list.subList).length>0 &&
           <Collapse className={classes.nested} in={open} timeout="auto" unmountOnExit>
            <List  component="nav" >
             {
                Object.keys(list.subList).map((key,idx)=>{
                      const sub= list.subList[key];
                      return <NestItem key={idx} list={sub} 
                      parentTitle={cursor.current}
                           onClick={onClick} offset={offset+0.5} /> 
                     })
             }
            </List>
          </Collapse> 
         }
       </>
    );
}

NestItem.propTypes=propTypes;
NestItem.defaultProps=defaultProps;
export default NestItem;


const useStyles = makeStyles(theme => ({
    nested:offset=>{
       offset= offset || 0.5;
       return {
          paddingLeft:`${offset}rem`,
       } 
    }
}));