/**
 * untangle.js
 * @author Aethiopis II ben Zahab
 * @date 29th of January 2025, Wednesday. 
 */
if (untangle === undefined)
    var untangle = {};

$(document).ready(function() {
    var canvas = document.getElementById("game");
    untangle.ctx = canvas.getContext('2d');
    
    let width = canvas.width;
    let height = canvas.height;
    untangle.createRandomCircles(width, height);
    untangle.connectCircles();
});