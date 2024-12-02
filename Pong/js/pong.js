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
            height: dom('game').offsetHeight,
            width: dom('game').offsetWidth,
        },
        ball: {
            x: Math.floor(Math.random() * dom('game').offsetWidth),
            y: Math.floor(Math.random() * dom('game').offsetHeight),
            speed: dom('game').offsetWidth * 0.0075,
            directionX: 1,
            directionY: 1,
        },
    }; 

    /**
     * the main game loop that get's called every 33 fps
     */
    function gameLoop() {
        moveBall();
    } // end game loop

    /**
     * @returns test's if ball has hit the top or bottom side
     */
    function ballHitsTopBottom() {
        let y = pong.ball.y + pong.ball.speed * pong.ball.directionY;
        let height = y + dom('ball').offsetHeight;
        return (pong.ball.y + pong.ball.speed * pong.ball.directionY < 0) || (height > pong.playground.height);
    } // end ballHitsTopBottom

    /**
     * 
     * @returns test's if we've hit the right wall
     */
    function ballHitRightWall() {
        let x = pong.ball.x + dom('ball').offsetWidth;
        return x + pong.ball.speed * pong.ball.directionX > pong.playground.width;
    } // end ballHitRight

    /**
     * 
     * @returns test's if ball hits left wall
     */
    function ballHitLeftWall() {
        return pong.ball.x + pong.ball.speed * pong.ball.directionX < 0;
    } // end ballHitLeft

    /**
     * The human wins
     */
    function playerAWins() {
        if (!playerAWins.score) playerAWins.score = 0;

        playerAWins.score += 1;
        pong.ball.x = pong.playground.width / 2;
        pong.ball.y = Math.floor(Math.random() * pong.playground.height);
        pong.ball.directionX = 1;
        dom('scoreA').innerHTML = playerAWins.score;
    } // end playerAWins

    /**
     * Damn computer wins
     */
    function playerBWins() {
        if (!playerBWins.score) playerBWins.score = 0;

        playerBWins.score += 1;
        pong.ball.x = pong.playground.width / 2;
        pong.ball.y = Math.floor(Math.random() * pong.playground.height);
        pong.ball.directionX = -1;
        dom('scoreB').innerHTML = playerBWins.score;
    } // end playerBWins

    /**
     * render's the two dom elements paddleA and paddleB as game object, square
     *  paddles that go on about up and down 
     */
    function renderPaddles() {        
        dom('paddleA').style.top = pong.paddleA.y + "px";
        dom('paddleB').style.top = pong.paddleB.y + "px";
    } // end renderPaddles

    function moveBall() {
        if (ballHitsTopBottom()) 
            pong.ball.directionY *= -1;

        if (ballHitRightWall())
            playerAWins();

        if (ballHitLeftWall())
            playerBWins();

        var ballX = pong.ball.x + pong.ball.speed * pong.ball.directionX;
        var ballY = pong.ball.y + pong.ball.speed * pong.ball.directionY;
        
        if (ballX >= pong.paddleA.x && ballX < pong.paddleA.x + pong.paddleA.width) {
            if (ballY <= pong.paddleA.y + pong.paddleA.height && ballY >= pong.paddleA.y) {
                pong.ball.directionX = 1;
            } // end if
        } // end if

        // check right paddle
        ballX += pong.paddleB.width;
        if (ballX >= pong.paddleB.x && ballX < pong.paddleB.x + pong.paddleB.width) {
            if (ballY <= pong.paddleB.y + pong.paddleB.height && ballY >= pong.paddleB.y) {
                pong.ball.directionX = -1;
            } // end if
        } // end if 

        pong.ball.x += pong.ball.speed * pong.ball.directionX;
        pong.ball.y += pong.ball.speed * pong.ball.directionY;
        movePaddle();
    } // end moveBall

    function movePaddle() {
        let speed = pong.playground.width * 0.00625;
        let direction = 1;

        let paddleY = pong.paddleB.y + pong.paddleB.height/2;
        if (paddleY > pong.ball.y) {
            direction = -1;
        }
        pong.paddleB.y += speed * direction;
        if (pong.paddleB.y < 0)
            pong.paddleB.y = 0;
        else if (pong.paddleB.y + pong.paddleB.height > pong.playground.height)
            pong.paddleB.y = pong.playground.height - pong.paddleB.height;
    } // end movePaddle
    
    /**
     * draw's the ball on the page
     */
    function renderBall() {
        dom('ball').style.top = pong.ball.y + pong.ball.speed * pong.ball.directionY.toString() + "px";
        dom('ball').style.left = (pong.ball.x + pong.ball.speed * pong.ball.directionX).toString() + "px";
    } // end renderBall

    /**
     * handles the mousemove, mouseenter, and mouseleave events
     */
    function handleMouse() {
        dom('game').addEventListener('mouseenter', () => pong.isPaused = false);
        dom('game').addEventListener('mouseleave', () => pong.isPaused = true);
        dom('game').addEventListener('mousemove', e => {
            pong.paddleA.y = e.pageY - (pong.playground.offsetTop + pong.paddleA.height / 2);
            if (pong.paddleA.y < 0)
                pong.paddleA.y = 0;
            else if (pong.paddleA.y + pong.paddleA.height >= pong.playground.height)
                 pong.paddleA.y = pong.playground.height - pong.paddleA.height;
        });
    } // end handleMouse

    /**
     * runs at times set by browser to obtain smooth animation
     */
    function render() {
        renderBall();
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

            pong.playground.height = dom('game').offsetHeight;
            pong.playground.width = dom('game').offsetWidth;
            pong.ball.speed = pong.playground.width * 0.0075;
            renderPaddles();
        });

        var timer = setInterval(gameLoop, 1000/ 30);
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