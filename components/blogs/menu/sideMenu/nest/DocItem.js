import PropTypes from 'prop-types';
import {useReducer} from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
import {
    ListItem, ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {loadAction} from '../../../../../actions/load';

const propTypes = {
    setDispatch:PropTypes.func,
}

const defaultProps = {
}

function DocItem({doc,subjectId,name }){
    const {title ,_id} = doc;
    const dispatch = useDispatch();
    function onClick(){
        dispatch(loadAction('post',`http://localhost:3000/post/${_id}`))
    }

    return (
        <ListItem button onClick={onClick}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={title} />
        </ListItem>
    )
}

DocItem.defaultProps=defaultProps;
DocItem.propTypes=propTypes
export default DocItem;
