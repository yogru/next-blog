import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import loadSelector from '../../../../../selector/hookLoad';
import { loadAction } from '../../../../../actions/load';
import DocItem from './DocItem'
import { makeStyles, List, Box } from '@material-ui/core';
import SubjectItem from './SubjectItem'
import Vacant from './Vacant'
import stateReducer from './stateReducer'

const propTypes = {}
const defaultProps = {
    offset: 0.5,
}

const Folders = styled.div`
`
const Docs = styled.div`
`

const Nest = ({ parentSubjectId: psID, offset, setDispatch }) => {
    const docState = `doc@${psID}`;
    const subState = `sub@${psID}`;
    const dispatch = useDispatch();
    const [loadDoc, docPending] = useSelector(loadSelector(docState), [psID]);
    const [loadSubject, subPending] = useSelector(loadSelector(subState), [psID]);
    const [state, stateDispatch] = useReducer(stateReducer ,{
         id:psID,
         docs:[],
         subjects:[],
     })

    useEffect(() => {
        dispatch(loadAction(docState, `http://localhost:3000/post/titles/${psID}`));
        dispatch(loadAction(subState, `http://localhost:3000/subject/parent/${psID}`));
    }, [psID]);

    useEffect(() => {
        if(!docPending)
          stateDispatch({type:'updateDocs', payload:{ docs:loadDoc.data} });
    },[docPending])
    useEffect(() => {
        if(!subPending)
        stateDispatch({type:'updateSubjects', payload:{ subjects:loadSubject.data} });
    },[subPending])

    const { root, nested } = useStyles(offset);

    function settingDispatch(e){
        console.log('setDispatch',psID)
        setDispatch(stateDispatch);
        e.stopPropagation();
    }

    return (
        <List component="nav" className={`${root} ${nested}`}  onMouseUp={setDispatch} >
            <Box display="flex" flexDirection='column' height='100%' >
                <Folders>
                    {
                        !subPending &&
                        loadSubject.data.map((sub, key) => {
                            return(
                               <div onMouseDown={settingDispatch} key={key}  >
                                 <SubjectItem 
                                 setDispatch={setDispatch}
                                 offset={offset} subject={sub} />
                               </div>
                            )
                        })
                    }
                </Folders>
                <Docs>
                    {
                        !docPending &&
                        loadDoc.data.map((doc, key) => {
                            return (
                                <div onMouseDown={settingDispatch} key={key} >
                                   <DocItem doc={doc}/>
                                </div>
                            )
                        })
                    }
                </Docs>

                <Vacant
                    setDispatch={setDispatch}
                    subjectId={psID}
                     vacant={!docPending && !subPending &&
                        loadDoc.data.length === 0 &&
                        loadSubject.data.length === 0}
                />

                   {/* {
                state.create &&
                <NewItemInput onCancel={newItemCancel} onSubmit={newItemSubmit}
                    message={state.create.message} error={state.create.error}
                    offset={offset + 0.5} />
               } */}
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