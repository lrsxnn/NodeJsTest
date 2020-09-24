const kcp = require('node-kcp');
const dgram = require('dgram');
const INTERVAL = 200;
const ReceiveProto = require('./proto/func/ReceiveProto');

class UdpSocket {
    static _kcpobj;
    static _client;
    static _proto;

    static connectServer(address, port) {
        let regex = new RegExp("^((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})(\\.((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})){3}$");
        if (address.match(regex)) {
            this._connectByIP(address, port);
        } else {
            this._connectByHost(address, port);
        }
    };

    static _connectByIP(ip, port) {
        this._connect({
            address: ip,
            port: port
        })
    };

    static _connectByHost(host, port) {
        this._connect({
            address: host,
            port: port
        })
    };

    static _connect(context) {
        this._client = dgram.createSocket('udp4');
        this._kcpobj = new kcp.KCP(10, context);
        this._proto = new ReceiveProto();

        this._kcpobj.nodelay(0, INTERVAL, 0, 0);
        this._kcpobj.output((data, size, context) => {
            this._client.send(data, 0, size, context.port, context.address, (error) => {
                if (error) {
                    console.log(`client error:\n${error.stack}`);
                    this._client.close();
                }
            });
        })

        this._client.on('error', (err) => {
            console.log(`client error:\n${err.stack}`);
            this._client.close();
        });

        this._client.on('message', (msg, rinfo) => {
            this._kcpobj.input(msg);
        });

        setInterval(() => {
            this._kcpobj.update(Date.now());
            let recv = this._kcpobj.recv();
            if (recv) {
                console.log(`client recv`);
                // this._kcpobj.send(msg + (idx++));
                this._proto.receive(recv);
            }
        }, INTERVAL);
    };

    static send(buffer) {
        this._kcpobj.send(buffer);
    };
}

module.exports = UdpSocket;