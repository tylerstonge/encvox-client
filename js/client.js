$(function () {
    var socket = io('http://localhost:3000');
    var e = new JSEncrypt();
    var d = new JSEncrypt();
    
    // Setup encrytion
    e.setPublicKey($('#pubkey').val());
    d.setPrivateKey($('#privkey').val())
    
    $('form').submit(function() {
        var message = $('#msg').val();
        socket.emit('message', e.encrypt(message));
        $('#msg').val('');
        return false;
    });
    
    socket.on('message', function(msg) {
        console.log('recv\'d: ' + msg);
        $('#messages').append($('<p>').text(d.decrypt(msg)));
    });
});