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

    // check file extension equals txt
    if (!file.name.endsWith('.txt')) {
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

    // otherwise send file data to server
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
                }
            }
            feedback.fadeIn();
            setTimeout(hideAlert, 8000);
        }
    });
}

$(document).ready(function () {
   $.post('server/server.php', { mode: 'list'}, function (json) {
       list = $.parseJSON(json);

       var wrapper = $('#edit-wrapper');
       var tbody =  $('#tbody-list');

       wrapper.css({opacity:1});
       if (list.length === 0) {
            wrapper.css({display: 'none'});
       }
       else {

            var html = '';
            for(var i = 0; i < list.length; i++) {
                html += '<tr><th scope="row">'+ (i+1) +'</th><td class="td-content">'+ list[i].name +'</td><td class="td-icon"><button id="edit-'+ i +'" class="material-icons unselectable edit-file">edit_mode</button></td><td class="td-icon"><button id="delete-'+ i +'" class="material-icons unselectable delete-file">delete</button></td></tr>';
            }

            tbody.html(html);

            $('.edit-file').click(function () {
                var str_id = $(this).attr('id');
                var id = parseInt(str_id.substr(str_id.length-1,str_id.length));
                editFile(id);

            });

            $('.delete-file').click(function (event) {
                var str_id = $(this).attr('id');
                var id = parseInt(str_id.substr(str_id.length-1,str_id.length));
                deleteFile(id);
            });
            //wrapper.animate({opacity: 1}, 100);
       }
   })
});

function editFile(id) {

}

function deleteFile(id) {
    $.post('server/server.php', {mode: 'delete_file', id: id}, function (json) {
        // TODO delete row with id=... from UI
    })
}