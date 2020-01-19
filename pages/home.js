import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAction} from '../actions/load';
import BlogTemplte from '../components/blogs/Template';
import Typography from '@material-ui/core/Typography';
import {selectorMapStateToProps} from '../reducers/loadReducer';
import PostCard from '../components/blogs/PostCard';
import PostCardContainer from '../components/blogs/PostCardContainer';

import QuillEditor from '../components/QuillEditor';

const list={
    title:1,
    subList:[
        {
          title:2,  
          subList:[]
        },
        {
          title:2,  
          subList:[]
        },
        {
          title:3,  
          subList:[{
             title:'zz',  
             subList:[]
           }
          ]
        },
        {
          title:4,  
          subList:[
           {
              title:5,  
              subList:[]
           },
           {
              title:6,  
              subList:[]
           },
           {
              title:7,  
              subList:[]
           }
          ]
        },
    ]
}

const target = 'homeCard';
const url="http://localhost:3000/post/topN/?count=3";

const cardSelector= 
  selectorMapStateToProps(target,["cardData","cardPending"]);

class Home extends Component {
  static async getInitialProps({store}) {
    store.dispatch(createAction(target,url ));
    return {staticData: 'Hello world!'}
  }
  render() {
    console.log('state',this.props);
    return (
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
      <BlogTemplte menuList={list} >
                <QuillEditor />
      </BlogTemplte>
    )
  }
}

export default connect(cardSelector)(Home);
