import React, { useEffect,useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import loadSelector from '../../../../selector/hookLoad';
import { loadAction } from '../../../../actions/load';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import { partActionReducer } from '../../../../reducers/utils';

import {
    makeStyles, ListItem, ListItemText,
    ListItemIcon, Collapse, List
} from '@material-ui/core';

const propTypes = {}
const defaultProps = {
    offset:0.5,
}

const folderItemReducer= partActionReducer({
"toggle":(draft, action)=>{
    draft.toggle =!draft.toggle;
 },
},{})

function Item({onClick, name , Icon}){
    return (
        <ListItem button onClick={onClick}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem>
    )
}

function SubItem({ subject  ,offset }) {
   const [state, dispatch] =useReducer(folderItemReducer,{
       toggle:false,
       subject
   })
    const { toggle,subject:{name ,_id}} = state;
     
    function onClick(e){
        dispatch({ type: 'toggle' });
    }

    return (
        <div>
            <Item name={name} Icon={FolderIcon} onClick ={onClick} />
            {
             toggle &&
              <Collapse in timeout="auto" unmountOnExit>
                 <NestLoad parentSubjectId={_id} offset={offset+0.5} />
               </Collapse>
            }
        </div>
    )
}

const NestLoad = ({ parentSubjectId: psID,offset}) => {
    const docState = `doc@${psID}`;
    const subState = `sub@${psID}`;
    const dispatch = useDispatch();
    const [loadDoc, docPending] = useSelector(loadSelector(docState), [psID]);
    const [loadSubject, subPending] = useSelector(loadSelector(subState), [psID]);

    useEffect(() => {
        console.log('hi..');
      //  dipsatch(loadAction(docState`http://localhost:3000/post/titles/${psID}`));
      console.log(dispatch ,psID,subState)
        dispatch(loadAction(subState,`http://localhost:3000/subject/parent/${psID}`));
    }, [psID]);

    const {root , nested} =useStyles(offset);
    console.log(psID ,loadSubject ,subPending)
    return (
     <List component="nav" className={`${root} ${nested}`}>
          { 
            (subPending!==undefined &&subPending!==true)&&loadSubject.data.map((sub ,key) =>{
              return <SubItem key={key} offset={offset} subject={sub}/>
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


NestLoad.propTypes = propTypes
NestLoad.defaultProps = defaultProps;
export default NestLoad;