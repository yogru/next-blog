// import React, { useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { List, ListItem ,ListItemIcon,ListItemText } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import NestItem from './NestItem';
// import { useDispatch, useSelector } from 'react-redux'
// import { loadAction } from '../../../../actions/load'
// import loadSelector from '../../../../selector/hookLoad';
// import DescriptionIcon from '@material-ui/icons/Description';


// const propTypes = {
//   list: PropTypes.object.isRequired,
// }
// const defaultProps = {
// }

// function NestList({ children, ...props }) {
//   const classes = useStyles();
//   const { list, handleClose } = props;
//   const dispatch = useDispatch();
//   const docName = `mainSubject@${list.name}`;
//   const [loadTitles, pending] = useSelector(loadSelector(docName), []);


//   useEffect(() => {
//     dispatch(loadAction(docName, `http://localhost:3000/post/titles/${list._id}`))
//   }, [list])

//   function itemClick(postID) {
//     console.log(postID);
//     // if(idList.length ===1){
//     //   dispatch(loadAction('post',`http://localhost:3000/post/${idList[0]}`))
//     //   handleClose();
//     // }
//   }

//   return (
//     <List component="nav" aria-labelledby="nested-list-subheader"
//       className={classes.root}
//       >
//        {
//           Object.keys(list.subList).map((key, idx) => {
//             return (
//               <NestItem key={idx} parentTitle={[list.title]}
//                 onClick={itemClick}
//                 list={list.subList[key]} />)
//           })
//        }

//       {
//         loadTitles && loadTitles.data && Object.keys(loadTitles.data).map((key) => {
//           const { _id, title } = loadTitles.data[key];
//           return (
//             <ListItem button key={key} onClick={() => { itemClick(_id) }}>
//               <ListItemIcon>
//                 <DescriptionIcon />
//               </ListItemIcon>
//               <ListItemText primary={title} />
//             </ListItem>
//           )
//         })
//       }
//     </List>
//   );
// }

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 240,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// NestList.propTypes = propTypes
// NestList.defaultProps = defaultProps;
// export default NestList;