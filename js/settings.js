var list;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function uploadFile(event){
    event.preventDefault();
    // read file
    var file = document.getElementById('userfile').files[0];
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = uploadData;
}

function hideAlert() {
    $('#feedback').fadeOut();
}

function uploadData(event) {
    var result = event.target.result;
    var file = document.getElementById('userfile').files[0];
    var feedback = $('#feedback');

    // check file extension equals txt or csv
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
        feedback.addClass('alert-danger');
        feedback.html('Dieser Dateityp ist nicht erlaubt!');
        feedback.fadeIn();
        setTimeout(hideAlert, 8000);
        return;
    }

    // check file size not greater than 100 KB
    if (file.size > 100000) {
        feedback.addClass('alert-danger');
        feedback.html('Die Dateigröße darf 100 KB nicht überschreiten!');
        feedback.fadeIn();
        setTimeout(hideAlert, 8000);
        return;
    }

    //otherwise send file data to server
    //$('body').load('server/upload.php', { data: result, name: file.name });
    $.ajax({
        url: 'server/upload.php',
        type: 'POST',
        data: { data: result, name: file.name },
        success: function (json) {
            var answer = $.parseJSON(json);
            feedback.removeClass('alert-danger', 'alert-success');
            if (answer.success) {
                feedback.addClass('alert-success');
                feedback.html('<strong>'+ file.name +'</strong> erfolgreich hochgeladen!');
                refreshUI();
            }
            else {
                feedback.addClass('alert-danger');
                switch (answer.message){
                    case 'error_filetype':
                        feedback.html('Dieser Dateityp ist nicht erlaubt!');
                        break;
                    case 'error_html':
                        feedback.html('Der Dateiname enthält HTML- oder PHP-Tags!');
                        break;
                    case 'error_open':
                        feedback.html('Ups! Auf dem Server ist ein Problem beim Schreiben der Datei aufgetreten! :/');
                        break;
                    case 'error_write':
                        feedback.html('Ups! Auf dem Server ist ein Problem beim Schreiben der Datei aufgetreten! :/');
                        break;
                    case 'error_file_exists':
                        feedback.html('<strong>'+ file.name +'</strong> ist bereits vorhanden!');
                        break;
                    case 'error_empty_file':
                        feedback.html('Die ausgewählte Datei ist leer!');
                        break;
                    case 'error_line_count':
                        feedback.html('Die Datei muss mindestens 5 Zeilen haben!');
                        break;
                }
            }
            feedback.fadeIn();
            setTimeout(hideAlert, 8000);
        }
    });
}

function refreshUI() {
    $.post('server/server.php', { mode: 'get_list'}, function (json) {
        //alert(json);
        list = $.parseJSON(json);

        var wrapper = $('#edit-wrapper');
        var tbody =  $('#tbody-list');

        var html = '';
        for(var i = 0; i < list.length; i++) {
            html += '<tr><th class="th-icon" scope="row"><span class="badge badge-default unselectable"><div>'+ list[i].line_cnt +'</div></span></th><td class="td-content">'+ list[i].name +'<span class="badge badge-default unselectable">'+ list[i].ext.toUpperCase() +'</span></td><td class="td-icon"><button id="edit-'+ i +'" class="material-icons unselectable edit-file">edit_mode</button></td><td class="td-icon"><button id="delete-'+ i +'" class="material-icons unselectable delete-file">delete</button></td></tr>';
        }

        tbody.html(html);

        // $('.edit-file').click(function () {
        //     var str_id = $(this).attr('id');
        //     var id = parseInt(str_id.substr(str_id.length-1,str_id.length));
        //     editFile(id);
        //
        // });
        //
        $('.delete-file').click(function (event) {
            //alert('Test');
            var str_id = $(this).attr('id');
            var id = parseInt(str_id.substr(str_id.length-1,str_id.length));
            deleteFile(id, $(this));
        });
        //wrapper.animate({opacity: 1}, 100);

    })
}

$(document).ready(function () {
   refreshUI();
});

function editFile(id) {

}

function deleteFile(id, button) {
    $.post('server/server.php', {mode: 'delete_file', id: id}, function () {
        // delete row from UI
        button.parents('tr').remove();
    })
}