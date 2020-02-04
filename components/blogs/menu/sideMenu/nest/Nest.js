import React, { useEffect, useReducer,useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStore , useDispatch } from 'react-redux'
import DocItem from './DocItem'
import { makeStyles, List, Box } from '@material-ui/core';
import SubjectItem from './SubjectItem'
import Vacant from './Vacant'
import stateReducer from './stateReducer'
import NewItemInput from './NewItemInput'
import useLoadMenuData from './useLoadMenuData'
import storeLoad from '../../../../../selector/storeLoad';


const propTypes = {}
const defaultProps = {
    offset: 0.5,
}

const Folders = styled.div`
`

function mkDocs(docs, settingDispatch) {
    const mouseDown = (doc) => {
      return (e)=>{
          settingDispatch(e, { type: 'doc', data: doc })
          e.stopPropagation();
      }
    }
    return (
        docs.map((doc, key) => {
            return (
                <div onMouseDown={mouseDown(doc)} key={key} >
                    <DocItem doc={doc} />
                </div>
            )
        })
    )
}

const Nest = ({ parentSubjectId: psID, offset, setDispatch}) => {
    const { root, nested } = useStyles(offset);
    const globalDispatch = useDispatch();
    const store = useStore();
    const [subjects, docs] = useLoadMenuData(psID);

      const toggleObj = subjects.reduce((acc, item)=>{
        acc[item._id]= false;
        return acc;
      },{})

    const [state, stateDispatch] = useReducer(stateReducer, {
        id: psID,
        target: undefined,
        createInfo: {},
        toggleObj,
        store,
        globalDispatch,
    });

     function toggled(_id){
        stateDispatch({type:'toggle', payload:{_id}});
     }

    function settingDispatch(e, target) {
        console.log('set Dispatch', target)
        stateDispatch({ type: 'setTarget', payload: { ...target } });
        setDispatch(stateDispatch);
        e.stopPropagation();
    }
    function mkNewItemInput(condition) {
        const { message, error } = state.createInfo;

        function newItemCancel() {
            stateDispatch({ type: 'createCancle' });
        }

        function newItemSubmit(e, val) {
             let id = psID;
             // 리팩토링대상..
             if(state.target.type ==='subject')
              id = state.target.data._id;
             const subjects=  storeLoad(store ,`sub@${id}`);
             const docs=  storeLoad(store ,`doc@${id}`);
            stateDispatch({ type: 'createItemSubmit' ,payload:{val,subjects,docs,
                dispatch:stateDispatch,
                parentSubject:id
            } });
        }
        return (
            condition &&
            <NewItemInput onCancel={newItemCancel}
                onSubmit={newItemSubmit}
                message={message} error={error}
                offset={offset} />
        )
    }
    return (
        <List component="nav" className={`${root} ${nested}`} >
            <Box display="flex" flexDirection='column' height='100%' >
                <Folders>
                    {
                        subjects.map((sub, key) => {
                            return (
                                <div onMouseDown={e => settingDispatch(e, { type: 'subject', data: sub })} key={key} >
                                    <SubjectItem subject={sub} onClick= {e=>{toggled(sub._id)}}
                                       toggle={state.toggleObj[sub._id]}
                                    >
                                        <Nest parentSubjectId={sub._id} 
                                             offset={offset + 0.5} setDispatch={setDispatch} />
                                        {mkNewItemInput(state.createInfo.targetId === sub._id)}
                                    </SubjectItem>
                                </div>
                            )
                        })
                    }
                </Folders>
                <Vacant onMouseDown={e => settingDispatch(e, { type: 'vacant', data: {} })}
                    vacant={docs.length == 0 &&subjects.length == 0}>
                    {mkNewItemInput(state.createInfo.targetId==='vacant')}
                    {mkDocs(docs, settingDispatch)}
                </Vacant>
            </Box>
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


Nest.propTypes = propTypes
Nest.defaultProps = defaultProps;
export default Nest;