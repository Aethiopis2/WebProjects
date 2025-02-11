/**
 * @summary takes care of the drawing for the untangled game
 * @author Aethiopis II ben Zahab
 * @date 29th of January 2025, Wednesday. 
 */
if (untangle === undefined) {
    var untangle = {};
}

untangle.circles = [];
untangle.lineThickness = 1;
untangle.lines = [];

untangle.drawCircle = function(x, y, radius) {
    var ctx = untangle.ctx;
    ctx.fillStyle = "GOLD";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}; // end drawCircle


untangle.drawLine = function(x1, y1, x2, y2, thickness) {
    let ctx = untangle.ctx;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#cfc";
    ctx.stroke();
};


untangle.connectCircles = function() {
    untangle.lines.length = 0;
    for (let i = 0; i < untangle.circles.length; i++) {
        let startPoint = untangle.circles[i];

        for (let j = 0; j < i; j++) {
            let endPoint = untangle.circles[j];
            untangle.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 1);
            untangle.lines.push(new untangle.Line(startPoint, endPoint, untangle.lineThickness));
        }
    }
};