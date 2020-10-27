let AppStyles = (theme) => {
   // console.log(theme);
   return (
      ({
         root: {
            margin: 0,
            background:theme.palette.background.default
         },
         imageContainer: {
            // padding: theme.spacing(2),
            // margin: theme.spacing(2)
         },
         '@global':{
            'body':{
               margin:0
            }
         }
      })
   )
};

export default AppStyles;