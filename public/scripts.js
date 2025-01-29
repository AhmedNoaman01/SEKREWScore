//Server-Side Server
// document.addEventListener("DOMContentLoaded", () => {
//   const playerForm = document.getElementById("add-player-form");
//   const playerInput = document.getElementById("player-input");
//   const playerList = document.getElementById("player-list");

//   // Add a new player
//   playerForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const name = playerInput.value.trim();
//       if (!name) return;
      
//       const response = await fetch("/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name, score: 0 })
//       });
      
//       if (response.ok) {
//           window.location.reload();
//       } else {
//           console.error("Failed to add player");
//       }
//   });

//   // Update player score
//   playerList.addEventListener("click", async (e) => {
//     if (e.target.classList.contains("Add-Score")) {
//         const playerItem = e.target.closest(".player-item");
//         const playerId = playerItem.dataset.id;
//         const scoreInput = prompt("Enter score to add:");
//         const scoreValue = parseInt(scoreInput, 10);
        
//         if (!isNaN(scoreValue)) {
//             const response = await fetch(`/${playerId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ score: scoreValue })
//             });
            
//             if (response.ok) {
//                 window.location.reload();
//             } else {
//                 console.error("Failed to update score");
//             }
//         } else {
//             alert("Please enter a valid number");
//         }
//     }
// });

//   // Delete a player
//   playerList.addEventListener("click", async (e) => {
//       if (e.target.classList.contains("delete-player")) {
//           const playerItem = e.target.closest(".player-item");
//           const playerId = playerItem.dataset.id;
          
//           const confirmation = confirm("Are you sure you want to delete this player?");
//           if (!confirmation) return;
          
//           const response = await fetch(`/${playerId}`, { method: "DELETE" });
          
//           if (response.ok) {
//               playerItem.remove();
//           } else {
//               console.error("Failed to delete player");
//           }
//       }
//   });

// //reset scores of the players 
//   const resetButton = document.getElementById("reset-player");
//   resetButton.addEventListener("click", async () => {
//     const confirmation = confirm("Are you sure you want to delete this player?");
//           if (!confirmation) return;
//       const response = await fetch("/players/reset", { method: "PUT" });
      
//       if (response.ok) {
//           window.location.reload();
//       } else {
//           console.error("Failed to reset scores");
//       }
//   });


// });

//Client Side Server


document.addEventListener("DOMContentLoaded", () => {
  const playerForm = document.getElementById("add-player-form");
  const playerInput = document.getElementById("player-input");
  const playerList = document.getElementById("player-list");
  const resetButton = document.getElementById("reset-player");

  // Load players from localStorage
  const loadPlayers = () => {
    const players = JSON.parse(localStorage.getItem("players")) || [];
// Sort players by score in descending order
  players.sort((a, b) => b.score - a.score);


    playerList.innerHTML = "";
    players.forEach((player, index) => {
      const playerItem = document.createElement("li");
      playerItem.classList.add("player-item");
      playerItem.dataset.id = index;
      playerItem.innerHTML = `
        ${player.name} - Score: ${player.score}
        <button class="Add-Score">Add Score</button>
        <button class="delete-player">Delete</button>
      `;
      playerList.appendChild(playerItem);
    });
  };

  // Save players to localStorage
  const savePlayers = (players) => {
    localStorage.setItem("players", JSON.stringify(players));
  };

  // Add a new player
  playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = playerInput.value.trim();
    if (!name) return;

    const players = JSON.parse(localStorage.getItem("players")) || [];
    players.push({ name, score: 0 });
    savePlayers(players);
    loadPlayers();
    playerInput.value = "";
  });

  // Update player score
  playerList.addEventListener("click", (e) => {
    if (e.target.classList.contains("Add-Score")) {
      const playerItem = e.target.closest(".player-item");
      const playerId = playerItem.dataset.id;
      const scoreInput = prompt("Enter score to add:");
      const scoreValue = parseInt(scoreInput, 10);

      if (!isNaN(scoreValue)) {
        const players = JSON.parse(localStorage.getItem("players")) || [];
        players[playerId].score += scoreValue;
        savePlayers(players);
        loadPlayers();
      } else {
        alert("Please enter a valid number");
      }
    }
  });

  // Delete a player
  playerList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-player")) {
      const playerItem = e.target.closest(".player-item");
      const playerId = playerItem.dataset.id;

      const confirmation = confirm("Are you sure you want to delete this player?");
      if (!confirmation) return;

      const players = JSON.parse(localStorage.getItem("players")) || [];
      players.splice(playerId, 1);
      savePlayers(players);
      loadPlayers();
    }
  });

  // Reset scores of the players
  resetButton.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to reset all scores?");
    if (!confirmation) return;

    const players = JSON.parse(localStorage.getItem("players")) || [];
    players.forEach(player => player.score = 0);
    savePlayers(players);
    loadPlayers();
  });

  // Initial load
  loadPlayers();
});
