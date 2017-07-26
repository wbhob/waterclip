import * as bluetooth from 'node-bluetooth';
import * as wifi from 'node-wifi';

export function getWifiNetworks() {
    const device = new bluetooth.DeviceINQ();

    var list = [];

    device
        .on('finished', console.log.bind(console, 'finished'))
        .on('found', function found(address, name) {

            console.log('Found: ' + address + ' with name ' + name);

            // find serial port channel
            device.findSerialPortChannel(address, (channel) => {
                console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

                // make bluetooth connect to remote device
                bluetooth.connect(address, channel, (err, connection) => {
                    if (err) return console.error(err);

                    connection.on('data', (buffer) => {
                        console.log('received message:', buffer.toString());
                    });

                    connection.write(new Buffer('Hello!', 'utf-8'), () => {
                        console.log('wrote');
                    });
                });

            });

        }).inquire();
};

