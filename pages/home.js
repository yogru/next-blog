import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadAction} from '../actions/load';
import Typography from '@material-ui/core/Typography';
import {selectorMapStateToProps} from '../reducers/loadReducer';
import PostCard from '../components/blogs/PostCard';
import PostCardContainer from '../components/blogs/PostCardContainer';
import BlogTemplte from '../components/blogs';
import QuillEditor from '../components/QuillEditor';
import mergeMapStateToProps from '../selector/mergeMapStateToProps'
import loadSelector from '../selector/load'
import Loading from '../components/Loading';

const homeCard = 'homeCard';
const cardURL="http://localhost:3000/post/topN/?count=3";

const homeMenuList = 'homeMenuList';
const menuURL='http://localhost:3000/post/subject';

const mapStateToProps = mergeMapStateToProps([
  loadSelector(homeCard,["cardData","cardPending"]),
  loadSelector(homeMenuList,["menuList","listPending"])
])

class Home extends Component {
  static async getInitialProps({store}) {
     store.dispatch(loadAction(homeCard,cardURL));
     store.dispatch(loadAction(homeMenuList,menuURL));
    return {staticData: 'Hello world!'}
  }
  render() {
    console.log('state',this.props);
    let { menuList , cardData ,cardPending,listPending } = this.props;
    
    if(menuList&&menuList.success){
        menuList = mkstructedList(menuList.data.subjects)
      console.log(menuList)
    }

    return (
      <Loading loading={listPending }>
        <BlogTemplte menuList={menuList} >
           <Loading  loading ={cardPending}>
                     card load..
           </Loading>
        </BlogTemplte>
      </Loading>
    )
  }
}

export default connect(mapStateToProps)(Home);


function mkstructedList(subjects){
  let ret ={};
  for(let items of subjects ){
    let cursor = ret;
     for(let item of  mkList(items) ){
         const {title,id} = item;
         if(!cursor[title]){
          cursor[title] ={
            title,
            idList:[id,],
            subList:{},
          }
         }else{
            cursor[title].idList.push(id);
         }
         cursor =cursor[title].subList;
       }
  }
  return ret;
}

function mkList(subObject){
 const {subjects , _id} =subObject;
 const mapping = subjects.map((obj ,key)=>{
    return{ 
         title:obj,
         id:_id,
      }
})
 return mapping
}



      // <BlogTemplte menuList={list} >
      //   <h2 align='center' style={{color:'gray'} }> 
      //     최근 작성 포스트  
      //   </h2>
      //   <PostCardContainer >
      //       <PostCard />
      //       <PostCard />
      //       <PostCard />
      //   </PostCardContainer>
      // </BlogTemplte>

      // <BlogTemplte menuList={list} >
      //           <QuillEditor />
      // </BlogTemplte>


// const list={
//     title:1,
//     subList:[
//         {
//           title:2,  
//           subList:[]
//         },
//         {
//           title:2,  
//           subList:[]
//         },
//         {
//           title:3,  
//           subList:[{
//              title:'zz',  
//              subList:[]
//            }
//           ]
//         },
//         {
//           title:4,  
//           subList:[
//            {
//               title:5,  
//               subList:[]
//            },
//            {
//               title:6,  
//               subList:[]
//            },
//            {
//               title:7,  
//               subList:[]
//            }
//           ]
//         },
//     ]
// }