$(function () {
  const contents = require('electron').ipcRenderer;

  $('#msg').keydown((e) => {
    var keypressed = e.keyCode || e.which;
    if (keypressed === 13) {
      contents.send('encrypt', $('#msg').val());
      $('#msg').val('');
      return false;
    }
  });

  $('#btn').click(() => {
    contents.send('encrypt', $('#msg').val());
    $('#msg').val('');
    return false;
  });

  contents.on('message', (event, msg) => {
    console.log('recv: ' + JSON.stringify(msg));
    $('#messages').append($('<p>').text(msg));
    $('.container').scrollTop($('#messages')[0].scrollHeight);
  });
});
