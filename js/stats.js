var count = 0;

function initializeUI() {
    count  = 0;
    $.ajax({
        url: 'server/server.php',
        type: 'POST',
        data: { mode: 'get_stats'},
        success: function (json) {
            var stats,
                html = '',
                total_answered = 0,
                total_correct = 0,
                filename, answered, wrong, correct,
                bars = [];
            try {
                stats = $.parseJSON(json);
            } catch (err) {

                document.getElementById('stats-wrapper').innerHTML = '<div class="col-md-12" style="padding: .7rem">' +
                    '<div class="jumbotron jumbotron-transparent"><h1>Du hast noch nichts geübt!</h1></div></div>';
                return;
            }

            for (var key in stats){
                if (!stats.hasOwnProperty(key)) continue;
                var obj = stats[key];
                if (obj.hasOwnProperty('filename')) {
                    filename = obj['filename'].replace('.txt', '');
                    obj.hasOwnProperty('answered') ? answered = obj['answered'] : answered = 0;
                    obj.hasOwnProperty('correct') ? correct = obj['correct'] : correct = 0;
                    wrong = answered - correct;
                    total_answered += answered;
                    total_correct += correct;
                    count++;
                    bars[count] = [answered, correct];

                    html += '<div class="col-xl-4 col-md-6 col-sm-12 small-box-wrapper">' +
                        '<div class="jumbotron jumbotron-transparent"><i id="delete-'+ (parseInt(key)+1) +'" class="material-icons float-right unselectable delete-stats">delete</i>' +
                        '<h2>'+ filename +'</h2>'+ obj['lang1'] + ' - '+ obj['lang2'] +'<div class="progress progress-custom-small">' +
                        '<div id="correct-'+ count +'" class="progress-bar bg-success" style="width:0;height:auto;"></div>' +
                        '<div id="wrong-'+ count +'" class="progress-bar bg-danger" style="width:0;height:auto;"></div>' +
                        '</div>Gesamt: '+ answered +' | Richtig: '+ correct +' | Falsch: '+ wrong +' </div></div>';
                }


            }
            bars[0] = [total_answered, total_correct];
            var html_total = '<div class="col-12 big-box-wrapper">' +
                '<div class="jumbotron jumbotron-transparent"><i id="delete-0" class="material-icons float-right unselectable delete-stats">delete</i>' +
                '<h1>Alle Lektionen</h1><div class="progress progress-custom-big">' +
                '<div id="correct-0" class="progress-bar bg-success" style="width:0; height: auto;"></div>' +
                '<div id="wrong-0" class="progress-bar bg-danger" style="width:0; height: auto;"></div></div>' +
                '<p id="p-0">Gesamt: '+ total_answered +' | Richtig: '+ total_correct +' | Falsch: '+ (total_answered-total_correct) +'</p></div></div>';
            document.getElementById('stats-wrapper').innerHTML = html_total + html;

            // add EventHandler for delete stats buttons
            $('.delete-stats').click(function () {
                var id = $(this).attr('id');
                var id_short = parseInt(id.substr(id.length - 1));
                $.ajax({
                    url: 'server/server.php',
                    type: 'POST',
                    data: { mode: 'delete_stat', id: id_short},
                    success: function (json) {
                        var arr = $.parseJSON(json);
                        //alert(ids + ' - Länge: ' + ids.length);
                        if (arr.hasOwnProperty('content')) {
                            updateUI(arr.ids, false, arr.content);
                        }
                        else {
                            updateUI(arr.ids, true);
                        }

                    }
                });
            });
            animateProgressBars(bars);
        }
    });
}


function updateUI(ids, deleteAll, content) {
    var correct_total = 0, answered_total = 0;

    for(var i = 0; i < ids.length; i++) {
        var id = (parseInt(ids[i]) + 1);
        if (i === ids.length - 1) {
            $('#delete-' + id).parent().parent().fadeOut(function () {
                if (deleteAll) {
                    var html = '<div class="col-12" style="padding: .7rem"><div class="jumbotron jumbotron-transparent"><h1>Du hast noch nichts geübt!</h1></div></div>';
                    $('#stats-wrapper').html(html).fadeIn();
                }
                else {
                    // get new total of correct and wrong answers
                    for (var key in content){
                        if (!content.hasOwnProperty(key)) continue;
                        var obj = content[key];
                        if (obj.hasOwnProperty('answered')) {
                            answered_total += obj['answered'];
                            if (obj.hasOwnProperty('correct')) {
                                correct_total += obj['correct'];
                            }
                        }
                    }
                    // display values
                    $('#p-0').html('Gesamt: '+ answered_total +' | Richtig: '+ correct_total +' | Falsch: '+ (answered_total-correct_total));

                    // recalculate percentages
                    var correct = Math.round(correct_total / answered_total * 100);
                    var wrong = Math.round((answered_total - correct_total) / answered_total * 100);
                    if (correct+wrong > 100){
                        wrong--;
                    }
                    // concatenate '%'
                    correct += '%';
                    wrong += '%';
                    var w = $('#wrong-0');
                    var c = $('#correct-0');

                    // change tooltip titles of big progress bar
                    w.attr('data-original-title', wrong);
                    c.attr('data-original-title', correct);

                    // animate changes on big progress bar
                    w.animate({width: wrong}, 200);
                    c.animate({width: correct},200);
                }
            });
        }
        else {
            $('#delete-' + id).parent().parent().fadeOut();
        }
    }
}


$(document).ready(function () {
    initializeUI();

});

function animateProgressBars(bars) {
    for(var i = 0; i < count + 1; i++){
        // calculate correct and wrong answer percentage
        var correct = Math.round(bars[i][1] / bars[i][0] * 100);
        var wrong = Math.round((bars[i][0] - bars[i][1]) / bars[i][0] * 100);
        if (correct+wrong > 100){
            wrong--;
        }
        // concatenate '%'
        correct += '%';
        wrong += '%';
        var w = $('#wrong-' + i);
        var c = $('#correct-' + i);
        // tooltips need attribute dataToggle on DOM element
        // activate tooltips
        w.attr({dataToggle: 'tooltip'}).tooltip({delay: 100, title: wrong, placement: 'bottom'});
        c.attr({dataToggle: 'tooltip'}).tooltip({delay: 100, title: correct, placement: 'bottom'});
        w.animate({width: wrong}, 200);
        c.animate({width: correct},200);

    }

}

