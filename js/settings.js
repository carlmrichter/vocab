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
        url: 'upload.php',
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