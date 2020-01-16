import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Menu from './Menu';
import PropTypes from 'prop-types';
const propTypes={
    menuList: PropTypes.array.isRequired,
    drawerWidth:PropTypes.number,
    sideMenuOpen:PropTypes.bool,
}

const defaultProps= {
    drawerWidth:240,
    sideMenuOpen:false,
}

 function Template({children,...props}) {
    const {drawerWidth,sideMenuOpen,menuList } = props;
    const useStyles = propsStyleMather(props);
    const classes = useStyles();
    return (
    <div className={classes.root}>
         <CssBaseline />
         <Menu sideOpen={sideMenuOpen} list={menuList} drawerWidth={drawerWidth} />

         <main className={clsx(classes.content, {[classes.contentShift]: sideMenuOpen,})}>
            <div className={classes.drawerHeader} />
             {children}
        </main>
    </div>
  );
}

function propsStyleMather({ ...props }) {
    const { drawerWidth } = props;
    return makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection:'row',
            width:'100vw',
            height:'100vh',
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }));
}

Template.defaultProps=defaultProps;
Template.propTypes=propTypes
export default Template;
