const gameBoard = (() => {
    const board = document.querySelector('.board');
    let fields = []; // polja na tabli
    const WINNING_COMBINATIONS = [ // moguce kombinacije za pobedu
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const startUp = (isStart) => {
        _deleteBoard();
        if(game.startPlayer == 0 && isStart !== true){
            board.classList.remove('x');
            board.classList.add('o');
            game.turn = 2;
        }else{
            board.classList.remove('o');
            board.classList.add('x');
            game.turn = 1;
        }
        for(let i = 0; i < 9; i++){
            fields[i] = '';
            const field = document.createElement('div');
            field.classList.add("field");
            field.setAttribute('data-index', i);
            field.addEventListener('click', displayController.populateField);
            field.textContent = '';
            board.appendChild(field);
        }
    }

    const _deleteBoard = () => {
        let child  = board.lastElementChild;
        while(child){
            board.removeChild(child);
            child = board.lastElementChild;
        }
    }
    const render = () => {
        _deleteBoard();
        fields.forEach( fld => {
            const field = document.createElement('div');
            field.classList.add("field");
            field.textContent = fld;
            board.appendChild(field);
        })

    }
    return{
        startUp,
        board,
        fields,
        WINNING_COMBINATIONS,
    };
})();

const displayController = (() =>{
    const populateField = () => {
        if(!game.aiGame){
            if(!event.target.classList.contains('x') && !event.target.classList.contains('o')){
                    if(game.turn == 1){
                        gameBoard.board.classList.toggle('x');
                        gameBoard.board.classList.toggle('o');
                        event.target.classList.add('x');
                        gameBoard.fields[event.target.dataset.index] = 'x';
                        if(game.check3InARow('x')){
                           // console.log(game.check3InARow('x'));
                            messageShow.win('X', game.check3InARow('x'));
                            return;
                        }
                        game.turn = 2;
                    }else{
                        gameBoard.board.classList.toggle('x');
                        gameBoard.board.classList.toggle('o');
                        event.target.classList.add('o');
                        gameBoard.fields[event.target.dataset.index] = 'o';
                        if(game.check3InARow('o')){
                            messageShow.win("O", game.check3InARow('o'));
                            return;
                        }
                        game.turn = 1;
                    }
                    //console.table(gameBoard.fields);
                    if(game.checkDraw()){
                    // console.log("Its draw!")
                    messageShow.draw();
                    }
            }
        }else{
            if(!event.target.classList.contains('x') && !event.target.classList.contains('o') && game.nextPlayer != 'ai'){
                gameBoard.board.classList.toggle('x');
                gameBoard.board.classList.toggle('o');
                event.target.classList.add('o');
                gameBoard.fields[event.target.dataset.index] = 'o';
                if(game.check3InARow('o')){
                    messageShow.win("O", game.check3InARow("o"));
                    return;
                }
                if(game.checkDraw()){
                    messageShow.draw();
                }
                game.nextPlayer = 'ai'; // dok ne odigra komp ja ne mogu da igram
                setTimeout(function () {aiGame.bestMove()}, 1000);
                

               
            }
        }
    }
    return {
        populateField,
    }
})();

const game = (() => {
    let nextPlayer = 'ai';
    let aiGame = false;
    let startPlayer = 0;
    let turn = startPlayer + 1;
    const check3InARow = (sign) => {
       return gameBoard.WINNING_COMBINATIONS.find(rowOrCol => { // find da bih mogao da promenim boju
           return rowOrCol.every(field => {
               return gameBoard.fields[field] == sign;
           })
       })

    }
    const checkDraw = () => {
        return gameBoard.fields.every(field => {
            return field != '';
        })
    }

    return{
        turn,
        check3InARow,
        checkDraw,
        startPlayer,
        aiGame,
        nextPlayer,
    }
})();

const messageShow = (() => {
    const modal = document.querySelector("#modalBg");
    const message = document.querySelector("#message");
    const btnNewRound = document.querySelector("#newRound");
    const btnRestartGame = document.querySelector("#restartBtn");
    const score1 = document.querySelector("#score1");
    const score2 = document.querySelector("#score2");

    const win = (sign, winComb) => {
        modal.style.display = 'flex';
        message.textContent = `Winner is ${sign}!`;
        if(sign == 'X'){
            player1.score++;
            score1.textContent = player1.score;
            
        }else{
            player2.score++;
            score2.textContent = player2.score;
        }
        winComb.forEach(field => {
            document.querySelector(`[data-index="${field}"]`).style.backgroundColor = 'rgb(16, 201, 41)';
        })
    };

    const draw = () => {
        modal.style.display = 'flex';
        message.textContent = 'It\'s draw!'
    }

    const restartGame = () => {
        modal.style.display = 'none';
        player1.score = 0;
        player2.score = 0;
        score1.textContent = 0;
        score2.textContent = 0;
        gameBoard.startUp(true);
        if(game.aiGame){
            setTimeout(function () {aiGame.bestMove()}, 1000);
        }
    }

    const newRound = () => {
        modal.style.display = 'none';
        gameBoard.startUp(false);
        if(!game.aiGame){
            game.startPlayer = (game.startPlayer + 1)%2;
        }else{
            if(game.startPlayer == 0){
                game.startPlayer = 1;
                game.nextPlayer = 'human';
            }else{
                game.startPlayer = 0;
                setTimeout(function () {aiGame.bestMove()}, 1000);
            }
        }
    }


    btnNewRound.addEventListener('click', newRound);
    btnRestartGame.addEventListener('click', restartGame);

    return{
        win,
        draw,
    }
})();

const welcomePage = (() => {
    const btnPlayer = document.querySelector("#btnPlayer");
    const btnComputer = document.querySelector("#btnComputer");
    const container = document.querySelector("#welcome-container");
    const welcomePage = document.querySelector("#welcomePage");
    const gamePage = document.querySelector(".page-container");
    const ply1 = document.querySelector("#player1");
    const ply2 = document.querySelector("#player2");
    const body = document.querySelector("body");

    const showGameboard = () => {
        welcomePage.style.display = 'none';
        gamePage.style.display = 'flex';
        body.style.backgroundImage = `url('../images/tic-tac-toe.png')`;
        ply1.textContent = `${in1.value != '' ? in1.value : 'Player1'} (x)`;
        ply2.textContent = `${in2.value != '' ? in2.value : 'Player2'} (o)`;
               
    }

    const showAiGameboard = () => {
        welcomePage.style.display = 'none';
        gamePage.style.display = 'flex';
        body.style.backgroundImage = `url('../images/tic-tac-toe.png')`;
        ply1.textContent = 'Computer (x)';
        ply2.textContent = 'Player (o)';
        game.aiGame = true;
        setTimeout(function () {aiGame.bestMove()}, 1000);
    }

    const playerMenu = () => {
        container.innerHTML = `<div id="player1">
        <p>Player 1</p>
            <input id='in1' type="text">
        </div>
        <div id="player2">
            <p>Player 2</p>
            <input id='in2' type="text">
        </div>
        `;
        const btnPlay = document.createElement('button');
        btnPlay.textContent = 'Play';
        btnPlay.setAttribute('id', 'btnPlay');
        btnPlay.addEventListener('click', showGameboard);
        container.appendChild(btnPlay);
        const in1 = document.querySelector('#in1');
        const in2 = document.querySelector("#in2");
    }
   
    btnPlayer.addEventListener('click', playerMenu);
    btnComputer.addEventListener('click', showAiGameboard);

})();

const player = (name, sign) => {
    let score = 0;

    return{
        name,
        sign,
        score,
    }
};

const player1 = player('Stefan', 'x'); 
const player2 = player('Aleksa', 'o');



window.onload = gameBoard.startUp(true);
