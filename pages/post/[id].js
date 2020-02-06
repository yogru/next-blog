import {Component} from 'react'
import BlogTemplte from '../../components/blogs';
import { loadAction } from '../../actions/load';
import mergeMapStateToProps from '../../selector/mergeMapStateToProps'
import loadSelector from '../../selector/connectLoad'
import PostView from '../../components/blogs/PostView';

import { connect } from 'react-redux'

const mapStateToProps = mergeMapStateToProps([
  loadSelector('post', ["post", "postPending"]),
])

class Post extends Component{
  static async getInitialProps({store , query}) {
     console.log('initial..',store ,query );
    store.dispatch(loadAction('menuList',"http://localhost:3000/rest/subject/parent/null"));
    store.dispatch(loadAction('post', `http://localhost:3000/rest/post/${query.id}`));
    return {
          mode: query.mode || 'view'
     }

 }
 render() {
     const {mode  , post ,postPending } = this.props;
     console.log(mode ,post ,postPending );

  return(
    <BlogTemplte>
      { 
       !postPending? 
          mode==='view'? 
            <PostView  post = {post.data.doc} /> :
            "edit mode":
        "loading"    
      }
    </BlogTemplte>
  )

 }

}
export default connect(mapStateToProps)(Post);
/////////////
/*

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAction } from '../actions/load';
import BlogTemplte from '../components/blogs';
import mergeMapStateToProps from '../selector/mergeMapStateToProps'
import loadSelector from '../selector/connectLoad'
import PostView from '../components/blogs/PostView';

const homeCard = 'homeCard';
const cardURL = "http://localhost:3000/rest/post/topN/?count=3";

const mapStateToProps = mergeMapStateToProps([
  loadSelector('post', ["curPost", "postPending"]),
])

class Home extends Component {
  static async getInitialProps({ store }) {
     store.dispatch(loadAction('menuList',"http://localhost:3000/rest/subject/parent/null"));
    //store.dispatch(loadAction(homeCard, cardURL));
    return { staticData: 'Hello world!' }
  }
  render() {
    // let { data: menuList, success: menuSuc } = loadMenuList;
    // menuList = (menuSuc && menuList) || {};
    // // let { menuList ,curPost,
    // //   cardData,cardPending,listPending} = this.props;
    // console.log(menuList);
    const {postPending  , curPost} = this.props;

    return (
     <BlogTemplte >
           {
              (postPending!==undefined&&!postPending)
                &&<PostView  post = {curPost.data.doc} />
           }
     </BlogTemplte >
    )
  }
}

export default connect(mapStateToProps)(Home);

      // <BlogTemplte menuList={list} >
      //           <QuillEditor />
      // </BlogTemplte>
*/