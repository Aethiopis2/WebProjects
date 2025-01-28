/**
 * @summary A card matching game logic with static screen size and all.
 *  Aided by ol skool jquery library.
 * @author Aethiopis II ben Zahab
 * @date 28th of January 2025, Tuesday.
 */
var matching = {};
matching.deck = [
	'cardAK', 'cardAK',
	'cardAQ', 'cardAQ',
	'cardAJ', 'cardAJ',
	'cardBK', 'cardBK',
	'cardBQ', 'cardBQ',
	'cardBJ', 'cardBJ',	
];

$(function() {
    matching.deck.sort(shuffle);

    // make 11 more other copies of card
    for (let i = 0; i < 11; i++)
        $(".card:first-child").clone().appendTo('#cards');

    // initialize each cards positions
    $('#cards').children().each(function(index) {
        // 4x3 alignment
        var x = ($(this).width() + 20) * (index % 4);
        var y = ($(this).height() + 20) * Math.floor(index / 4);

        $(this).css("transform", "translateX(" + x + "px) translateY(" + y + "px)");

        // get a pattern from the shuffled deck
        var pattern = matching.deck.pop();

        // apply pattern visually on the back side
        $(this).find(".back").addClass(pattern);

        // embed pattern into DOM
        $(this).attr("data-pattern",pattern);

        // listen to click event on each card
        $(this).click(selectCard);
    });

    function shuffle() {
        return 0.5 - Math.random();
    } // end shuffle

    function selectCard() {
        // are two cards filpped?
        if ($(".card-flipped").size() > 1)
            return; // do nothing

        $(this).addClass("card-flipped");

        // check pattern of flipped cards 0.7s later
        if ($(".card-flipped").size() === 2)
            setTimeout(checkPattern, 700);
    } // end selectCard

    function checkPattern() {
        if (isMatchPattern()) {
            $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
            $(".card-removed").bind("transitionend", removeTookCards);
        } // end if
        else {
            $(".card-flipped").removeClass("card-flipped");
        } // end else
    } // end checkPattern

    function isMatchPattern() {
        var cards = $(".card-flipped");
        var pattern = $(cards[0]).data("pattern");
        var anotherPattern = $(cards[1]).data("pattern");
        return (pattern === anotherPattern);
    } // end isMatchPattern

    function removeTookCards() {
        $(".card-removed").remove();
    } // end removeTookCards
}); 