export let drawLabel = (ctx, text, p1Ratio, p2Ratio, alignment, padding) => {
   if (!alignment) alignment = 'center';
   if (!padding) padding = 0;
   let {canvasDimensions} = this.state;

   let p1 = {
      x: p1Ratio.x * canvasDimensions.width,
      y: p1Ratio.y * canvasDimensions.height,
   }
   let p2 = {
      x: p2Ratio.x * canvasDimensions.width,
      y: p2Ratio.y * canvasDimensions.height,
   }
   let dx = p2.x - p1.x;
   let dy = p2.y - p1.y;
   let len = Math.sqrt(dx * dx + dy * dy);
   let avail = len - 2 * padding;

   let textToDraw = text;
   if (ctx.measureText && ctx.measureText(textToDraw).width > avail) {
      while (textToDraw && ctx.measureText(textToDraw + "…").width > avail) textToDraw = textToDraw.slice(0, -1);
      textToDraw += "…";
   }

   // Keep text upright
   let angle = Math.atan2(dy, dx);
   if (angle < -Math.PI / 2 || angle > Math.PI / 2) {
      let p = p1;
      p1 = p2;
      p2 = p;
      dx *= -1;
      dy *= -1;
      angle -= Math.PI;
   }

   let p, pad;
   p = p1;
   pad = 1 / 2;
   ctx.save();
   ctx.textAlign = alignment;
   ctx.translate((p.x + dx * pad), (p.y + dy * pad));
   ctx.rotate(angle);
   ctx.fillText(textToDraw, 0, 0);
   ctx.restore();
}

export let drawLine = (ctx, p1, p2, color, drawDotsFlag, label) => {
   let {canvasDimensions} = this.state;
   ctx.beginPath();
   ctx.moveTo(p1.x * canvasDimensions.width, p1.y * canvasDimensions.height)
   ctx.strokeStyle = color;
   ctx.lineTo(p2.x * canvasDimensions.width, p2.y * canvasDimensions.height)
   ctx.stroke();
   if (label) {
      drawLabel(ctx, label, p1, p2, 'center', 10);
   }
   ctx.closePath();

   if (drawDotsFlag) {
      ctx.beginPath();
      [p1, p2].map((lineObj, index) => {
         if (lineObj) {
            ctx.moveTo(lineObj.x * canvasDimensions.width, lineObj.y * canvasDimensions.height);
            ctx.arc(lineObj.x * canvasDimensions.width, lineObj.y * canvasDimensions.height, 5, 0, 2 * Math.PI);
            ctx.fill();
         }
      })
   }
}

export let drawPolygon = (ctx, p1, p2, p3, p4, c1, c2, c3, c4) => {
   let {canvasDimensions} = this.state;
   let lineArray = [p1, p2, p3, p4];
   ctx.font = '12pt Arial';
   ctx.textBaseline = 'bottom';
   ctx.lineWidth = 2;

   if (p1 && p2) {
      drawLine(ctx, p1, p2, c1, true, 'A')
   }

   if (p2 && p3) {
      drawLine(ctx, p2, p3, c2, true, 'B')
   }

   if (p3 && p4) {
      drawLine(ctx, p3, p4, c3, true, 'A')
   }

   if (p4 && p1) {
      drawLine(ctx, p4, p1, c4, true, 'B')
   }

   if (lineArray[0]) {
      ctx.beginPath();
      ctx.moveTo(lineArray[0].x * canvasDimensions.width, lineArray[0].y * canvasDimensions.height);
      ctx.arc(lineArray[0].x * canvasDimensions.width, lineArray[0].y * canvasDimensions.height, 5, 0, 2 * Math.PI);
      ctx.fill();
   }
};

export let drawLinesFromArray = (ctx, lineArray = this.state.cameraDetails.awi_camera.calibration.awi_lines,color='red') => {
   lineArray.map((lineObj, index) => {
      // console.log(lineObj.awi_coords);
      drawLine(ctx, lineObj.awi_coords[0], lineObj.awi_coords[1], color, false)
   })
}