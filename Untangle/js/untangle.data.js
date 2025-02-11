/**
 * @summary takes care of the drawing for the untangled game
 * @author Aethiopis II ben Zahab
 * @date 11th of January 2025, Tuesday. 
 */
if (untangle === undefined)
    var untangle = {};


untangle.createRandomCircles = function(width, height) {
    const circleCount = 5;
    const radius = 10;

    for (let i = 0; i < circleCount; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;

        untangle.circles.push(new untangle.Circle(x, y, radius));
        untangle.drawCircle(x, y, radius);
    } // end for
}; // end createRandomCircles


untangle.Circle = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
};

untangle.Line = function(start, end, thickness) {
    this.start = start;
    this.end = end;
    this.thickness = thickness;
};