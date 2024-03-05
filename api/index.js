const express = require('express');
const routerApi = require('./routes');

const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
const whitelist =  [
  'http://localhost:8000',
  'http://localhost:4200'
];
const corsOptions = {
  origin:(origin,callback)=>{
    if (whitelist.includes(origin)) {
      callback(null,true);
    }else{
      callback(new Error('Origen no permitido'));
    }
  }
}
app.use(cors(corsOptions));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);

app.listen(port, () => { });
