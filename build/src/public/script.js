"use strict";

window.onload = function () {
  const player = localStorage.getItem("player");
  drawPrizes();

  if (player) {
    setupPlayer();
    setInterval(() => {
      drawCredits();
    }, 25000);
  }
};

document.getElementById("register-button").addEventListener("click", function () {
  const email = document.querySelector("#email").value;
  registerOrLoginPlayer({
    email
  }).then(resp => {
    localStorage.setItem("player", JSON.stringify(resp));
    document.querySelector("#email").value = "";
    setupPlayer();
    drawCredits();
  }).catch(e => {
    alert(e);
  });
});

function setupPlayer() {
  const player = getPlayer();

  if (player) {
    drawCredits();
    const logoutButton = document.createElement("button");
    logoutButton.innerText = `🛑 ${player.name}`;
    logoutButton.title = "Logout";

    logoutButton.onclick = function () {
      localStorage.clear();
      window.location.reload();
    };

    document.querySelector("#player-name").appendChild(logoutButton);
    document.querySelector("#login-section").style.display = "none";
    document.querySelector("#wheel-section").style.display = "block";
  }
}

function getPlayer() {
  return localStorage.getItem("player") && JSON.parse(localStorage.getItem("player"));
}

function drawCredits() {
  const player = getPlayer();
  fetchAvailableCredits({
    player
  }).then(credits => {
    redrawBasedOnCredits(credits);
    document.querySelector("#credits").innerText = `Credits: ${credits}`;
  });
}

function drawPrizes() {
  fetchPrizes().then(prizes => {
    const prizesEl = document.querySelector("#prizes");

    if (prizes.length === 0) {
      const seedButton = document.createElement("button");
      seedButton.innerText = "Seed prizes";

      seedButton.onclick = function () {
        seedPrizes();
      };

      prizesEl.appendChild(seedButton);
      return;
    }

    const table = document.createElement("table");
    let thead = document.createElement("thead");
    thead.innerHTML = `
                <th>Prize</th>
                <th>Credit cost</th>
                <th>% Chance</th>
                <th>Save</th>
            `;
    table.appendChild(thead);
    prizes.forEach(prize => {
      let tr = document.createElement("tr");
      let name = document.createElement("td");
      let credits = document.createElement("td");
      let percentage_chance = document.createElement("td");
      let update = document.createElement("td");
      name.innerText = prize.name;
      credits.innerText = prize.credit_cost;
      percentage_chance.innerHTML = `
                    <input id="${prize._id}" type="number" value="${prize.percentage_chance}" />
                `;
      update.innerHTML = `
                    <button onclick="updatePrizeSetting('${prize._id}')">💾</button>
                `;
      tr.appendChild(name);
      tr.appendChild(credits);
      tr.appendChild(percentage_chance);
      tr.appendChild(update);
      table.appendChild(tr);
    });
    prizesEl.append(table);
  });
}

async function roll(mode) {
  const player = getPlayer();
  const resp = await fetch("/wheel", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      player: player._id,
      noOfCredits: mode == "a" ? 1 : 2
    })
  });
  const data = await resp.json();
  document.querySelector("#result-prize").innerHTML = `Resultado: ${data.selectedPrize.name}`;
  redrawBasedOnCredits(data.creditsLeft);
}

function redrawBasedOnCredits(noOfCredits) {
  document.querySelector("#credits").innerText = `Credits: ${noOfCredits}`;

  if (noOfCredits < 2) {
    document.getElementById("rollb-2").style.visibility = "hidden";
  } else {
    document.getElementById("rollb-2").style.visibility = "visible";
  }

  if (noOfCredits >= 1) {
    document.getElementById("rollb-1").style.visibility = "visible";
  } else {
    document.getElementById("rollb-1").style.visibility = "hidden";
  }
}

async function seedPrizes() {
  const resp = await fetch("/seed/prizes");
  window.location.reload();
}

async function updatePrizeSetting(prizeId) {
  try {
    const percentage_chance = document.getElementById(prizeId).value;
    const updatedPrize = await fetch(`/prizes/${prizeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        percentage_chance
      })
    });
    return await updatedPrize.json();
  } catch (error) {
    console.log(error);
  }
}

async function registerOrLoginPlayer({
  email
}) {
  if (!email) return alert("Invalid mail");
  const resp = await fetch(`/player`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      name: email.replace(/@.*$/g, "")
    })
  });
  const data = await resp.json();
  return data;
}

async function fetchPrizes() {
  const resp = await fetch(`/prizes`);
  const data = await resp.json();
  return data;
}

async function fetchAvailableCredits({
  player
}) {
  const resp = await fetch(`/player/${player._id}/credits`);
  const data = await resp.json();
  return data;
}