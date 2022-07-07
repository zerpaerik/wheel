import { Player } from "../schemas/playerSchema";
import { enqueueCredit } from "./credit.service";
export { addPlayer };

async function addPlayer({ name, email }) {
  let p = await loginIfExists({ email });
  if (p) {
    return p;
  }
  p = new Player({
    name,
    email
  });
  const player = await p.save();
  enqueueCredit({ player: player._id });
  return player;
}

async function loginIfExists({ email }) {
  const player = await Player.findOne({ email });
  return player;
}