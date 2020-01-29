import React, { useEffect } from 'react';
import {
    ListItem, ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { useDispatch, useSelector } from 'react-redux'
import { loadAction } from '../../../../../actions/load'
import loadSelector from '../../../../../selector/hookLoad';


function DocList({ subJectID, onDocClick, onLoad }) {
    const dispatch = useDispatch();
    const docs = `subject@${subJectID}`;
    const [loadDoc, pending] = useSelector(loadSelector(docs), [subJectID]);
    useEffect(() => {
        dispatch(loadAction(docs, `http://localhost:3000/post/titles/${subJectID}`))
    }, [subJectID])
    useEffect(() => {
        loadDoc&&onLoad( loadDoc.data);
    }, [loadDoc])


    return (
        <>{
            loadDoc&& loadDoc.data && Object.keys(loadDoc.data).map((key) => {
                const { _id, title } =  loadDoc.data[key];
                return (
                    <ListItem button key={_id}
                        onClick={() => { onDocClick(_id) }}
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

export default DocList;