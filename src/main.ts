import {GlobalKeyboardListener} from "node-global-key-listener";
const v = new GlobalKeyboardListener();

const KEYS = {}
const specialChars = {space: ' ', comma: ',',dot:'.', quote:"'", section:'`', semicolon: ';', slash: '/', backspace: 'B',
    'square bracket open':'[', 'square bracket close': ']', 'forward slash':'/'
};


v.addListener(function (e, down) {

    let letter: string = e.name.toLowerCase() ;

    letter = specialChars[letter] || letter;


    const state = e.state.toLowerCase();
    console.log(state)

   console.log(letter)
/// BBbbb   kk






    //
    /// fffh k kkserialPort.write(sent);jjotkk`ss`` vvcnp


});
