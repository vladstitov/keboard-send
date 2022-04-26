"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_global_key_listener_1 = require("node-global-key-listener");
const WebSocket = require("ws");
const v = new node_global_key_listener_1.GlobalKeyboardListener();
const ws = new WebSocket('ws://192.168.0.22:8081/stream', {
    perMessageDeflate: false
});
ws.on('open', function open() {
    console.log('socket open');
});
function sendSocketMessage(message) {
    console.log(message);
    ws.send(message);
}
;
const KEYS = {};
const specialChars = {
    space: ' ', comma: ',', dot: '.', quote: "'", section: '`', semicolon: ';', slash: '/',
    'square bracket open': '[', 'square bracket close': ']', 'forward slash': '/', bsckslash: ' ', equals: '=', minus: '-'
};
v.addListener(function (e, down) {
    let letter = e.name.toLowerCase();
    letter = specialChars[letter] || letter;
    const state = e.state.toLowerCase();
    //  console.log(state + ' ' + letter);
    if (state === 'down')
        keyDown(letter);
    else
        keyUp(letter);
});
function keyDown(letter) {
    switch (letter) {
        case 'left shift':
        case 'right shift':
            sendSocketMessage('S');
            break;
        case 'left ctrl':
        case 'right ctrl':
            sendSocketMessage('T');
            break;
    }
    //
}
function keyUp(letter) {
    switch (letter) {
        case 'left shift':
        case 'right shift':
            sendSocketMessage('I');
            break;
        case 'left ctrl':
        case 'right ctrl':
            sendSocketMessage('L');
            break;
        case 'return':
            sendSocketMessage('E');
            break;
        case 'backspace':
            sendSocketMessage('B');
            break;
        case 'f12':
            sendSocketMessage('P');
            break;
        case 'f11':
            sendSocketMessage('O');
            break;
        default:
            if (letter.length === 1)
                sendSocketMessage(letter);
            else
                console.log('UNKNOWN ' + letter);
    }
}
//# sourceMappingURL=send.js.map