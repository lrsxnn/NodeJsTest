const receiveProto = require('../cmd/ReceiveProto');
const sendProto = require('../cmd/SendProto');

class ReceiveProto extends receiveProto {
    _cliEnterRoom(msg) {
        console.log('cliEnterRoom');
        sendProto.srvEnterRoom(this.kcpobj, 1);
    };

    _cliInitOver(msg) {
        console.log('cliInitOver');
    };

    _cliOperate(msg) {
        console.log('cliOperate');
    };
}

module.exports = ReceiveProto;