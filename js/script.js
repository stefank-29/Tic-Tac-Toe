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
            field.addEventListener('click', displayController.populateField, {once : true});
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
       if(!event.target.classList.contains('x') || !event.target.classList.contains('o')){
            if(game.turn == 1){
                gameBoard.board.classList.toggle('x');
                gameBoard.board.classList.toggle('o');
                event.target.classList.add('x');
                gameBoard.fields[event.target.dataset.index] = 'x';
                if(game.check3InARow('x')){
                    //console.log("Winner x!");
                    messageShow.win('X');
                    return;
                }
                game.turn = 2;
            }else{
                gameBoard.board.classList.toggle('x');
                gameBoard.board.classList.toggle('o');
                event.target.classList.add('o');
                gameBoard.fields[event.target.dataset.index] = 'o';
                if(game.check3InARow('o')){
                    //console.log("Winner o!");
                    messageShow.win("O");
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
    }
    return {
        populateField,
    }
})();

const game = (() => {
    let startPlayer = 0;
    let turn = startPlayer + 1;
    const check3InARow = (sign) => {
       return gameBoard.WINNING_COMBINATIONS.some(rowOrCol => {
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
    }
})();

const messageShow = (() => {
    const modal = document.querySelector("#modalBg");
    const message = document.querySelector("#message");
    const btnNewRound = document.querySelector("#newRound");
    const btnRestartGame = document.querySelector("#restartBtn");
    const score1 = document.querySelector("#score1");
    const score2 = document.querySelector("#score2");

    const win = (sign) => {
        modal.style.display = 'flex';
        message.textContent = `Winner is ${sign}!`;
        if(sign == 'X'){
            player1.score++;
            score1.textContent = player1.score;
            
        }else{
            player2.score++;
            score2.textContent = player2.score;
        }
        //console.log(player1.score);
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
    }

    const newRound = () => {
        modal.style.display = 'none';
        gameBoard.startUp(false);
        game.startPlayer = (game.startPlayer + 1)%2;
    }


    btnNewRound.addEventListener('click', newRound);
    btnRestartGame.addEventListener('click', restartGame);

    return{
        win,
        draw,
    }
})();

const player = (name, sign) => {
    let score = 0;

    return{
        name,
        sign,
        score,
    }
};

const player1 = player('Stefan', 'x'); // ovo zakomentarisati (pri pokretanju se pravi)
const player2 = player('Aleksa', 'o');



window.onload = gameBoard.startUp(true);


//Todo - Obojiti drugom bojom pobenicku kombinaciju
//Todo - Rezultat trenutni
//Todo - 
//Todo
//Todo