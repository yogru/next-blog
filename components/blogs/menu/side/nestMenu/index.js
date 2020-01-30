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
    'cancelCreate':(draft ,action)=>{
        draft.create= undefined;
    },
    "createFolder": (draft, { payload: { type } }) => {
        draft.open = true;
        draft.create = {
            type
        };
    },
    "createFolderOnServer":(draft, { payload: { type } }) => {
        draft.open = true;
        draft.create = {
            type
        };
    },
    "newItemInputError":(draft , {payload:{message}})=>{
        draft.create['message'] = message;
        draft.create['error'] = true;
    },
    "createDoc": (draft, action) => {
    },
    "delete": (draft, action) => {
    },
    "remove": (draft, action) => {
    },
}, {});

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
                         dispatch({type:'updateDocList',payload:{docList}})
                    }
                    const exportDispatch= (e)=>{
                        onMouseUp&onMouseUp(e,dispatch);
                    }
                   // onChange,onSubmit,onCancel
                    const newItemSubmit = (e,value)=>{
                      const {cursor, create:{type}} =state;

                      if(type ==='folder'){
                       const names= Object.keys(cursor.subList).reduce((acc,key)=>{
                            if(cursor.subList[key] && cursor.subList[key].name)
                            acc.push(cursor.subList[key].name)
                           return acc;
                        },[cursor.name]);

                       const exisistName= names.reduce((acc,name)=>{
                             if(value === name)return true;
                              return acc;
                        },false)
                         
                        if(exisistName){
                            dispatch({type:'newItemInputError',
                             payload:{message:`이미 존재하는 파일명`}});         
                            return;
                        }

                      }
                    }

                    const newItemCancel = ()=>{
                        dispatch({type:'cancelCreate'});
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
                                    state.create && 
                                    <NewItemInput  onCancel={newItemCancel}  onSubmit ={newItemSubmit} 
                                     message={  state.create.message} error={state.create.error}
                                    offset={offset + 0.5} />
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
