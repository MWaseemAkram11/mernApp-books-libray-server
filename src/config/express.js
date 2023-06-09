const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const frontRoutes = require('../api/routes/index');
const rateLimit = require("express-rate-limit");
const frontMiddleWare = require("../api/middlewares/auth")
const bearerToken = require('express-bearer-token');
const compression = require('compression');
const app = express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bearerToken());

app.use(methodOverride());
const apiRequestLimiterAll = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 90000
});


app.use("/", apiRequestLimiterAll);
app.use(frontMiddleWare.tokenVerification);

app.use(bearerToken());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

// compress all responses
app.use(compression());

app.use('/system', frontRoutes);
app.use('/system/get', `hellowworld`)

module.exports = app;