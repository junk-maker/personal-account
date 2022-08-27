const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
const contactdb = JSON.parse(fs.readFileSync('./contact.json', 'utf-8'));

server.use(bodyParser.json());
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: true}));

const expiresIn = '10m';
const SECRET_KEY = '72676376';


function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
};

function isLoginAuthenticated({email, password}) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
};

server.post('/api/auth/login', (req, res) => {
  const {email, password} = req.body;
  console.log(req.body)

  if (!isLoginAuthenticated({email, password})) {
    let status = 401;
    let message = 'Incorrect Email or Password';
    res.status(status).json({status, message});
    return;
  };
  let access_token = createToken({email, password});
  res.status(200).json({access_token});
});

server.get('/api/contact/contact', (req, res) => {
  return res.status(200).json({contactdb});
});

server.post('/api/contact/contact', (req, res) => {
  const {name, email, phone, website} = req.body;

  fs.readFile('./contact.json', (err, data) => {
    if (err) {
      let status = 401;
      let message = err;
      res.status(status).json({status, message});
      return;
    };

    data = JSON.parse(data.toString());
    let last_item_id = data.contact[data.contact.length - 1]?.id === undefined ? 0 : data.contact[data.contact.length - 1].id;
    newData = data.contact.push({id: last_item_id + 1, name: name, email: email, phone: phone, website: website});

    fs.writeFile(
      './contact.json',
      JSON.stringify(data),
      (err, result) => {
        res.status(200).json({data});
        if (err) {
          let status = 401;
          let message = err;
          res.status(status).json({status, message});
          return;
        };
      }
    );
  });
});

server.put('/api/contact/contact', (req, res) => {
  const {id, name, email, phone, website} = req.body;

  fs.readFile('./contact.json', (err, data) => {
    if (err) {
      let status = 401;
      let message = err;
      res.status(status).json({status, message});
      return;
    };

    data = JSON.parse(data.toString());
    let index = data.contact.findIndex(val => val.id === id);
    data.contact.splice(index, 1, {id: id, name: name, email: email, phone: phone, website: website});

    fs.writeFile(
      './contact.json',
      JSON.stringify(data),
      (err, result) => {
        res.status(200).json({data});
        if (err) {
          let status = 401;
          let message = err;
          res.status(status).json({status, message});
          return;
        };
      }
    );
  });
});

server.delete('/api/contact/contact/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('./contact.json', (err, data) => {
    if (err) {
      let status = 401;
      let message = err;
      res.status(status).json({status, message});
      return;
    };

    data = JSON.parse(data.toString());
    let index = data.contact.findIndex(val => val.id === id);
    data.contact.splice(index, 1);

    fs.writeFile(
      './contact.json',
      JSON.stringify(data),
      (err, result) => {
        res.status(200).json({data});
        if (err) {
          let status = 401;
          let message = err;
          res.status(status).json({status, message});
          return;
        };
      }
    );
  });
});

server.listen(5000, () => {
  console.log('Running fake api json server');
});

