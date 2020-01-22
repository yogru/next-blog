import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadAction} from '../actions/load';
import BlogTemplte from '../components/blogs';
import QuillEditor from '../components/QuillEditor';
import mergeMapStateToProps from '../selector/mergeMapStateToProps'
import loadSelector from '../selector/load'


const homeMenuList = 'homeMenuList';
const menuURL='http://localhost:3000/post/subject';

const mapStateToProps = mergeMapStateToProps([
  loadSelector(homeMenuList,["menuList","listPending"]),
  loadSelector('post',["curPost","postPending"]),
])

class Write extends Component {
  static async getInitialProps({store}) {
     store.dispatch(loadAction(homeMenuList,menuURL));
    return {staticData: 'Hello world!'}
  }
  render() {
    console.log('props:',this.props);
    let { menuList ,curPost,listPending} = this.props;
    let categoryList;

    if(menuList&&menuList.success){
        menuList = mkstructedList(menuList.data.subjects);
       categoryList = getCategoryList(menuList);
    }
    return (
      <BlogTemplte menuList={menuList} >
          <QuillEditor categoryList = {categoryList} />
      </BlogTemplte>
    )
  }
}
export default connect(mapStateToProps)(Write);

function getCategoryList(menuList,cursor=[]){
  for(let key of Object.keys(menuList) ){
     if(menuList[key].idList.length >=2){
       cursor.push({category:menuList[key].title,subCategory:[]});
       getCategoryList(menuList[key].subList,cursor[cursor.length-1].subCategory);
     }
  }
  return cursor;
}

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
