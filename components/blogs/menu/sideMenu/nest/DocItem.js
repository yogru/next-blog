import PropTypes from 'prop-types';
import { useReducer } from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
import {
    ListItem, ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadAction } from '../../../../../actions/load';
import Link from "next/link";


const propTypes = {
    setDispatch: PropTypes.func,
}

const defaultProps = {
}

function DocItem({ doc }) {
    const { title, _id } = doc;
    const dispatch = useDispatch();
    function onClick() {
        dispatch(loadAction('post', `http://localhost:3000/rest/post/${_id}`));
        /*
          <div>
    <Link href={`/p/[profile]`} as={`/p/${props.profile}?mode=${}`}>
      <a>Go to {props.profile}'s profile</a>
    </Link>
    </div>
        */
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

DocItem.defaultProps = defaultProps;
DocItem.propTypes = propTypes
export default DocItem;
