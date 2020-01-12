module.exports = {
      webpack: (con) =>{
        con.module.rules.push({
                      test:/.(png|jpg)$/,
                      use:[{
                            loader:'file-loader',
                            options:{
                                 name:'[path][name].[ext]?[hash]',
                                 emitFile:false ,
                                 publicPath:'/',
                            }
                      }]
                })      
            return con;
      }
};
