$(function () {
    const contents = require('electron').ipcRenderer;

    $('#msg').keydown((e) => {
        var keypressed = event.keyCode || event.which;
        if (keypressed == 13) {
            contents.send('encrypt', $('#msg').val());
            $('#msg').val('');
            return false;
        }
    });

    $('#btn').click(() => {
        contents.send('encrypt', $('#msg').val());
        $('#msg').val('');
        return false;
    })

    contents.on('message', function(event, msg) {
        console.log('recv: ' + JSON.stringify(msg));
        $('#messages').append($('<p>').text(msg));
        $('.container').scrollTop($('#messages')[0].scrollHeight);
    });
});
