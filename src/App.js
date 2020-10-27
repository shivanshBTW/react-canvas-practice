import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import AppStyles from "./AppStyles";
import testImage from './testImage.jpeg';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";

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

let canvasDimensions = {
   height: window.innerHeight,
   width: window.innerWidth
}

class App extends Component {
   constructor(props) {
      super(props);
      this.canvasRef = React.createRef();

      this.state = {
         lineArray: []
      }
   }

   componentDidMount = () => {
      // this.drawImage();
      this.startDrawing()
   }

   componentDidUpdate = (prevProps, prevState) => {
      if (prevState.lineArray !== this.state.lineArray) {
         // this.drawImage()
         this.updateCanvas();
      }
   }


   drawImage = () => {
      let ctx = this.canvasRef.current.getContext('2d');
      let imageObj1 = new Image();
      imageObj1.src = testImage;
      // imageObj1.setAttribute('','')
      //
      imageObj1.onload = () => {
         this.canvasRef.current.height = canvasDimensions.height;
         this.canvasRef.current.width = canvasDimensions.width;
         ctx.drawImage(imageObj1, 0, 0, canvasDimensions.width, canvasDimensions.height);
      };
         this.startDrawing()

   };

   startDrawing = () => {
      let ctx = this.canvasRef.current.getContext('2d');
      this.canvasRef.current.addEventListener("mousedown", this.addNewPoint);
      // this.canvasRef.addEventListener("mouseup",);
      // this.canvasRef.addEventListener("mouseout",);


      // ctx.beginPath();
      // ctx.strokeStyle = 'red'
      // ctx.moveTo(100, 100)
      // ctx.lineTo(200, 100)
      // ctx.stroke();
      //
      // // ctx.moveTo(100, 400)
      // ctx.strokeStyle = 'purple'
      // ctx.lineTo(200, 600)
      // ctx.stroke();
   }

   addNewPoint = (e) => {
      console.log(e);
      let ctx = this.canvasRef.current.getContext('2d');
      this.setState({
         lineArray: [...this.state.lineArray, {
            x: e.x,
            y: e.y
         }]
      })

      // ctx.beginPath();
      // ctx.strokeStyle = 'red'
      // ctx.moveTo(100, 100)
      // ctx.lineTo(200, 100)
      // ctx.stroke();
   }

   updateCanvas = () => {
      let {lineArray} = this.state;
      let ctx = this.canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height)
      ctx.beginPath();
      ctx.strokeStyle = 'red'

      if (lineArray.length) {
         ctx.moveTo(lineArray[0].x, lineArray[0].y)
      }
      this.state.lineArray.map((lineObj, index) => {
         ctx.lineTo(lineObj.x, lineObj.y)
         ctx.stroke();
      })
   }

   render() {
      let {classes} = this.props;
      return (
         <MuiThemeProvider theme={darkTheme}>
            <div className={classes.root}>
               <div className={classes.imageContainer}>
                  <canvas ref={this.canvasRef}/>
               </div>
            </div>
         </MuiThemeProvider>
      );
   }
}

export default withStyles(styles)(App);