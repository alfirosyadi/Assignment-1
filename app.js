const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html');
        res.write('<head><title>Welcome</title></head>');
        res.write('<body><form action="create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users') {
        res.write('<html>');
        res.write('<head><title>Dummy User</title></head>');
        res.write('<body><h>List of Dummy Users</h>');
        res.write('<ul><li>Muhammad</li><li>Alfi</li><li>Rosyadi</li></ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            fs.writeFile('username.txt', username, err => {
                res.statusCode = 302;
                res.setHeader('Dummy', '/users');
                return res.end();
            });
        });
    }
});

server.listen(4000);