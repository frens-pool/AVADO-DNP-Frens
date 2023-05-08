const Gun = require('gun');

const server = require('http').createServer();
const gun = Gun({
    web: server
});

Gun.chain.createPool = ([args]) => {
    var gun = this;
    this.put({ whatever: Math.random() * 200, name: args["name"] });
    return this;
}

const port = 9998;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});