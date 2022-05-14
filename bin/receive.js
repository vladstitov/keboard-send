"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = require("serialport");
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8081, path: '/stream' });
serialport_1.SerialPort.list().then(res => {
    console.log('list', res);
    // serialPort.write('ROBOT POWER ON')
});
const serialPort = new serialport_1.SerialPort({
    path: 'COM5',
    baudRate: 115200
});
wss.on('connection', function connection(ws) {
    setTimeout(() => {
        console.log('connected state :', ws.readyState);
        ws.send('Welcome');
    }, 1000);
    ws.addEventListener('message', function (evt) {
        serialPort.write(evt.data.toString() + '\n');
    });
    ws.addEventListener('close', function (evt) {
        console.log('closed ', evt.code);
    });
    ws.addEventListener('error', function (evt) {
        console.log('error ', evt);
    });
});
