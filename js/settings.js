function uploadFile(event){
    event.preventDefault();
    var file = document.getElementById('userfile').files[0];
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = sendData;
}

function sendData(event) {
    var result = event.target.result;
    var filename = document.getElementById('userfile').files[0].name;
    $.ajax({
        url: 'upload.php',
        type: 'POST',
        data: { data: result, name: filename },
        success: function (json) {
            // TODO: Give user feedback on file upload
            var answer = $.parseJSON(json);
            var feedback = $('#feedback');
            feedback.removeClass('alert-danger', 'alert-success');
            if (answer.success) {
                feedback.addClass('alert-success');
                feedback.html('<strong>'+ filename +'</strong> erfolgreich hochgeladen!');
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
                        feedback.html('<strong>'+ filename +'</strong> ist bereits vorhanden!');
                        break;
                    case 'error_empty_file':
                        feedback.html('Die ausgewählte Datei ist leer!');
                        break;
                }
            }
        }
    });
}