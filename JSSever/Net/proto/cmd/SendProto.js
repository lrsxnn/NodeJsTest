const Result = require('../pb/lsEnum_pb').Result;
const proto = require('../pb/srvRes_pb');

class SendProto {
    static createSrvRes(methodId, result = Result.SUCCESS, errStr = "") {
        let res = new proto.SrvRes();
        res.setMethodid(methodId);
        res.setResult(result);
        res.setErrstr(errStr);
        return res;
    };


    static bGameInit(kcpobj, seed = 0, pList = null, result = Result.SUCCESS, errStr = "") {
        let bgameinit = new proto.BGameInit();
        bgameinit.setSeed(seed);
        bgameinit.setPlist(pList);

        let res = this.createSrvRes(proto.SrvMsgType.BGAMEINIT, result, errStr);
        res.setBgameinit(bgameinit);

        let buffer = res.serializeBinary();
        let UdpSocket = require('../../UdpSocket');
        UdpSocket.send(kcpobj, buffer);
    }

    static srvEnterRoom(kcpobj, playerId = 0, result = Result.SUCCESS, errStr = "") {
        let srventerroom = new proto.SrvEnterRoom();
        srventerroom.setPlayerid(playerId);

        let res = this.createSrvRes(proto.SrvMsgType.SRVENTERROOM, result, errStr);
        res.setSrventerroom(srventerroom);

        let buffer = res.serializeBinary();
        let UdpSocket = require('../../UdpSocket');
        UdpSocket.send(kcpobj, buffer);
    }

    static srvInitOver(kcpobj, result = Result.SUCCESS, errStr = "") {
        let srvinitover = new proto.SrvInitOver();

        let res = this.createSrvRes(proto.SrvMsgType.SRVINITOVER, result, errStr);
        res.setSrvinitover(srvinitover);

        let buffer = res.serializeBinary();
        let UdpSocket = require('../../UdpSocket');
        UdpSocket.send(kcpobj, buffer);
    }

    static bGameFrame(kcpobj, fId = 0, operList = null, result = Result.SUCCESS, errStr = "") {
        let bgameframe = new proto.BGameFrame();
        bgameframe.setFid(fId);
        bgameframe.setOperlist(operList);

        let res = this.createSrvRes(proto.SrvMsgType.BGAMEFRAME, result, errStr);
        res.setBgameframe(bgameframe);

        let buffer = res.serializeBinary();
        let UdpSocket = require('../../UdpSocket');
        UdpSocket.send(kcpobj, buffer);
    }

    static bGameStart(kcpobj, result = Result.SUCCESS, errStr = "") {
        let bgamestart = new proto.BGameStart();

        let res = this.createSrvRes(proto.SrvMsgType.BGAMESTART, result, errStr);
        res.setBgamestart(bgamestart);

        let buffer = res.serializeBinary();
        let UdpSocket = require('../../UdpSocket');
        UdpSocket.send(kcpobj, buffer);
    }

}

module.exports = SendProto;
