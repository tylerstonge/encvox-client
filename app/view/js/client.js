const contents = require('electron').ipcRenderer;

let parseAndSend = () => {
  let msg = $('#msg').val();
  contents.send('encrypt', msg);
  $('#msg').val('');
  $('#messages').append($('<p>', {'class': 'message'}).text('[ me ] ' + msg));
};

$(function () {
  $('#msg').keydown((e) => {
    var keypressed = e.keyCode || e.which;
    if (keypressed === 13) {
      parseAndSend();
      return false;
    }
  });

  $('#settings').click(() => {
    window.location.href = 'settings.html';
  });

  $('#slider').slideReveal({
    trigger: $('#trigger'),
    position: 'right',
    shown: () => {
      $('#trigger i').addClass('rotate');
    },
    hidden: () => {
      $('#trigger i').removeClass('rotate');
    }
  });

  $('#btn').click(() => {
    parseAndSend();
    return false;
  });

  contents.on('message', (event, m) => {
    console.log('recv: ' + JSON.stringify(m));
    $('#messages').append($('<p>', {'class': 'message'}).text('[ ' + m.sender + ' ] ' + m.message));
    $('.container').scrollTop($('#messages')[0].scrollHeight);
  });
});
