// TODO Insert URL of the Server here
const URL = 'localhost:1337/';

function InitShip(shipData) {
    // TODO you can change your ship controls here if you want
    new Ship(shipData);
}

// Examle Ship Implementation
class Ship {
    constructor(shipData) {
        this.id = shipData.id;
        this.cannons = shipData.cannons;
        this.sight = shipData.sight;
        this.speed = shipData.speed;
        this.connect();
    }

    connect() {
        this.websocket = new WebSocket('ws://'+URL+'shipControl/'+this.id+'/'+TEAM+'/'+SECRET);
        this.websocket.onopen = (evt) => { this.onOpen(evt) };
        this.websocket.onclose = (evt) => { this.onClose(evt) };
        this.websocket.onmessage = (evt) => { this.onMessage(evt) };
        this.websocket.onerror = (evt) => { this.onError(evt) };
    }

    onOpen(evt) {
        console.log('Ship ' + this.id + ' ready');
    }

    onClose(evt) {
        console.log('Ship ' + this.id + ' disconnected');
    }

    onError(evt) {
        console.error('Ship ' + this.id + ' connection error', evt);
    }

    onMessage(evt) {
        let info = JSON.parse(evt.data);
        console.log(info);

        // TODO Implement your code for your ships here!

        // You have only 100ms time to react! Your Ship will dissapear after 60 Second Idle

        // Example:

        // Check if we are standing on a port and attack it
        const attack = [];
        if (info.Lookout) {
            const myTile = info.Lookout.Tiles.find(
                t => t.X === info.Lookout.X && t.Y === info.Lookout.Y
            );
            if (myTile && myTile.Port) {
                console.log('Attacking port: ' + myTile.Port.Id);
                attack.push(myTile.Port.Id);
            }
        }

        // Move in a random direction
        const directions = [
            { MoveX:  1, MoveY:  0 },
            { MoveX: -1, MoveY:  0 },
            { MoveX:  0, MoveY:  1 },
            { MoveX:  0, MoveY: -1 },
        ];
        const dir = directions[Math.floor(Math.random() * directions.length)];

        this.websocket.send(
            JSON.stringify({
                MoveX: dir.MoveX,
                MoveY: dir.MoveY,
                Attack: attack
            })
        );
    }
}