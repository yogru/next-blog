import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from './menu/index';
import PropTypes from 'prop-types';

const propTypes={
    menuList: PropTypes.object.isRequired,
    sideMenuOpen:PropTypes.bool,
    drawerWidth:PropTypes.number,
}
const defaultProps= {
    sideMenuOpen:false,
    drawerWidth:240,
}
 function Blog({children,...props}) {
    const {sideMenuOpen,menuList ,drawerWidth} = props;
    const {root,content ,contentHeader} =  useStyles(props);
    return (
        <div className={root}>
            <CssBaseline />
            <Menu sideOpen={sideMenuOpen} drawerWidth={drawerWidth} list={menuList} />
            <main className={content}>
                <div className={contentHeader} />
                {children}
            </main>
        </div>
  );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content:(props)=>({
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
         marginLeft:-props.drawerWidth
    }),
}));

Blog.defaultProps=defaultProps;
Blog.propTypes=propTypes
export default Blog;
