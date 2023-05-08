let flag = true; // mark of player one defaults to "O"
let count = 0;
let p1Flag = flag;
let p2Flag = !flag;

//flagSelect function ---> sets the mark of player one
function flagSelect(id){
    if(id == 'X'){
        flag = false;
    } else {
        flag = true;
    }
    p1Flag = flag;
    p2Flag = !flag;
}

// playerFlag function ---> toggles between symbols of the 2 players
function playerFlag(flag){
    if(flag){
        return "O";
    } else {
        return "X";
    }
}

// handleClick function ---> writes the symbol to the tile
function handleClick(id){

    // Code to implement forced choosing of player one mark
    // if(flag == undefined){
    //     let markDial = document.getElementById("mark-dialog");
    //     markDial.showModal();

    //     setTimeout(() => {
    //         markDial.close();
    //     }, 2000)
    //     return;
    // }

    let winTiles = [];

    //get values of all tiles
    let T1 = document.getElementById("tile1");
    let T2 = document.getElementById("tile2");
    let T3 = document.getElementById("tile3");
    let T4 = document.getElementById("tile4");
    let T5 = document.getElementById("tile5");
    let T6 = document.getElementById("tile6");
    let T7 = document.getElementById("tile7");
    let T8 = document.getElementById("tile8");
    let T9 = document.getElementById("tile9");

    //disable mark selection buttons
    document.getElementById("X").disabled = true;
    document.getElementById("O").disabled = true;

    //Write mark to tile
    let elem = document.getElementById(id);
    let mark = playerFlag(flag);
    elem.value = mark;
    elem.disabled = true;
    if(count%2 === 0){
        elem.style.color = "pink";
    } else {
        elem.style.color = "yellow";
    }

    //checking for win condition
    count+=1;
    if(count >= 5){
        winTiles = checkWin(T1, T2, T3, T4, T5, T6, T7, T8, T9);
    }

    //When win condition met, lock the tiles
    if(winTiles.length > 0){
        for(let i = 0; i<winTiles.length; i++){
            winTiles[i].classList.add("lock");
        }

        //disable all tiles untill reset
        let tiles = document.getElementsByClassName("tile");
        for(let i=0; i<tiles.length; i++){
            tiles[i].disabled = true;
        }

        if(flag == p1Flag){
            //Player 1 wins
            let p1win = document.getElementById("p1win");
            p1win.showModal();

            setTimeout(() => {
                p1win.close();
                resetBoard();
            }, 3000)

        } else {
            //Player 2 wins
            let p2win = document.getElementById("p2win");
            p2win.showModal();

            setTimeout(() => {
                p2win.close();
                resetBoard();
            }, 3000)
        }
    }

    //toggle flag
    flag = !flag;
}


//resetBoard function ---> resets the board
function resetBoard(){
    const tiles = document.getElementsByClassName("tile");
    for(let i=0; i<tiles.length; i++){
        tiles[i].value = "";
        tiles[i].disabled = false;
        tiles[i].classList.remove("lock");
    }

    //enable mark selection buttons
    document.getElementById("X").disabled = false;
    document.getElementById("O").disabled = false;

    //reset count and flag
    count = 0;
    flag = true;
    p1Flag = flag;
    p2Flag = !flag;
}

//resetAll function ---> resets everything
// function resetAll(){

// }


//checkWin function ---> checks all tiles to see if a win condition is met
function checkWin(T1, T2, T3, T4, T5, T6, T7, T8, T9){
    let win = [];
    let t1 = T1.value;
    let t2 = T2.value;
    let t3 = T3.value;
    let t4 = T4.value;
    let t5 = T5.value;
    let t6 = T6.value;
    let t7 = T7.value;
    let t8 = T8.value;
    let t9 = T9.value;
    
    if((t1 == t2 && t2 == t3) && (t1 != false)){
        win = [T1, T2, T3];
    } else if((t4 == t5 && t5 == t6) && (t4 != false)){
        win = [T4, T5, T6];
    } else if((t7 == t8 && t8 == t9) && (t7 != false)){
        win = [T7, T8, T9];
    } else if((t1 == t4 && t4 == t7) && (t1 != false)){
        win = [T1, T4, T7];
    } else if((t2 == t5 && t5 == t8) && (t2 != false)){
        win = [T2, T5, T8];
    } else if((t3 == t6 && t6 == t9) && (t3 != false)){
        win = [T3, T6, T9];
    } else if((t1 == t5 && t5 == t9) && (t1 != false)){
        win = [T1, T5, T9];
    } else if((t3 == t5 && t5 == t7) && (t3 != false)){
        win = [T3, T5, T7];
    } else {
        return win;
    }

    return win;
}