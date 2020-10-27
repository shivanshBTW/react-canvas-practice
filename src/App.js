import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import AppStyles from "./AppStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const darkTheme = createMuiTheme({
   palette: {
      type: 'dark',
      primary: {
         contrastText: "rgba(0, 0, 0, 0.87)",
         dark: "rgb(100, 141, 174)",
         light: "rgb(166, 212, 250)",
         main: "#90caf9"
      },
   },
   typography: {
      fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`
   }
});

let styles = AppStyles;


// let canvasDimensions = {
//    height: window.innerHeight,
//    width: window.innerWidth
// }

class App extends Component {
   constructor(props) {
      super(props);
      this.canvasContainerRef = React.createRef();
      this.canvasRef = React.createRef();
      this.state = {
         lineArray: [],
         canvasDimensions: {
            height: 0,
            width: 0
         }
      }
   }

   componentDidMount = () => {
      // this.drawImage();
      this.startDrawing();

      // console.log(this.canvasContainerRef.current.offsetWidth);
   }

   componentDidUpdate = (prevProps, prevState) => {
      if (prevState.lineArray !== this.state.lineArray) {
         // this.drawImage()
         this.updateCanvas();
      }
   }


   drawImage = () => {
      let {canvasDimensions} = this.state;
      let ctx = this.canvasRef.current.getContext('2d');
      let imageObj1 = new Image();
      imageObj1.src = 'http://192.168.0.151:3000/frame/5/18/5_18_4278.jpg';
      // imageObj1.setAttribute('','')
      //
      imageObj1.onload = () => {
         // this.canvasRef.current.height = canvasDimensions.height;
         // this.canvasRef.current.width = canvasDimensions.width;
         ctx.drawImage(imageObj1, 0, 0, canvasDimensions.width, canvasDimensions.height);
      };
      // this.startDrawing()

   };

   startDrawing = () => {
      // let ctx = this.canvasRef.current.getContext('2d');
      // this.canvasRef.current.width = canvasDimensions.width;
      // this.canvasRef.current.height = canvasDimensions.height;
      this.updateDimensions();
      this.canvasRef.current.addEventListener("mousedown", this.addNewPoint);
      window.addEventListener('resize', this.updateDimensions)
      // this.canvasRef.addEventListener("mouseup",);
      // this.canvasRef.addEventListener("mouseout",);
   }

   addNewPoint = (e) => {
      console.log(e);
      let ctx = this.canvasRef.current.getContext('2d');
      if (this.state.lineArray.length < 4) {
         this.setState({
            lineArray: [...this.state.lineArray, {
               x: e.offsetX,
               y: e.offsetY,
               canvasWidth: this.state.canvasDimensions.width,
               canvasHeight: this.state.canvasDimensions.height,
            }]
         })
      }

      // ctx.beginPath();
      // ctx.strokeStyle = 'red'
      // ctx.moveTo(100, 100)
      // ctx.lineTo(200, 100)
      // ctx.stroke();
   }

   updateDimensions = () => {
      let width = this.canvasContainerRef.current.offsetWidth
      let height = width * 3 / 4
      console.log('h', width);
      console.log('w', width);
      this.canvasRef.current.width = width
      this.canvasRef.current.height = height
      this.setState({canvasDimensions: {width, height}});

      this.updateCanvas();
   }

   updateCanvas = () => {
      let {lineArray, canvasDimensions} = this.state;
      let ctx = this.canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height)

      // let imageObj1 = new Image();
      // imageObj1.src = 'http://192.168.0.151:3000/frame/5/18/5_18_4278.jpg';
      // imageObj1.onload = () => {
      //    ctx.drawImage(imageObj1, 0, 0, canvasDimensions.width, canvasDimensions.height);

         ctx.beginPath();
         ctx.strokeStyle = 'red'

         if (lineArray.length) {
            ctx.moveTo(lineArray[0].x / lineArray[0].canvasWidth * this.state.canvasDimensions.width, lineArray[0].y / lineArray[0].canvasHeight * this.state.canvasDimensions.height)
         }
         lineArray.map((lineObj, index) => {
            ctx.lineTo(lineObj.x / lineObj.canvasWidth * this.state.canvasDimensions.width, lineObj.y / lineObj.canvasHeight * this.state.canvasDimensions.height)
            ctx.stroke();
            // if (index === lineArray.length - 1) {
            //    ctx.lineTo(lineArray[0].x / lineArray[0].canvasWidth * this.state.canvasDimensions.width, lineArray[0].y / lineArray[0].canvasHeight * this.state.canvasDimensions.height)
            //    ctx.stroke();
            // }
         })
         ctx.closePath();
         ctx.stroke();

         ctx.beginPath();
         lineArray.map((lineObj, index) => {
            ctx.moveTo(lineObj.x / lineObj.canvasWidth * this.state.canvasDimensions.width, lineObj.y / lineObj.canvasHeight * this.state.canvasDimensions.height);
            ctx.arc(lineObj.x / lineObj.canvasWidth * this.state.canvasDimensions.width, lineObj.y / lineObj.canvasHeight * this.state.canvasDimensions.height, 5, 0, 2 * Math.PI);
            ctx.fill();
         })
      // };
      // this.drawImage();


   }

   render() {
      let {classes} = this.props;
      return (
         <MuiThemeProvider theme={darkTheme}>
            <Grid container direction={'row'}>
               <Grid item xs={6} md={6}>
                  <Paper className={classes.root}>
                     <div ref={this.canvasContainerRef} className={classes.canvasContainer}>
                        {/*<div className={classes.imageContainer}>*/}
                        {/*<img src={"http://192.168.0.151:3000/frame/5/18/5_18_4278.jpg"} alt="calibration"*/}
                        {/*     style={{width: '100%', height: canvasDimensions.width * 3 / 4}}*/}
                        {/*     className={classes.cameraImage}*/}
                        {/*/>*/}
                        <canvas
                           className={classes.canvas}
                           ref={this.canvasRef}
                           // width={this.state.canvasDimensions.width}
                           // height={this.state.canvasDimensions.height}
                        />
                        {/*</div>*/}
                     </div>
                  </Paper>
               </Grid>
            </Grid>
         </MuiThemeProvider>
      );
   }
}

export default withStyles(styles)(App);