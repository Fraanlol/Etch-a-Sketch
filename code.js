const drawingSpace = document.querySelector('.mainGrid');
let createGridRange = document.querySelector('#gridSquares');
let createGridButton = document.querySelector('.gridNumber');
let colNumber = parseInt(document.querySelector('#gridSquares').value);
let optionButtons = document.querySelectorAll('.color');
let clearButton = document.querySelector('.cleanGrid');
clearButton.addEventListener('click', eraser);
let gridToogle = document.querySelector('.toogleGrid');
gridToogle.addEventListener('click', toogleGridLines);
colorPalette = document.querySelector('.colorChoice');
colorPalette.addEventListener('mouseout', (e) => { return color = e.target.value; });

let color;
let drawing = false;

const createGridDivs = (colNumber) => { //Function to construct grids
    drawingSpace.style.cssText =`grid-template-columns:repeat(${colNumber}, auto); `
    for (i = 0 ; i < `${colNumber**2}` ; i++){
        let square = document.createElement('div');
        square.style.cssText = 'background-color:white; border:none; margin:0; padding:0; width:100%; height:100%; user-select:none;';
        square.dataset.greyScale = 0;
        square.setAttribute('draggable', 'false');
        square.classList.add('pixel')
        drawingSpace.appendChild(square);
    }
    updateGridNumber();
} 

const updateGridNumber = () => { //Function to display the actual number of grids
    colNumber = parseInt(document.querySelector('#gridSquares').value);
    document.querySelector('.pixelCount').textContent=`${colNumber} x ${colNumber}`;
}

const newGrid = () => { //Function to create a new grid
    colNumber = parseInt(document.querySelector('#gridSquares').value);
    drawingSpace.innerHTML = ' '
    createGridDivs(colNumber);
    colorPicker();
    colorDragger();
}

createGridRange.addEventListener('mouseup', newGrid);  // Create a grid, using the Range input, available on Desktop
createGridRange.addEventListener('click', newGrid);  // Create a grid, using the button Create, because Range Input event is not available on Mobile

optionButtons.forEach((everyButton) => { //This forEach adds a Click event to the OptionButtons and catch which one was clicked to assign it to a variable
    color='black';//Here i am setting a default value to color, to use it when the page loads without needing to click o Black button
    everyButton.addEventListener('click', () => {
         everyButton.classList.contains('blackColor') ? color = 'black' : false ;
         everyButton.classList.contains('greyColor') ? color = 'grey' : false ;
         everyButton.classList.contains('rainbowColor') ? color = 'rainbow' : false ;
         everyButton.classList.contains('eraser') ? color = 'white' : false ;
    })
})


const colorPicker = (e) => { //Using the variable from the forEach, this function does a forEach on every gridPixel, and adds the event mouseOver to allow draw, and sets the correct color to draw.
    let everyDiv = document.querySelectorAll('.pixel');
    everyDiv.forEach((key) => {
        key.addEventListener('mousedown', (e) => {
            if (color == 'rainbow'){
                e.target.dataset.greyScale = 0;
                e.target.style.backgroundColor = rainbow();
                e.target.style.opacity = 1;
            } else if ( color == 'white') {       
                e.target.dataset.greyScale = 0;         
                e.target.style.backgroundColor = color;
                e.target.style.opacity = 1;
            } else if ( color == 'grey') {
                e.target.style.backgroundColor = 'black';
                e.target.dataset.greyScale ++ ;
                e.target.style.opacity = 0.1 * e.target.dataset.greyScale;
            } else {
                e.target.dataset.greyScale = 0;
                e.target.style.backgroundColor = color;
                e.target.style.opacity = 1;
            }
        });
    })
}

const colorDragger = () => { 
    let everyDiv = document.querySelectorAll('.pixel');
    everyDiv.forEach((key) => {
        key.addEventListener('mouseenter' , (e) => {
            if (e.buttons > 0){
                key.style.border='none';          
                if(color == 'rainbow'){
                    key.style.backgroundColor = rainbow();
                    key.dataset.greyScale = 0;
                    key.style.opacity = 1;
                }else if ( color == 'white'){              
                    key.style.backgroundColor = color;
                    key.style.opacity = 1;
                    key.dataset.greyScale = 0;
                } else if ( color == 'grey'){
                    key.style.backgroundColor = 'black';
                    key.dataset.greyScale ++;
                    key.style.opacity = 0.1 * key.dataset.greyScale;
                } else {
                        key.style.backgroundColor = color;
                        key.dataset.greyScale = 0;
                        key.style.opacity = 1;
                }
            }  
        })
    })
}



function rainbow() { //This function returns a randomColor to make a RainbowEffect, i did it a Function because i need to call it whenever i mouseOver every div
    return `hsl(${Math.round(Math.random() * 360)},100%,50%)`
}

function eraser() { //This is a 'Reset' button, i need to call the colorPicker function again because im removing every div
    drawingSpace.innerHTML = ' ';
    createGridDivs(colNumber);
    colorPicker();
    colorDragger()
}

function toogleGridLines() {
    let borders = document.querySelector('.mainGrid');
    borders.classList.toggle('divBorder')
}

createGridDivs(colNumber);
colorPicker();
colorDragger();