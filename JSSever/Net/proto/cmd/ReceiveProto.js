const proto = require('../pb/cliReq_pb');

class ReceiveProto {
    kcpobj;

    receive(buffer, kcpobj) {
        this.kcpobj = kcpobj;
        let req = proto.CliReq.deserializeBinary(buffer);
        switch (req.getMethodid()) {
            case proto.ClientMsgType.CLIENTERROOM:
                this._cliEnterRoom(req.getClienterroom());
                break;
            case proto.ClientMsgType.CLIINITOVER:
                this._cliInitOver(req.getCliinitover());
                break;
            case proto.ClientMsgType.CLIOPERATE:
                this._cliOperate(req.getClioperate());
                break;
            default:
                console.log(`proto error no ${req.getMethodid()}`);
                break;
        }
    };

    _cliEnterRoom(msg) {
        console.log('-----------------------no implements cliEnterRoom-----------------------');
    };

    _cliInitOver(msg) {
        console.log('-----------------------no implements cliInitOver-----------------------');
    };

    _cliOperate(msg) {
        console.log('-----------------------no implements cliOperate-----------------------');
    };

}

module.exports = ReceiveProto;
