import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FolderIcon from '@material-ui/icons/Folder';
import { ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core';
import Nest from './Nest';

const propTypes = {
}
const defaultProps = {
}

function SubjectItem({ subject,setDispatch,offset,toggle:propsToggle }) {
    const {name, _id}= subject;
    const [toggle,setToggle] = useState(propsToggle)

    function onClick(e) {
        setToggle(!toggle);
    }
    return (
        <div>
            <ListItem button onClick={onClick}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>

            <Collapse in={toggle} timeout="auto" unmountOnExit>
                <Nest parentSubjectId={_id} offset={offset + 0.5}
                    setDispatch={setDispatch} />
            </Collapse>

        </div>
    )
}

SubjectItem.propTypes = propTypes
SubjectItem.defaultProps = defaultProps;
export default SubjectItem;