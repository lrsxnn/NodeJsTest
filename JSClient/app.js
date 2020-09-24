const UdpSocket = require("./Net/UdpSocket");
const SendProto = require("./Net/proto/cmd/SendProto");

UdpSocket.connectServer('127.0.0.1', 8881);
SendProto.cliEnterRoom(1, 'lrsxnn');