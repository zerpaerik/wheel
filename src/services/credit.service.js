import { addMinutes, uuidv4 } from "../helpers/helpers";
import { Credit } from "../schemas/creditSchema";
import Queue from "bee-queue";

export { addCredit, consumeCredits, getAvailableCredits, enqueueCredit };
const creditQueue = new Queue('credits', {
  activateDelayedJobs: true,
  redis: {
    host: "173.17.0.3"
  }
});

creditQueue.process(async function (job, done) {
  await addCredit({ player: job.data.player });
  enqueueCredit({ player: job.data.player });
  return done(null, "CREDIT ADDED");
})

async function addCredit({ player }) {
  const credit = new Credit({
    player,
    code: uuidv4(),
  });
  return await credit.save();
}

async function enqueueCredit({ player }) {
  try {
    const currentDate = new Date();
    const job = creditQueue.createJob({ player });
    const nextCreditAt = addMinutes(currentDate, 1);
    console.log(`${nextCreditAt.toDateString()} ${nextCreditAt.toTimeString()}`)
    job
      .delayUntil(nextCreditAt)
      .save()
      .then(job => {
        console.log("TIMER ADDED");
      }, err => {
        console.log("QUEUE ERROR: " + err)
      });
  } catch (error) {
    console.log(error);
  }
}

async function getAvailableCredits({ player }) {
  const credits = await Credit.find({
    player,
    used_at: null,
  }).count();
  return credits;
}

async function consumeCredits({ noOfCredits, player }) {
  const credits = await getAvailableCredits({ player });
  if (credits >= noOfCredits) {
    const creditsToUse = await Credit.find({ player, used_at: null }).limit(
      noOfCredits
    );
    await Credit.updateMany(
      {
        _id: {
          $in: creditsToUse.map((c) => c._id),
        },
      },
      {
        used_at: new Date(),
      }
    );
    return { creditsToUse, creditsLeft: credits - noOfCredits };
  } else {
    throw Error("The Player doesnt have enough credits.")
  }
}
