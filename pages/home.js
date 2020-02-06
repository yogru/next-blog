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
const cardURL = "http://localhost:3000/rest/post/topN/?count=3";

const mapStateToProps = mergeMapStateToProps([
  //loadSelector(homeCard, ["cardData", "cardPending"]),
 //loadSelector(homeMenuList, ["loadMenuList", "listPending"]),
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
       home 이지롱~
           {/* {
              (postPending!==undefined&&!postPending)
                &&<PostView  post = {curPost.data.doc} />
           } */}
     </BlogTemplte >
    )
  }
}

export default connect(mapStateToProps)(Home);

      // <BlogTemplte menuList={list} >
      //           <QuillEditor />
      // </BlogTemplte>
