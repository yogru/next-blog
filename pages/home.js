import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAction,PENDING ,END,LOAD} from '../actions/load';
import BlogTemplte from '../components/blogs/Template';
import Typography from '@material-ui/core/Typography';

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
const url="http://localhost:3000/post/topN/?count=1";

function mapStateToProps(reduxState,componentProps){
    return {
      pending: reduxState['load'][PENDING][target],
      cardData:reduxState['load'][END][target],
    }
}

class Home extends Component {
  static async getInitialProps({store}) {
    store.dispatch(createAction(target,url ));
    console.log('hihihihi.',store, store.getState())
    return {staticData: 'Hello world!'}
  }
  render() {
    console.log('state',this.props);
    return (
        <BlogTemplte menuList={list} >
           <Typography paragraph>
               "hi..?"
            </Typography>
        <div>{this.props.staticData}</div>
      </BlogTemplte>
    )
  }
}

export default connect(mapStateToProps)(Home);
