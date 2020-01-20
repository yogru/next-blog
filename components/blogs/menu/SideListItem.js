import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
    nested:offset=>{
       offset= offset || 0.5;
       return {
          paddingLeft:`${offset}rem`,
       } 
    }
}));

// recursive compoent. 
function SideListItem({onClick,offset,list}){
   const [open , SetOpen]= useState(false);
   const classes = useStyles(offset);
   const handleClick = (e, list)=>{
      onClick&&onClick(list);
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
                      return <SideListItem key={idx} list={sub} offset={offset+0.5} /> 
                 })
             }
            </List>
          </Collapse> 
         }
       </>
    );
}

export default SideListItem;