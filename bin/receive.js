"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialport_1 = require("serialport");
const ws_1 = require("ws");
const https = require("https");
const fs = require("fs");
const path = require("path");
const server = https.createServer({
    cert: fs.readFileSync(path.resolve('data/cert.pem')),
    key: fs.readFileSync(path.resolve('data/key.pem'))
});
const wss = new ws_1.WebSocketServer({ server });
server.listen(8081);
serialport_1.SerialPort.list().then(res => {
    console.log('list', res);
    // serialPort.write('ROBOT POWER ON')
});
const serialPort = new serialport_1.SerialPort({
    path: 'COM5',
    baudRate: 115200
});
let serialdata = '';
let lastSocket;
serialPort.addListener('data', function (data) {
    let str = data.toString();
    console.log('com:' + str);
    serialdata += str;
    if (str.includes('\n')) {
        if (lastSocket)
            lastSocket.send(serialdata);
        serialdata = '';
    }
});
wss.on('connection', function connection(ws) {
    setTimeout(() => {
        console.log('connected state :', ws.readyState);
        ws.send('Welcome');
        lastSocket = ws;
    }, 1000);
    ws.addEventListener('message', function (evt) {
        serialPort.write(evt.data.toString() + '\n');
    });
    ws.addEventListener('close', function (evt) {
        console.log('closed ', evt.code);
        if (lastSocket === ws)
            lastSocket = null;
    });
    ws.addEventListener('error', function (evt) {
        console.log('error ', evt);
    });
});
