const gameBoard = (() => {
    const board = document.querySelector('.board');
    let fields = []; // polja na tabli
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const startUp = () => {
        board.classList.add('x');
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
                    console.log("Winner x!");
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
                    console.log("Winner o!");
                    messageShow.win("O");
                    return;
                }
                game.turn = 1;
            }
            console.table(gameBoard.fields);
            if(game.checkDraw()){
                console.log("Its draw!")
            }
       }
    }
    return {
        populateField,
    }
})();

const game = (() => {
    let turn = 1;
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
    }
})();

const messageShow = (() => {
    const win = (sign) => {

    };

    const draw = () => {

    }
    return{
        win,
        draw,
        
    }
})();

const player = (name, sign) => {
    

    return{
        name,
        sign,
    }
};

const player1 = player('Stefan', 'x');
const player2 = player('Aleksa', 'o');



window.onload = gameBoard.startUp();