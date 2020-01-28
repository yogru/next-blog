import React, { useEffect, useState } from 'react';
import { makeStyles, ListItem, ListItemText, 
    ListItemIcon,Collapse, List
 } from '@material-ui/core';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import { loadAction } from '../../../../actions/load'
import loadSelector from '../../../../selector/hookLoad';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';

const propTypes = {
    list: PropTypes.object.isRequired,
}
const defaultProps = {
    onItemClick: (docID) => {
        console.log(docID);
    }
}

function NestList({ children, ...props }) {
    const classes = useStyles(props.offset);
    const { list, handleClose, onItemClick } = props;
    const dispatch = useDispatch();
    const docName = `mainSubject@${props.offset}@${list.name}`;
    const [loadTitles, pending] = useSelector(loadSelector(docName), []);

    useEffect(() => {
        dispatch(loadAction(docName, `http://localhost:3000/post/titles/${list._id}`))
    }, [list])

    return (
        <List component="nav" aria-labelledby="nested-list-subheader"
            className={`${classes.root} ${classes.nested}`}
        >
            { // recursive 
             list&&list.subList&&Object.keys(list.subList).map((key, idx) => {
                    const list = props.list.subList[key];
                    const [open, SetOpen] = useState(props.open);
                    const handleClick = (e) => {
                        SetOpen(!open);
                        e.stopPropagation();
                    }
                    return (
                        <div  key = { list._id}>
                            <ListItem button onClick={handleClick} >
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary={list.name} />
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <NestList offset={props.offset+0.5} onItemClick={onItemClick} list={list} handleClose={handleClose} />
                            </Collapse>
                        </div>
                    )
                })
            }
            { // doc
                loadTitles && loadTitles.data && Object.keys(loadTitles.data).map((key) => {
                    const { _id, title } = loadTitles.data[key];
                    return (
                        <ListItem button key={key} onClick={() => { onItemClick(_id) }}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
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

NestList.propTypes = propTypes
NestList.defaultProps = defaultProps;
export default NestList;