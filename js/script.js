const gameBoard = (() => {
    const board = document.querySelector('#board');
    let fields = [];
    
    const startUp = () => {
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
    };
})();

const displayController = (() =>{
    const populateField = () => {
       if(event.target.textContent == ''){
            if(game.turn == 1){
                event.target.textContent = '×';
                game.turn = 2;
            }else{
                event.target.textContent = '○';
                game.turn = 1;
            }
       }
    }
    return {
        populateField,
    }
})();

const game = (() => {
    let turn = 1;
    const check3InARow = () => {
       //for(let i = )

    }

    return{
        turn,
        check3InARow,
    }
})();

const player = (name, sign) => {
    

    return{
        name,
        sign,
    }
};

const player1 = player('Stefan', 'x');
const player2 = player('Coka', 'o');



window.onload = gameBoard.startUp();