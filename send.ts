import {GlobalKeyboardListener} from "node-global-key-listener";
import * as WebSocket from 'ws';

const v = new GlobalKeyboardListener();

const ws = new WebSocket('ws://192.168.0.22:8081/stream', { /// 192.168.0.18:8081 tv =.22.
    perMessageDeflate: false
});

ws.on('open', function open() {
    console.log('socket open');
});

function sendSocketMessage(message) {
    console.log(message);
    ws.send(message);
};

const KEYS = {}
const specialChars = {
    space: ' ', comma: ',', dot: '.', quote: "'", section: '`', semicolon: ';', slash: '/',
    'square bracket open': '[', 'square bracket close': ']', 'forward slash': '/', bsckslash:' ', equals:'=', minus:'-'
};


v.addListener(function (e, down) {
    let letter: string = e.name.toLowerCase();
    letter = specialChars[letter] || letter;
    const state = e.state.toLowerCase();
  //  console.log(state + ' ' + letter);
    if (state === 'down') keyDown(letter);
    else keyUp(letter)
});

function keyDown(letter: string) {
    switch (letter) {
        case 'left shift':
        case 'right shift':
            sendSocketMessage('S');
            break;
        case 'left alt':
        case 'right alt':
            sendSocketMessage('A');
            break;
        case 'left ctrl':
        case 'right ctrl':
            sendSocketMessage('T');
            break;
    }
    //

}

function keyUp(letter: string) {
    switch (letter) {
        case 'left shift':
        case 'right shift':
            sendSocketMessage('I');
            break;
        case 'left ctrl':
        case 'right ctrl':
            sendSocketMessage('L');
            break;
        case 'left alt':
        case 'right alt':
            sendSocketMessage('Z');
            break;
        case 'return':
            sendSocketMessage('E');
            break;
        case 'backspace':
            sendSocketMessage('B');
            break
        case 'f12':
            sendSocketMessage('P');
            break
        case 'f11':
            sendSocketMessage('O');
            break
        case 'escape':
            sendSocketMessage('Q');
            break;
        case 'caps lock':
            sendSocketMessage('V');
            break

        case 'left arrow':
            sendSocketMessage('N');
            break;
        case 'right arrow':
            sendSocketMessage('M');
            break

        default :
            if(letter.length === 1)sendSocketMessage(letter);
            else console.log('UNKNOWN ' + letter);

    }

}
