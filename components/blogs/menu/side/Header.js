import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,Button,IconButton} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const propTypes = {
    title:PropTypes.string,
    onClose:PropTypes.func,
    onTitleClick:PropTypes.func,
}
const defaultProps = {
    title:'kyb-blog'
}

const Header = ({ title,onClose,onTitleClick, ...props }) => {
    const {containerSty , titleBtnSty } = useStyles();
    return (
        <div className={containerSty}>
            <Button className={titleBtnSty} onClick={onTitleClick}>
                    {title}
            </Button>
            <IconButton onClick={onClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    containerSty: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    titleBtnSty: {
      marginLeft:'auto',
      marginRight: 'auto',
      fontSize: '1.5rem',
      fontWeight:'400',
    }
}));
  
Header.propTypes = propTypes
Header.defaultProps = defaultProps;
export default Header;
