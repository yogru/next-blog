import PropTypes from 'prop-types';
import DescriptionIcon from '@material-ui/icons/Description';
import {
    ListItem, ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import Link from "next/link";

const propTypes = {
    setDispatch: PropTypes.func,
}

const defaultProps = {
}

function DocItem({ doc }) {
    const { title, _id,edit } = doc;
    const as = `/post/${_id}?mode=${edit?'edit':'view'}`;
    return (
        <Link href={`/post/[id]`} as={as}>
            <ListItem button >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
        </Link>
    )
}

DocItem.defaultProps = defaultProps;
DocItem.propTypes = propTypes
export default DocItem;
