var count = 0;
var bars = [];

$(document).ready(function () {
    $.ajax({
        url: 'server.php',
        type: 'POST',
        data: { mode: 'get_stats'},
        success: function (json) {
            var stats,
                html = '',
                total_answered = 0,
                total_correct = 0,
                filename, answered, wrong, correct;
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

                    // TODO: delete stats button/icon for each box

                    html += '<div class="col-xl-4 col-md-6 col-sm-12 small-box-wrapper">' +
                        '<div class="jumbotron jumbotron-transparent">' +
                        '<h2>'+ filename +'</h2>'+ obj['lang1'] + ' - '+ obj['lang2'] +'<div class="progress progress-custom-small">' +
                        '<div id="correct-'+ count +'" class="progress-bar bg-success" style="width:0;height:auto;"></div>' +
                        '<div id="wrong-'+ count +'" class="progress-bar bg-danger" style="width:0;height:auto;"></div>' +
                        '</div>Gesamt: '+ answered +' | Richtig: '+ correct +' | Falsch: '+ wrong +' </div></div>';
                }


            }
            bars[0] = [total_answered, total_correct];
            var html_total = '<div class="col-12 big-box-wrapper">' +
                '<div class="jumbotron jumbotron-transparent">' +
                '<h1>Alle Lektionen</h1><div class="progress progress-custom-big">' +
                '<div id="correct-0" class="progress-bar bg-success" style="width:0; height: auto;"></div>' +
                '<div id="wrong-0" class="progress-bar bg-danger" style="width:0; height: auto;"></div></div>' +
                '<p>Gesamt: '+ total_answered +' | Richtig: '+ total_correct +' | Falsch: '+ (total_answered-total_correct) +'</p></div></div>';
            document.getElementById('stats-wrapper').innerHTML = html_total + html;
            animateProgressBars();
        }
    });
});

function animateProgressBars() {
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