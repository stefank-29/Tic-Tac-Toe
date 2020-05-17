//TODO Game board, displayController (moduli)
//TODO players



const gameBoard = (() => {
    const board = document.querySelector('#board');
    let fields = ['x', 'o', 'x','x', 'o', 'x','x', 'o', 'x'];
    
    const render = () => {
        fields.forEach( fld => {
            const field = document.createElement('div');
            field.classList.add("field");
            field.textContent = fld;
            board.appendChild(field);
        })

    }
    return{
        render,
    };
})();

const displayController = (() =>{




})();

const player = (name, sign) => {
    
};