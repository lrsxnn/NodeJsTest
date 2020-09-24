const receiveProto = require('../cmd/ReceiveProto');

class ReceiveProto extends receiveProto {
    _srvEnterRoom(msg, result, errStr) {
        console.log('srvEnterRoom');
    };

    _srvInitOver(msg, result, errStr) {
        console.log('srvInitOver');
    };

    _bGameInit(msg, result, errStr) {
        console.log('bGameInit');
    };

    _bGameStart(msg, result, errStr) {
        console.log('bGameStart');
    };

    _bGameFrame(msg, result, errStr) {
        console.log('bGameFrame');
    };
}

module.exports = ReceiveProto;