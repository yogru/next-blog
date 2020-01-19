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
                const _webpack = require('webpack');
                con.plugins = con.plugins || []
                con.plugins.push(
                      new _webpack.ProvidePlugin({'window.Quill': 'quill'})
               )   
               //quill-image-resize-module
               con.plugins.push(
                     new _webpack.ProvidePlugin({'window.quill_image_resize_module': 'quill-image-resize-module'})
                 )
           //quill-image-upload
            con.plugins.push(
                  new _webpack.ProvidePlugin({'window.quill_image_upload': 'quill-image-upload'})
              )

            return con;
      }
};
