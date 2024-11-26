/**
 * @summary Pong implementation.
 * @author Rediet Worku aka Aethiops II ben Zahab
 * @date 25th of November 2024, Monday
 */
window.onload = () => {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const game = document.getElementById('game');
    
    // compute the dimensions of the game area at start-up
    game.style.height = (window.innerHeight - (header.offsetHeight + footer.offsetHeight)).toString() + "px";
    
    var pong = {
        paddleA: {
            x: document.getElementById('paddleA').offsetLeft,
            y: Math.floor(Math.random() * game.offsetHeight), 
            width: document.getElementById('paddleA').offsetWidth,
            height: document.getElementById('paddleA').offsetHeight
        },
        paddleB: {
            x: document.getElementById('paddleB').offsetLeft,
            y: Math.floor(Math.random() * game.offsetHeight), 
            width: document.getElementById('paddleB').offsetWidth,
            height: document.getElementById('paddleB').offsetHeight
        }
    }; 


    function renderPaddles() {
        var paddleA, paddleB;
        if (!paddleA)
            paddleA = document.getElementById('paddleA');
        if (!paddleB)
            paddleB = document.getElementById('paddleB');
        
        console.log(pong.paddleA.y, pong.paddleA.x, pong.paddleA.width, pong.paddleA.height);
        paddleA.style.top = pong.paddleA.y;
        paddleB.style.top = pong.paddleB.y;
    } // end renderPaddles

    renderPaddles();
}


window.addEventListener('resize', ()=> {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const game = document.getElementById('game');
    game.style.height = (window.innerHeight - (header.offsetHeight + footer.offsetHeight)).toString() + "px";
}, true);