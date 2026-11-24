document.addEventListener("DOMContentLoaded", () => {
  const playerForm = document.getElementById("add-player-form");
  const playerInput = document.getElementById("player-input");
  const playerList = document.getElementById("player-list");
  const resetButton = document.getElementById("reset-player");
  const storageError = document.getElementById("storage-error");
  const storageKey = "players";
  let players = [];

  const showError = (message) => {
    storageError.textContent = message;
    storageError.hidden = false;
  };

  const clearError = () => {
    storageError.textContent = "";
    storageError.hidden = true;
  };

  const renderPlayers = () => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const items = sortedPlayers.map((player) => {
      const playerItem = document.createElement("li");
      playerItem.classList.add("player-item");
      playerItem.dataset.id = player.id;

      const name = document.createElement("span");
      name.classList.add("task-name");
      name.textContent = player.name;

      const score = document.createElement("span");
      score.classList.add("player-score");
      score.textContent = String(player.score);

      const addScoreButton = document.createElement("button");
      addScoreButton.type = "button";
      addScoreButton.classList.add("Add-Score");
      addScoreButton.textContent = "Add Score";

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.classList.add("delete-player");
      deleteButton.textContent = "Delete Player";

      playerItem.append(name, score, addScoreButton, deleteButton);
      return playerItem;
    });

    playerList.replaceChildren(...items);
  };

  const savePlayers = (nextPlayers) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextPlayers));
      players = nextPlayers;
      clearError();
      renderPlayers();
      return true;
    } catch (error) {
      showError(`Could not save players in this browser: ${error.message}`);
      return false;
    }
  };

  const loadPlayers = () => {
    const savedPlayers = localStorage.getItem(storageKey);
    if (savedPlayers === null) {
      return [];
    }

    const parsedPlayers = JSON.parse(savedPlayers);
    if (!Array.isArray(parsedPlayers)) {
      throw new Error("Saved player data is not a list.");
    }

    let needsMigration = false;
    const loadedPlayers = parsedPlayers.map((player) => {
      if (
        !player ||
        typeof player.name !== "string" ||
        !Number.isSafeInteger(player.score)
      ) {
        throw new Error("Saved player data is invalid.");
      }

      if (typeof player.id === "string" && player.id.length > 0) {
        return { id: player.id, name: player.name, score: player.score };
      }

      needsMigration = true;
      return {
        id: crypto.randomUUID(),
        name: player.name,
        score: player.score,
      };
    });

    if (needsMigration) {
      localStorage.setItem(storageKey, JSON.stringify(loadedPlayers));
    }

    return loadedPlayers;
  };

  const createPlayerId = () => crypto.randomUUID();

  try {
    players = loadPlayers();
    renderPlayers();
  } catch (error) {
    showError(`Could not load saved players: ${error.message}`);
    playerForm.querySelectorAll("input, button").forEach((control) => {
      control.disabled = true;
    });
    resetButton.disabled = true;
    return;
  }

  playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = playerInput.value.trim();
    if (!name) return;

    if (savePlayers([...players, { id: createPlayerId(), name, score: 0 }])) {
      playerInput.value = "";
    }
  });

  playerList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    const playerItem = button?.closest(".player-item");
    if (!playerItem) return;

    const playerId = playerItem.dataset.id;
    const player = players.find((candidate) => candidate.id === playerId);
    if (!player) return;

    if (button.classList.contains("Add-Score")) {
      const scoreInput = prompt("Enter score to add:");
      if (scoreInput === null) return;

      const scoreValue = scoreInput.trim() === "" ? Number.NaN : Number(scoreInput);
      const updatedScore = player.score + scoreValue;
      if (
        !Number.isSafeInteger(scoreValue) ||
        !Number.isSafeInteger(updatedScore)
      ) {
        alert("Please enter a valid whole number.");
        return;
      }

      savePlayers(
        players.map((candidate) =>
          candidate.id === playerId
            ? { ...candidate, score: updatedScore }
            : candidate,
        ),
      );
      return;
    }

    if (button.classList.contains("delete-player")) {
      if (!confirm("Are you sure you want to delete this player?")) return;

      savePlayers(players.filter((candidate) => candidate.id !== playerId));
    }
  });

  resetButton.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to reset all scores?");
    if (!confirmation) return;

    savePlayers(players.map((player) => ({ ...player, score: 0 })));
  });
});
