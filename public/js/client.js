$(function () {
    const contents = require('electron').ipcRenderer;

    $('form').submit(function() {
        contents.send('encrypt', $('#msg').val());
        $('#msg').val('');
        return false;
    });

    contents.on('message', function(event, msg) {
        console.log('recv\'d: ' + JSON.stringify(msg));
        $('#messages').append($('<p>').text(msg));
    });
});
