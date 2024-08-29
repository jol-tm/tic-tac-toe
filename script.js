$(document).ready(() => {
    $(".block").on("click", verifyPos);
    $("#restartBtn").on("click", () => {
        location.reload();
    });
    showPopUp(`Vez do "${player}"`);
})

// Matrix 3x3 to control de positions of O's and X's
let positions = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let player = "X";
let gameOver = false;
let turns = 0;

function verifyPos() {
    let block = $(this).attr("id");

    if (!gameOver) {
        if (block == "00") {
            setPos(0, 0, block);
        } else if (block == "01") {
            setPos(0, 1, block);
        } else if (block == "02") {
            setPos(0, 2, block);
        } else if (block == "10") {
            setPos(1, 0, block);
        } else if (block == "11") {
            setPos(1, 1, block);
        } else if (block == "12") {
            setPos(1, 2, block);
        } else if (block == "20") {
            setPos(2, 0, block);
        } else if (block == "21") {
            setPos(2, 1, block);
        } else if (block == "22") {
            setPos(2, 2, block);
        }
    }
}

function setPos(line, col, block) {
    if (positions[line][col] == "") {
        $("#" + block).html(`<span class="anim">${player}</span>`);
        positions[line][col] = player;
        turns++;
        if (!verifyGameOver()) {
            player == "O" ? player = "X" : player = "O";
            showPopUp(`Vez do "${player}"`);
        } else {
            gameOver = true;
        }
    } else {
        showPopUp("Posição já ocupada!");
    }
}

function showPopUp(message) {
    $(".popup").remove();
    $("body").append(`<div class="popup">${message}</div>`)
}

function paintLine(id1, id2, id3) {
    $("#" + id1).css("color", "var(--c1)");
    $("#" + id2).css("color", "var(--c1)");
    $("#" + id3).css("color", "var(--c1)");
}

function verifyGameOver() {
    if (positions[0][0] == player && positions[1][1] == player && positions[2][2] == player) {
        showPopUp(`Vitória do ${player} na diagonal!`);
        paintLine("00", "11", "22");
        return true;
    } else if (positions[0][2] == player && positions[1][1] == player && positions[2][0] == player) {
        showPopUp(`Vitória do ${player} na diagonal!`);
        paintLine("02", "11", "20");
        return true;
    } else if (positions[0][0] == player && positions[0][1] == player && positions[0][2] == player) {
        showPopUp(`Vitória do ${player} com uma linha horizontal na 1º linha!`);
        paintLine("00", "01", "02");
        return true;
    } else if (positions[1][0] == player && positions[1][1] == player && positions[1][2] == player) {
        showPopUp(`Vitória do ${player} com uma linha horizontal na 2º linha!`);
        paintLine("10", "11", "12");
        return true; 
    } else if (positions[2][0] == player && positions[2][1] == player && positions[2][2] == player) {
        showPopUp(`Vitória do ${player} com uma linha horizontal na 3º linha!`);
        paintLine("20", "21", "22");
        return true;
    } else if (positions[0][0] == player && positions[1][0] == player && positions[2][0] == player) {
        showPopUp(`Vitória do ${player} com uma linha vertical na 1º coluna!`);
        paintLine("00", "10", "20");
        return true;
    } else if (positions[0][1] == player && positions[1][1] == player && positions[2][1] == player) {
        showPopUp(`Vitória do ${player} com uma linha vertical na 2º coluna!`);
        paintLine("01", "11", "21");
        return true;
    } else if (positions[0][2] == player && positions[1][2] == player && positions[2][2] == player) {
        showPopUp(`Vitória do ${player} com uma linha vertical na 3º coluna!`);
        paintLine("02", "12", "22");
        return true; 
    } else if (turns >= 9){
        showPopUp("Empate!");
        return true;
    } else {
        return false;
    }
}