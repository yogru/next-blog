// import { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import {
//    makeStyles, ListItem, ListItemText, ListItemIcon,
//    Collapse, List
// } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import loadSelector from '../../../../selector/hookLoad';
// import { loadAction } from '../../../../actions/load'
// import FolderIcon from '@material-ui/icons/Folder';
// import DescriptionIcon from '@material-ui/icons/Description';

// const propTypes = {
//    onClick: PropTypes.func,
//    open: PropTypes.bool,
//    offset: PropTypes.number,
//    list: PropTypes.object.isRequired,
//    parentTitle: PropTypes.array,
// }
// const defaultProps = {
//    open: false,
//    offset: 0,
// }

// // recursive compoent. 
// function NestItem({ onClick, offset, list, ...props }) {
//    const [open, SetOpen] = useState(props.open);
//    const classes = useStyles(offset);
//    const cursor = useRef([...props.parentTitle, list.title]);
//    const docName = `mainSubject@${list.name}`;

//    const dispatch = useDispatch();
//    const [loadTitles, pending] = useSelector(loadSelector(docName), []);
//    useEffect(() => {
//       dispatch(loadAction(docName, `http://localhost:3000/post/titles/${list._id}`))
//    }, [list])


//    const handleClick = (e) => {
//       // onClick&&onClick(list,cursor);
//       SetOpen(!open);
//       e.stopPropagation();
//    }
//    return (
//       <>
//          <ListItem button onClick={handleClick}>
//             <ListItemIcon>
//                <FolderIcon />
//             </ListItemIcon>
//             <ListItemText primary={list.name} />
//          </ListItem>

//          <Collapse className={classes.nested} in={open} timeout="auto" unmountOnExit>
//             <List component="nav" >
//                { // sub folder
//                   Object.keys(list.subList).length > 0 &&
//                   Object.keys(list.subList).map((key, idx) => {
//                      const sub = list.subList[key];
//                      return <NestItem key={idx} list={sub}
//                         parentTitle={cursor.current}
//                         onClick={onClick} offset={offset + 0.5} />
//                   })
//                }
               
//                { // sub doc
//                   loadTitles && loadTitles.data && Object.keys(loadTitles.data).map((key) => {
//                      const { _id, title } = loadTitles.data[key];
//                      return (
//                         <ListItem button key={key} onClick={() => onClick(_id)}>
//                            <ListItemIcon>
//                               <DescriptionIcon />
//                            </ListItemIcon>
//                            <ListItemText primary={title} />
//                         </ListItem>
//                      )
//                   })
//                }
//             </List>
//          </Collapse>
//       </>
//    );
// }

// NestItem.propTypes = propTypes;
// NestItem.defaultProps = defaultProps;
// export default NestItem;


// const useStyles = makeStyles(theme => ({
//    nested: offset => {
//       offset = offset || 0.5;
//       return {
//          paddingLeft: `${offset}rem`,
//       }
//    }
// }));