let io;

module.exports = {
    init: httpServer  => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: () => {
        if(!io) {
        throw new error('socket.io is not initialized...!');
        } else {
            return io;
        }
    }
}