// selected id from index.php
var id_global;
// array for receiving file data from server.php
var arr;
// correct answer (button)
var answer;


function randomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

function randomIntArray(min, max, length) {

    // parameter validation
    if (max - min < 1) {
        return null;
    }
    var len = (length-1 <= (max - min) ? length : (max - min + 1));

    var numbers = [], array = [], random;
    for (var z = min, i = 0; z <= max; z++, i++){
        numbers[i] = z;
    }
    for(var j = max-min; len; len--, j--) {
        // select random number from numbers
        random = randomInt(0, j);
        // add number to final array
        array.push(numbers[random]);
        //delete that number from numbers
        numbers.splice(random, 1);
    }
    return array;
}

function getNewVocab(direction){
    // random numbers for vocabulary
    var random = randomIntArray(0, arr.count-1, 5);
    // random numbers to place items in list (right box)
    var random_item = randomIntArray(0, 4, 5);
    //alert(random);
    //alert(random_item);

    // update correct answer
    answer = random_item[0];

    // fill left box
    var leftContent = arr.content[random[0]][(direction ? 0 : 1)].split(', ', 2);
    document.getElementById('left-box-h1').innerHTML = leftContent[0];
    if (leftContent[1]) {
        document.getElementById('left-box-p').innerHTML = leftContent[1];
    } else {
        document.getElementById('left-box-p').innerHTML = '';
    }
    // fill right box
    for(var i = 0; i < 5; i++) {
        document.getElementById('btn-' + random_item[i]).innerHTML = arr.content[random[i]][(direction ? 1 : 0)];
    }
}

function ready(id) {
    id_global = id;

    // ajax request for selected training file contents
    $.ajax({
        type: 'POST',
        url: 'server.php',
        data: { id: id_global },
        success: function (json) {
            arr = $.parseJSON(json);
            // fill language bar with language 1 + 2
            document.getElementById('language-1').innerHTML = '<a href="">'+ arr.lang1 + ' - ' + arr.lang2 +'</a>';
            document.getElementById('language-2').innerHTML = '<a href="">'+ arr.lang2 + ' - ' + arr.lang1 +'</a>';

            getNewVocab(true);
        }
    });


    var lb = $('#left-box');
    var rb = $('#right-box');
    // set left box to same height as left box
    //lb.outerHeight(rb.innerHeight());
    // fade in elements
    lb.animate({opacity: '1.0'}, 200);
    rb.animate({opacity: '1.0'}, 400);
    $('#language-bar').animate({opacity: '1.0'},100);
}

function navClick(elem, event) {
    event.preventDefault();
    if (!elem.classList.contains("active")){
        elem.classList.toggle("active");
        if (elem.id === "language-1"){
            document.getElementById("language-2").classList.toggle("active");
            getNewVocab(true);
        }
        else if (elem.id === "language-2") {
            document.getElementById("language-1").classList.toggle("active");
            getNewVocab(false);
        }
    }
}

function answerChosen(button) {
    //$('#right-box-wrapper').animate({left: "+=50px", opacity: 0}, 300);
    if (button.id === 'btn-' + answer) {
        document.getElementById('left-box').classList.remove('jumbotron-transparent-wrong');
        document.getElementById('left-box').classList.add('jumbotron-transparent-correct');
    }
    else {
        document.getElementById('left-box').classList.remove('jumbotron-transparent-correct');
        document.getElementById('left-box').classList.add('jumbotron-transparent-wrong');
    }
}