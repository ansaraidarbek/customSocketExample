const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 8080 });

wsServer.on('connection', onConnect);

function onConnect(client) {
    console.log('New user');

    client.on('close', function() {
        console.log('User disconnected');
    });

    // setTimeout(() => client.close(1000, 'Соединение прервано'), 5000);

    client.on('message', function(message) {
        try {
            const parsed = JSON.parse(message);
            switch (parsed.question) {
                case 'Rick 137 god?':
                    client.send(`He's more like a demon, or a super fucked-up god`);
                    break;
                case 'Life of earth?':
                    client.send('Around 4.5 billion years');
                    break;
                case 'How to eat sushi?':
                    client.send('If you don\'t know, then eat beshparmak man');
                    break;
                case 'Hello man':
                    client.send('Greetings');
                    break;
                case 'Are you a loser?':
                    client.send('Of course not');
                    break;
                default:
                    client.send('Did not understand you, enter questions from options list');
                    break;
            }
        } catch (error) {
            console.log('Error', error);
        }
    });
}

console.log('Server started on port 8080');