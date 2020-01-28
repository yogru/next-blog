import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadAction} from '../actions/load';
import Typography from '@material-ui/core/Typography';
import PostCard from '../components/blogs/PostCard';
import PostCardContainer from '../components/blogs/PostCardContainer';
import BlogTemplte from '../components/blogs';
import mergeMapStateToProps from '../selector/mergeMapStateToProps'
import loadSelector from '../selector/connectLoad'
import Loading from '../components/Loading';
import PostView from '../components/blogs/PostView';

const homeCard = 'homeCard';
const cardURL="http://localhost:3000/post/topN/?count=3";

const homeMenuList = 'homeMenuList';
const menuURL='http://localhost:3000/subject';

const mapStateToProps = mergeMapStateToProps([
  loadSelector(homeCard,["cardData","cardPending"]),
  loadSelector(homeMenuList,["loadMenuList","listPending"]),
  loadSelector('post',["curPost","postPending"]),
])

class Home extends Component {
  static async getInitialProps({store}) {
    // store.dispatch(loadAction(homeCard,cardURL));
     store.dispatch(loadAction(homeMenuList,menuURL));
    return {staticData: 'Hello world!'}
  }
  render() {
    const { loadMenuList,curPost }  =  this.props;
    let {data:menuList,success:menuSuc}= loadMenuList;
    menuList =(menuSuc&& menuList)||{};

    // let { menuList ,curPost,
    //   cardData,cardPending,listPending} = this.props;
     
     console.log(menuList);

    return (
    <BlogTemplte menuList={menuList} >
          {
              curPost ? <PostView  post = {curPost.data.post} />:
                           <div> unload post </div>
          }
    </BlogTemplte>

        // <BlogTemplte menuList={menuList} >
        //   {
        //     curPost ? <PostView  post = {curPost.data.post} />:
        //     <Loading  loading ={cardPending}>
        //         card load..
        //     </Loading>
        //   }
        // </BlogTemplte>
    )
  }
}

export default connect(mapStateToProps)(Home);


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
