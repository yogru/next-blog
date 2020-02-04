import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FolderIcon from '@material-ui/icons/Folder';
import { ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core';
import Nest from './Nest';
import DocItem from './DocItem';


const propTypes = {
}
const defaultProps = {
}

function SubjectItem({ children,subject,onClick,toggle }) {
    const {name, _id}= subject;
    return (
        <div>
            <ListItem button onClick={onClick}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
            {
               toggle &&
               <Collapse in timeout="auto" unmountOnExit>
                   {children}
               </Collapse>
            }
        </div>
    )
}

SubjectItem.propTypes = propTypes
SubjectItem.defaultProps = defaultProps;
export default SubjectItem;