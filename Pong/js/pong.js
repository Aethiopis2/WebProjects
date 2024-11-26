/**
 * @summary Pong implementation.
 * @author Rediet Worku aka Aethiops II ben Zahab
 * @date 25th of November 2024, Monday
 */
window.onload = () => {
    // compute the dimensions of the game area at start-up
    dom('game').style.height = (window.innerHeight - (header.offsetHeight + footer.offsetHeight)).toString() + "px";

    var pong = {
        paddleA: {
            x: dom('paddleA').offsetLeft,
            y: Math.floor(Math.random() * (game.offsetHeight - dom('paddleA').offsetHeight)), 
            width: dom('paddleA').offsetWidth,
            height: dom('paddleB').offsetHeight
        },
        paddleB: {
            x: dom('paddleB').offsetLeft,
            y: Math.floor(Math.random() * (game.offsetHeight - dom('paddleB').offsetHeight)), 
            width: dom('paddleB').offsetWidth,
            height: dom('paddleB').offsetHeight
        },
        playground: {
            offsetTop: dom('game').offsetTop,
        },
    }; 

    /**
     * render's the two dom elements paddleA and paddleB as game object, square
     *  paddles that go on about up and down 
     */
    function renderPaddles() {        
        dom('paddleA').style.top = pong.paddleA.y + "px";
        dom('paddleB').style.top = pong.paddleB.y + "px";
    } // end renderPaddles

    /**
     * handles the mousemove, mouseenter, and mouseleave events
     */
    function handleMouse() {
        dom('game').addEventListener('mouseenter', () => pong.isPaused = false);
        dom('game').addEventListener('mouseleave', () => pong.isPaused = true);
        dom('game').addEventListener('mousemove', e => {
            pong.paddleA.y = e.pageY - pong.playground.offsetTop;
            if (pong.paddleA.y + pong.paddleA.height > dom('game').offsetHeight)
                 pong.paddleA.y = dom('game').offsetHeight - pong.paddleA.height;
        });
    } // end handleMouse

    /**
     * runs at times set by browser to obtain smooth animation
     */
    function render() {
        renderPaddles();

        window.requestAnimationFrame(render);
    } // end render

    /**
     * initalizes the game
     */
    function init() {
        // add an event-listener for whenever browser-window size changes
        window.addEventListener('resize', () => {
            // recompute the game size 
            dom('game').style.height = (window.innerHeight - 
                (dom('header').offsetHeight + dom('footer').offsetHeight)).toString() + "px";
            pong.paddleA.y = (pong.paddleA.y + pong.paddleA.height >= dom('game').offsetHeight ? 
                dom('game').offsetHeight - pong.paddleA.height : pong.paddleA.y);
            pong.paddleB.y = (pong.paddleB.y + pong.paddleB.height >= dom('game').offsetHeight ? 
                dom('game').offsetHeight - pong.paddleB.height : pong.paddleB.y);

            renderPaddles();
        });

        window.requestAnimationFrame(render);
        handleMouse();
    } // end init
    
    init();
};


/**
 * 
 * @param {*} elemid the dom element id
 * @returns the dom element for the supplied id
 */
function dom(elemid) {
    if (!dom.cache) dom.cache = {};
    if (dom.cache[elemid] != null) return dom.cache[elemid];

    dom.cache[elemid] = document.getElementById(elemid);
    return dom.cache[elemid];
} // end memoize dom