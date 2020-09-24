const kcp = require('node-kcp');
const dgram = require('dgram');
const INTERVAL = 200;
const ReceiveProto = require('./proto/func/ReceiveProto');

class UdpSocket {
    static _proto;
    static _clients;
    static _server;

    static connect() {
        this._server = dgram.createSocket('udp4');
        this._proto = new ReceiveProto();
        this._clients = {};

        this._server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this._server.close();
        });

        this._server.on('message', (msg, rinfo) => {
            let k = rinfo.address + '_' + rinfo.port;
            if (this._clients[k] === undefined) {
                let context = {
                    address: rinfo.address,
                    port: rinfo.port
                };
                let kcpobj = new kcp.KCP(10, context);
                kcpobj.nodelay(0, INTERVAL, 0, 0);
                kcpobj.output((data, size, context) => {
                    this._server.send(data, 0, size, context.port, context.address, (error) => {
                        if (error) {
                            console.log(`server error:\n${error.stack}`);
                            this._server.close();
                        }
                    });
                });
                this._clients[k] = kcpobj;
            }
            let kcpobj = this._clients[k];
            kcpobj.input(msg);
        });

        this._server.on('listening', () => {
            let address = this._server.address();
            console.log(`server listening ${address.address} : ${address.port}`);
            setInterval(() => {
                for (let k in this._clients) {
                    let kcpobj = this._clients[k];
                    kcpobj.update(Date.now());
                    let recv = kcpobj.recv();
                    if (recv) {
                        console.log(`server recv from ${kcpobj.context().address}:${kcpobj.context().port}`);
                        this._proto.receive(recv, k);;
                    }
                }
            }, INTERVAL);
        });

        this._server.bind(8881);
    };

    static send(k, buffer) {
        let kcpobj = this._clients[k];
        if (this._clients[k] === undefined) {
            console.error('client error ' + k);
        } else {
            kcpobj.send(buffer);
        }
    };
}

module.exports = UdpSocket;