"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPlayer = addPlayer;

var _player = require("../schemas/player.schema");

var _credit = require("./credit.service");

async function addPlayer({
  name,
  email
}) {
  let p = await loginIfExists({
    email
  });

  if (p) {
    return p;
  }

  p = new _player.Player({
    name,
    email
  });
  const player = await p.save();
  (0, _credit.enqueueCredit)({
    player: player._id
  });
  return player;
}

async function loginIfExists({
  email
}) {
  const player = await _player.Player.findOne({
    email
  });
  return player;
}