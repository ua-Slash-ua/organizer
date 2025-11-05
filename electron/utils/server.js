//server.js

const { exec } = require("child_process");

function startNextServer() {
    return exec("npm run start", (error) => {
        if (error) console.error("Next server error:", error);
    });
}

function stopNextServer(nextServer) {
    if (nextServer) nextServer.kill();
}

module.exports = { startNextServer, stopNextServer };
