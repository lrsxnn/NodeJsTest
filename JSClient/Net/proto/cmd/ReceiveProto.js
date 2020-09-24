const proto = require('../pb/srvRes_pb');

class ReceiveProto {
    receive(buffer) {
        let res = proto.SrvRes.deserializeBinary(buffer);
        switch (res.getMethodid()) {
            case proto.SrvMsgType.SRVENTERROOM:
                this._srvEnterRoom(res.getSrventerroom(), res.getResult(), res.getErrstr());
                break;
            case proto.SrvMsgType.SRVINITOVER:
                this._srvInitOver(res.getSrvinitover(), res.getResult(), res.getErrstr());
                break;
            case proto.SrvMsgType.BGAMEINIT:
                this._bGameInit(res.getBgameinit(), res.getResult(), res.getErrstr());
                break;
            case proto.SrvMsgType.BGAMESTART:
                this._bGameStart(res.getBgamestart(), res.getResult(), res.getErrstr());
                break;
            case proto.SrvMsgType.BGAMEFRAME:
                this._bGameFrame(res.getBgameframe(), res.getResult(), res.getErrstr());
                break;
            default:
                console.log(`proto error no ${res.getMethodid()}`);
                break;
        }
    };

    _srvEnterRoom(msg, result, errStr) {
        console.log('-----------------------no implements srvEnterRoom-----------------------');
    };

    _srvInitOver(msg, result, errStr) {
        console.log('-----------------------no implements srvInitOver-----------------------');
    };

    _bGameInit(msg, result, errStr) {
        console.log('-----------------------no implements bGameInit-----------------------');
    };

    _bGameStart(msg, result, errStr) {
        console.log('-----------------------no implements bGameStart-----------------------');
    };

    _bGameFrame(msg, result, errStr) {
        console.log('-----------------------no implements bGameFrame-----------------------');
    };

}

module.exports = ReceiveProto;
