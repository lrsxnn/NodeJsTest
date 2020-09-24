const ModuleId = require('../pb/lsEnum_pb').ModuleId;
const UdpSocket = require('../../UdpSocket');
const proto = require('../pb/cliReq_pb');

class SendProto {
    static createCliReq(methodId, userId = 1, moduleId = ModuleId.GAME) {
        let req = new proto.CliReq();
        req.setMethodid(methodId);
        req.setUserid(userId);
        req.setModuleid(moduleId);
        return req;
    };


    static cliEnterRoom(roomId = 0, name = "", userId = 1, moduleId = ModuleId.GAME) {
        let clienterroom = new proto.CliEnterRoom();
        clienterroom.setRoomid(roomId);
        clienterroom.setName(name);

        let req = this.createCliReq(proto.ClientMsgType.CLIENTERROOM, userId, moduleId);
        req.setClienterroom(clienterroom);

        let buffer = req.serializeBinary();
        UdpSocket.send(buffer);
    }

    static cliOperate(direction = "", isFire = false, playerId = 0, userId = 1, moduleId = ModuleId.GAME) {
        let clioperate = new proto.CliOperate();
        clioperate.setDirection(direction);
        clioperate.setIsfire(isFire);
        clioperate.setPlayerid(playerId);

        let req = this.createCliReq(proto.ClientMsgType.CLIOPERATE, userId, moduleId);
        req.setClioperate(clioperate);

        let buffer = req.serializeBinary();
        UdpSocket.send(buffer);
    }

    static cliInitOver(userId = 1, moduleId = ModuleId.GAME) {
        let cliinitover = new proto.CliInitOver();

        let req = this.createCliReq(proto.ClientMsgType.CLIINITOVER, userId, moduleId);
        req.setCliinitover(cliinitover);

        let buffer = req.serializeBinary();
        UdpSocket.send(buffer);
    }

}

module.exports = SendProto;
