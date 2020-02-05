import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStore, useDispatch } from 'react-redux'
import DocItem from './DocItem'
import { makeStyles, List, Box } from '@material-ui/core';
import SubjectItem from './SubjectItem'
import Vacant from './Vacant'
import stateReducer from './stateReducer'
import NewItemInput from './NewItemInput'
import useLoadMenuData from './useLoadMenuData'

const propTypes = {}
const defaultProps = {
    offset: 0.5,
}


function mkDocs(docs, mouseDown) {
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

const Nest = ({ parentSubjectId: psID, offset, setDispatch }) => {
    const { root, nested } = useStyles(offset);
    const globalDispatch = useDispatch();
    const store = useStore();
    const [subjects, docs] = useLoadMenuData(psID);

    const toggleObj = subjects.reduce((acc, item) => {
        acc[item._id] = false;
        return acc;
    }, {})

    const [state, stateDispatch] = useReducer(stateReducer, {
        id: psID,
        target: undefined,
        createInfo: {},
        toggleObj,
        store,
        globalDispatch,
    });

    function toggled(_id) {
        stateDispatch({ type: 'toggle', payload: { _id } });
    }
    function settingDispatch(e, target) {
        console.log('set Dispatch', target)
        stateDispatch({ type: 'setTarget', payload: { ...target } });
        setDispatch(stateDispatch);
        e && e.stopPropagation();
    }
    function mkNewItemInput(condition) {
        const { message, error } = state.createInfo;

        function newItemCancel() {
            stateDispatch({ type: 'createCancle' });
        }

        function newItemSubmit(e, val) {
            let id = psID;
            if (state.target.type === 'subject')
                id = state.target.data._id;
            stateDispatch({
                type: 'validate', payload: {
                    val,
                    dispatch: stateDispatch,
                    parentSubject: id
                }
            });
        }
        return (
            condition &&
            <NewItemInput onCancel={newItemCancel}
                onSubmit={newItemSubmit}
                message={message} error={error}
                offset={offset} />
        )
    }
    function mouseDown(target) {
        return (e) => {
            settingDispatch(e, target);
            e.stopPropagation();
        }
    }

    return (
        <List component="nav" className={`${root} ${nested}`}
            onMouseDown={mouseDown({ type: 'vacant', data: {} })}
        >
            <div>
            {
                subjects.map((sub, key) => {
                    return (
                        <div onMouseDown={mouseDown({ type: 'subject', data: sub })} key={key} >
                            <SubjectItem subject={sub} onClick={e => { toggled(sub._id) }}
                                toggle={state.toggleObj[sub._id]}
                            >
                                {mkNewItemInput(state.createInfo.targetId === sub._id)}
                                <Nest parentSubjectId={sub._id}
                                    offset={offset + 0.5} setDispatch={setDispatch} />
                            </SubjectItem>
                        </div>
                    )
                })
            }
            </div>
            {mkNewItemInput(state.createInfo.targetId === 'vacant')}
            {mkDocs(docs, mouseDown)}
            {/* <Vacant
                vacant={docs.length == 0 && subjects.length == 0} /> */}
        </List>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        marginBottom:"0px !important",
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