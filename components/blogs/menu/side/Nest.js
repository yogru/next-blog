import React, { useEffect, useState,useReducer } from 'react';
import {
    makeStyles, ListItem, ListItemText,
    ListItemIcon, Collapse, List ,TextField
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import { loadAction } from '../../../../actions/load'
import loadSelector from '../../../../selector/hookLoad';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import {partActionReducer} from '../../../../reducers/utils';
import NewItemInput from './NewItemInput'

const propTypes = {
    list: PropTypes.object.isRequired,
    onMouseUp: PropTypes.func,
}
const defaultProps = {
    onItemClick: (docID) => {
        console.log(docID);
    }
}

const menuItemReducer= partActionReducer({
    "init":(draft,{ payload:{ state } })=>{
        draft = state;
    },
    'toggle':(draft,action)=>{
        draft.open = !draft.open;
    },
    "createFolder":(draft, {payload:{target}})=>{
        draft.open=true;
        draft.create = {
            target
        }; 
    },
    "createDoc":(draft, action)=>{
    },
    "delete":(draft, action)=>{
    },
    "remove":(draft, action)=>{
    },
},{});

// recursive
function SubList({ list, offset, handleClose, onDocClick, onMouseUp, ...props }) {
    return (
        <>{
            list && Object.keys(list).map((key) => {
                const [state, dispatch] = useReducer(menuItemReducer ,{
                    cursor:list[key],
                    open:false,
                })
                const toggle = (e) => {
                    dispatch({type:'toggle'});
                    e.stopPropagation();
                }
                const dispatchSaga = useDispatch();
                const docName = `mainSubject@${props.offset}@${list.name}`;

                const [loadDocs, pending] = useSelector(loadSelector(docName), []);
                useEffect(() => {
                    dispatch(loadAction(docName, `http://localhost:3000/post/titles/${list._id}`))
                }, [list])

                return (
                <div key={state.cursor._id}>
                    <ListItem button onClick={toggle}
                        onMouseUp={(e)=>onMouseUp(e, { type:'folder',dispatch})} >
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={state.cursor.name} />
                    </ListItem>
                    <Collapse in={state.open} timeout="auto" unmountOnExit>
                        <NestList offset={offset + 0.5} onMouseUp={onMouseUp}
                            onDocClick={onDocClick} list={state.cursor} handleClose={handleClose} />
                    
                       <DocList loadDocList={loadDocs && loadDocs.data}
                          cursor={props.list} onDocClick={onDocClick}
                          onMouseUp={props.onMouseUp}
                        />
                   
                    {
                        state.create && <NewItemInput  offset={offset + 0.5} />
                    }
                    </Collapse>
                </div>)
            })
        }
        </>
    );
}

function DocList({ loadDocList, cursor:cur, onDocClick, onMouseUp }) {
    return (
        <>{
            loadDocList && Object.keys(loadDocList).map((key) => {
                const [cursor,setCursor]=useState(cur);
                const { _id, title } = loadDocList[key];
                const mousUpObj = {
                    type: 'doc',
                    docID:_id,
                    docTitle:title,
                    cursor,
                    setCursor
                }
                return (
                    <ListItem button key={key} onClick={() => { onDocClick(_id) }}
                        onMouseUp={(e) => { onMouseUp(e, mousUpObj) }}
                    >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                )
            })
        }
        </>
    )
}


function NestList({ children, ...props }) {
    const classes = useStyles(props.offset);
    const { list, handleClose, onDocClick } = props;
    // const dispatch = useDispatch();
    // const docName = `mainSubject@${props.offset}@${list.name}`;
    // const [loadDocs, pending] = useSelector(loadSelector(docName), []);
    // useEffect(() => {
    //     dispatch(loadAction(docName, `http://localhost:3000/post/titles/${list._id}`))
    // }, [list])

    return (
        <List component="nav" aria-labelledby="nested-list-subheader"
            className={`${classes.root} ${classes.nested}`}
        >
            <SubList offset={0.5} onMouseUp={props.onMouseUp} 
                onDocClick={onDocClick} handleClose={handleClose} list={props.list} />

            {/* <DocList loadDocList={loadDocs && loadDocs.data}
                cursor={props.list} onDocClick={onDocClick}
                onMouseUp={props.onMouseUp}
            /> */}

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

NestList.propTypes = propTypes
NestList.defaultProps = defaultProps;
export default NestList;

