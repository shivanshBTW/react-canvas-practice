import testImage from './testImage.jpeg'

let AppStyles = (theme) => {
   // console.log(theme);
   return (
      ({
         root: {
            // width:'calc(100vw - 2px)',
            // height:'calc(100vh - 2px)',
            // border:'1px solid black',
            // margin: 0,
            // background:`url('${"http://192.168.0.151:3000/frame/5/18/5_18_4278.jpg"}') no-repeat center center fixed`,
            // backgroundRepeat:'no-repeat',
            // backgroundSize:'100% 100%',
            padding:'10px',
         },
         canvasContainer:{
            width:'100%',
            height:'100%',
            overflow:'hidden'

         },
         imageContainer: {
            // padding: theme.spacing(2),
            // margin: theme.spacing(2)
         },
         canvas:{
            border:'1px solid blue',
            // background:'red',
            background:`url('${"http://192.168.0.151:3000/frame/5/18/5_18_4278.jpg"}')`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 100%',
         },
         '@global':{
            'body':{
               // margin:0
            }
         }
      })
   )
};

export default AppStyles;