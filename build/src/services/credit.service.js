"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCredit = addCredit;
exports.consumeCredits = consumeCredits;
exports.enqueueCredit = enqueueCredit;
exports.getAvailableCredits = getAvailableCredits;

var _helpers = require("../helpers/helpers");

var _credit = require("../schemas/credit.schema");

var _beeQueue = _interopRequireDefault(require("bee-queue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const creditQueue = new _beeQueue.default('credits', {
  activateDelayedJobs: true,
  redis: {
    host: "173.17.0.3"
  }
});
creditQueue.process(async function (job, done) {
  await addCredit({
    player: job.data.player
  });
  enqueueCredit({
    player: job.data.player
  });
  return done(null, "CREDIT ADDED");
});

async function addCredit({
  player
}) {
  const credit = new _credit.Credit({
    player,
    code: (0, _helpers.uuidv4)()
  });
  return await credit.save();
}

async function enqueueCredit({
  player
}) {
  try {
    const currentDate = new Date();
    const job = creditQueue.createJob({
      player
    });
    const nextCreditAt = (0, _helpers.addMinutes)(currentDate, 1);
    console.log(`${nextCreditAt.toDateString()} ${nextCreditAt.toTimeString()}`);
    job.delayUntil(nextCreditAt).save().then(job => {
      console.log("TIMER ADDED");
    }, err => {
      console.log("QUEUE ERROR: " + err);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getAvailableCredits({
  player
}) {
  const credits = await _credit.Credit.find({
    player,
    used_at: null
  }).count();
  return credits;
}

async function consumeCredits({
  noOfCredits,
  player
}) {
  const credits = await getAvailableCredits({
    player
  });

  if (credits >= noOfCredits) {
    const creditsToUse = await _credit.Credit.find({
      player,
      used_at: null
    }).limit(noOfCredits);
    await _credit.Credit.updateMany({
      _id: {
        $in: creditsToUse.map(c => c._id)
      }
    }, {
      used_at: new Date()
    });
    return {
      creditsToUse,
      creditsLeft: credits - noOfCredits
    };
  } else {
    throw Error("The Player doesnt have enough credits.");
  }
}