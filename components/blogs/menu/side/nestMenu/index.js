import React, {useReducer } from 'react';
import {
    makeStyles, ListItem, ListItemText,
    ListItemIcon, Collapse, List
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import NewItemInput from './NewItemInput'
import DocList from './DocList';
import { partActionReducer } from '../../../../../reducers/utils';


const menuItemReducer = partActionReducer({
    "init": (draft, { payload: { state } }) => {
        draft = state;
    },
    'toggle': (draft, action) => {
        draft.open = !draft.open;
    },
    'updateDocList':(draft, {payload:{docList}}) => {
        draft.docList = docList;
    },

    "createFolder": (draft, { payload: { target } }) => {
        draft.open = true;
        draft.create = {
            target
        };
    },
    "createDoc": (draft, action) => {
    },
    "delete": (draft, action) => {
    },
    "remove": (draft, action) => {
    },
}, {});

//   onMouseUp={(e) => onMouseUp(e, { type: 'folder', dispatch })}
function Main({ toggle, name }) {
    return (
        <ListItem button onClick={toggle}>
            <ListItemIcon>
                <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem>
    )
}
// recursive
function SubList({ list, offset, onDocClick, onMouseUp, ...props }) {
   const {root ,nested } = useStyles(offset);
    return (
        <List component="nav" className={`${root} ${nested}`}>
            {
                list && Object.keys(list).map((key) => {
                    const [state, dispatch] = useReducer(menuItemReducer, {
                        cursor: list[key],
                        open: false,
                    })
                    const toggle = (e) => {
                        dispatch({ type: 'toggle' });
                    }
                    const updateDocList = (docList)=>{
                        //dispatch({type:'updateDocList',payload:{docList}})
                    }

                    const exportDispatch= (e)=>{
                        onMouseUp&onMouseUp(e,dispatch);
                    }
                    return (
                        <div key={state.cursor._id} onMouseUp={exportDispatch} >
                            <Main toggle={toggle} name={state.cursor.name} />
                            <Collapse in={state.open} timeout="auto" unmountOnExit>
                                <SubList offset={offset + 0.5} onMouseUp={onMouseUp}
                                    onDocClick={onDocClick} list={state.cursor.subList}  />
                                <DocList subJectID={state.cursor._id} onLoad={updateDocList}  
                                 onDocClick={onDocClick} />
                                {
                                    state.create && <NewItemInput offset={offset + 0.5} />
                                }
                            </Collapse>
                        </div>
                     )
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
    nested: offset => {
        offset = offset || 0.5;
        return {
            paddingLeft: `${offset}rem`,
        }
    }
}));


export default SubList;
