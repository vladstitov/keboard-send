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
    baudRate: 9600
});
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        //  console.log('received ', data + '');
        serialPort.write(data + '\n');
    });
    ws.send('something');
});
