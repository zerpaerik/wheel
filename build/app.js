"use strict";

var _express = _interopRequireDefault(require("express"));

var _moongoseRun = require("./src/services/moongose-run");

var _player = _interopRequireDefault(require("./src/routes/player.route"));

var _seed = _interopRequireDefault(require("./src/routes/seed.route"));

var _credit = _interopRequireDefault(require("./src/routes/credit.route"));

var _wheel = _interopRequireDefault(require("./src/routes/wheel.route"));

var _prizes = _interopRequireDefault(require("./src/routes/prizes.route"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 4000;
app.use(_bodyParser.default.urlencoded({
  extended: true
}), _bodyParser.default.json(), _player.default, _seed.default, _credit.default, _wheel.default, _prizes.default);
app.use(_express.default.static('./src/public'));
app.listen(port, () => {
  (0, _moongoseRun.connectToMongoDB)().then(() => console.log("mongodb connected")).catch(err => console.log(err));
  console.log(`Server started at port ${port}`);
});