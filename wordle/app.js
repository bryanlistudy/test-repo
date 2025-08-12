(function () {
  const WORD_LENGTH = 5;
  const NUM_ROWS = 6;

  const WORDS = [
    // Short list to keep the demo lightweight
    "about","other","which","their","there","first","would","these","click","price",
    "state","email","world","music","after","video","where","books","links","years",
    "order","items","group","under","games","could","great","hotel","store","terms",
    "right","local","those","using","phone","forum","based","black","check","index",
    "being","women","today","south","pages","found","house","photo","power","while",
    "three","total","place","think","north","posts","media","water","since","guide",
    "board","white","small","times","sites","level","hours","image","title","shall",
    "class","still","money","every","visit","tools","reply","value","press","learn",
    "print","stock","point","sales","large","table","start","model","human","movies",
    "march","yahoo","going","study","staff","again","april","never","users","topic",
    "below","party","login","legal","above","quote","story","rates","young","field",
    "paper","girls","night","texas","poker","issue","range","court","audio","light",
    "write","offer","given","files","event","china","needs","might","month","major",
    "areas","space","cards","child","enter","share","added","radio","until","color",
    "track","least","trade","david","green","close","drive","short","means","daily",
    "beach","costs","style","front","parts","early","miles","sound","works","rules",
    "final","adult","thing","cheap","third","gifts","cover","often","watch","deals",
    "words","linux","james","heart","error","clear","makes","india","taken","known"
  ];

  const boardEl = document.getElementById("board");
  const keyboardEl = document.getElementById("keyboard");
  const messageEl = document.getElementById("message");
  const restartBtn = document.getElementById("restart");

  const allowedSet = new Set(WORDS);
  const answer = WORDS[Math.floor(Math.random() * WORDS.length)];

  let currentRowIndex = 0;
  let currentColIndex = 0;
  let isGameOver = false;

  const rows = [];

  function createBoard() {
    for (let r = 0; r < NUM_ROWS; r += 1) {
      const rowEl = document.createElement("div");
      rowEl.className = "row";
      const tiles = [];
      for (let c = 0; c < WORD_LENGTH; c += 1) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.setAttribute("data-row", String(r));
        tile.setAttribute("data-col", String(c));
        rowEl.appendChild(tile);
        tiles.push(tile);
      }
      boardEl.appendChild(rowEl);
      rows.push(tiles);
    }
  }

  function keyboardLayout() {
    return [
      ["Q","W","E","R","T","Y","U","I","O","P"],
      ["","A","S","D","F","G","H","J","K","L",""],
      ["Enter","Z","X","C","V","B","N","M","Backspace"],
    ];
  }

  function createKeyboard() {
    const layout = keyboardLayout();
    layout.forEach((rowKeys, idx) => {
      const rowEl = document.createElement("div");
      rowEl.className = `kb-row row-${idx + 1}`;
      rowKeys.forEach((key) => {
        if (key === "") {
          const spacer = document.createElement("div");
          rowEl.appendChild(spacer);
          return;
        }
        const btn = document.createElement("button");
        btn.className = "key";
        btn.textContent = key.length === 1 ? key : key;
        btn.setAttribute("data-key", key);
        btn.type = "button";
        btn.addEventListener("click", () => handleInput(key));
        rowEl.appendChild(btn);
      });
      keyboardEl.appendChild(rowEl);
    });
  }

  function setMessage(text, timeoutMs = 1600) {
    messageEl.textContent = text;
    if (timeoutMs > 0) {
      window.clearTimeout(setMessage._t);
      setMessage._t = window.setTimeout(() => {
        messageEl.textContent = "";
      }, timeoutMs);
    }
  }

  function handleInput(key) {
    if (isGameOver) return;
    if (key === "Backspace") return onBackspace();
    if (key === "Enter") return onEnter();
    if (/^[A-Za-z]$/.test(key)) return onLetter(key.toLowerCase());
  }

  function onLetter(ch) {
    if (currentColIndex >= WORD_LENGTH) return;
    const tile = rows[currentRowIndex][currentColIndex];
    tile.textContent = ch.toUpperCase();
    tile.classList.add("filled");
    currentColIndex += 1;
  }

  function onBackspace() {
    if (currentColIndex === 0) return;
    currentColIndex -= 1;
    const tile = rows[currentRowIndex][currentColIndex];
    tile.textContent = "";
    tile.classList.remove("filled");
  }

  function onEnter() {
    if (currentColIndex < WORD_LENGTH) {
      setMessage("Not enough letters");
      return;
    }
    const guess = rows[currentRowIndex]
      .map((t) => (t.textContent || "").toLowerCase())
      .join("");
    if (!allowedSet.has(guess)) {
      setMessage("Not in word list");
      return;
    }
    const result = scoreGuess(guess, answer);
    revealRow(currentRowIndex, result);
    updateKeyboard(guess, result);

    if (guess === answer) {
      isGameOver = true;
      setMessage("You got it! 🎉", 0);
      restartBtn.hidden = false;
      return;
    }

    currentRowIndex += 1;
    currentColIndex = 0;
    if (currentRowIndex >= NUM_ROWS) {
      isGameOver = true;
      setMessage(`Answer: ${answer.toUpperCase()}`, 0);
      restartBtn.hidden = false;
    }
  }

  function scoreGuess(guess, answerWord) {
    const result = new Array(WORD_LENGTH).fill("absent");
    const answerChars = answerWord.split("");
    const guessChars = guess.split("");

    const freq = new Map();
    for (const ch of answerChars) {
      freq.set(ch, (freq.get(ch) || 0) + 1);
    }

    for (let i = 0; i < WORD_LENGTH; i += 1) {
      if (guessChars[i] === answerChars[i]) {
        result[i] = "correct";
        freq.set(guessChars[i], freq.get(guessChars[i]) - 1);
      }
    }

    for (let i = 0; i < WORD_LENGTH; i += 1) {
      if (result[i] !== "correct") {
        const ch = guessChars[i];
        if (freq.get(ch) > 0) {
          result[i] = "present";
          freq.set(ch, freq.get(ch) - 1);
        }
      }
    }
    return result; // array of "correct" | "present" | "absent"
  }

  function revealRow(rowIndex, result) {
    const tiles = rows[rowIndex];
    tiles.forEach((tile, i) => {
      const status = result[i];
      window.setTimeout(() => {
        tile.classList.add("reveal", status);
      }, i * 200);
    });
  }

  function updateKeyboard(guess, result) {
    for (let i = 0; i < guess.length; i += 1) {
      const ch = guess[i].toUpperCase();
      const keyBtn = keyboardEl.querySelector(`[data-key="${ch}"]`);
      if (!keyBtn) continue;
      const status = result[i];
      const current = keyBtn.dataset.state || "";
      const priority = { "": 0, absent: 1, present: 2, correct: 3 };
      if (priority[status] > priority[current]) {
        keyBtn.dataset.state = status;
        keyBtn.classList.remove("absent", "present", "correct");
        keyBtn.classList.add(status);
      }
    }
  }

  function onPhysicalKeydown(e) {
    const key = e.key;
    if (key === "Enter" || key === "Backspace") {
      e.preventDefault();
      handleInput(key);
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      e.preventDefault();
      handleInput(key.toUpperCase());
    }
  }

  function restart() {
    window.location.reload();
  }

  // Init
  createBoard();
  createKeyboard();
  document.addEventListener("keydown", onPhysicalKeydown);
  restartBtn.addEventListener("click", restart);
  setMessage("Guess the 5-letter word!");
})();


