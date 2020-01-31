import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAction } from '../actions/load';
import Typography from '@material-ui/core/Typography';
import PostCard from '../components/blogs/PostCard';
import PostCardContainer from '../components/blogs/PostCardContainer';
import BlogTemplte from '../components/blogs';
import mergeMapStateToProps from '../selector/mergeMapStateToProps'
import loadSelector from '../selector/connectLoad'
import Loading from '../components/Loading';
import PostView from '../components/blogs/PostView';


const homeCard = 'homeCard';
const cardURL = "http://localhost:3000/post/topN/?count=3";

const mapStateToProps = mergeMapStateToProps([
  //loadSelector(homeCard, ["cardData", "cardPending"]),
 //loadSelector(homeMenuList, ["loadMenuList", "listPending"]),
  loadSelector('post', ["curPost", "postPending"]),
])

class Home extends Component {
  static async getInitialProps({ store }) {
     store.dispatch(loadAction('menuList',"http://localhost:3000/subject/parent/null"));
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
           {/* {
               curPost ? <PostView  post = {curPost.data.post} />:
                           <div> unload post </div>
           } */}
     </BlogTemplte >
    )
  }
}

export default connect(mapStateToProps)(Home);

      // <BlogTemplte menuList={list} >
      //           <QuillEditor />
      // </BlogTemplte>
