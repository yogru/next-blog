import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles, Box, ListItem, List, ListItemText } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const propTypes = {
    list: PropTypes.array.isRequired,
    pageOfCount: PropTypes.number,
}
const defaultProps = {
    pageOfCount: 13,
}

const SingleList = ({ list, pageOfCount, onItemClick, ...props }) => {
    // const [curPageIdx, setPageIdx] = useState(1);
    const { pageBox, listSty, leftArrowBtn,
        pageLeftArrow, pageRightArrow } = useStyles();

    // function next(plus) {
    //     const cirPageNum = createCircleNum(getMaxPageCount(list, pageOfCount))
    //     setPageIdx(cirPageNum(curPageIdx - 1, plus) + 1);
    // }
    // const itemArr = createPageOfIndex(Object.keys(list), pageOfCount)(curPageIdx);
    // const items = itemArr&&itemArr.map((title, key) => {
    //     return (
    //         <ListItem key={key} button onClick={e => { onItemClick(e, title) }}>
    //             <ListItemText primary={title} />
    //         </ListItem>
    //     )
    // })
    const items = list.map((subject, key) => {
        const { name } = subject;
        console.log(subject);
        return (
            <ListItem key={key} button onClick={e => { onItemClick(e, subject) }}>
                <ListItemText primary={name} />
            </ListItem>
        )
    })
    return (
        <>
            <List component="nav" className={listSty}>
                {items}
            </List>

            {/* <Box className={pageBox} >
                <IconButton color='primary' className={leftArrowBtn} onClick={e => next(-1)} >
                    <ChevronLeftIcon className={pageLeftArrow} />
                </IconButton>
                <IconButton color='primary' onClick={e => next(+1)} >
                    <ChevronRightIcon className={pageRightArrow} />
                </IconButton>
            </Box> */}
        </>
    );
}

const useStyles = makeStyles(theme => ({
    listSty: {
        width: '100%',
        maxWidth: 240,
        backgroundColor: theme.palette.background.paper,
    },
    leftArrowBtn: {
        marginRight: 'auto',
    },
    pageLeftArrow: {
        marginLeft: '1rem',
        marginRight: '2rem',
    },
    pageRightArrow: {
        marginLeft: '2rem',
        marginRight: '1rem',
    },
    pageBox: {
        display: 'flex',
        marginTop: 'auto',
    },
}));

SingleList.propTypes = propTypes
SingleList.defaultProps = defaultProps;
export default SingleList;

//utils.. paging , 다른곳에서도 필요하면 
// 전역 유틸로 넣어야겠다.
// rest 페이징 요청하는 쓰는 코드랑 중복될거같은데. 통합하면 좋을듯.
// 나중에 통합해야될듯.


// function createCircleNum(cycleMax) {
//     return (cur, plus) => {
//         let nextIdx = cur + plus;
//         nextIdx %= cycleMax;
//         if (nextIdx < 0) nextIdx += cycleMax;
//         return nextIdx;
//     }
// }
// function createPageOfIndex(arr, pageOfCount) {
//     return (idx) => {
//         const ret = [];
//         const sidx = (idx - 1) * pageOfCount;
//         for (let i = sidx; i < sidx + pageOfCount; i++) {
//             if (!arr[i]) break;
//             ret.push(arr[i]);
//         }
//         return ret;
//     }
// }
// function getMaxPageCount(obj, pageOfCount) {
//     return Math.ceil((Object.keys(obj).length / pageOfCount));
// }