import {useState ,useRef} from 'react';
import { makeStyles,ListItem ,ListItemText,ListItemIcon,
   Collapse ,List } from '@material-ui/core';
import PropTypes from 'prop-types';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
                         
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

{/* <ListItemAvatar>
<Avatar>
  <FolderIcon />
</Avatar>
</ListItemAvatar> */}

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
               <ListItemIcon>
                 {
                  list.idList.length >= 2 ? 
                  <FolderIcon /> : <DescriptionIcon/>
                 }
               </ListItemIcon>
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