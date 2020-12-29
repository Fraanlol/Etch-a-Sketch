const drawingSpace = document.querySelector('.mainGrid');
let createGridRange = document.querySelector('#gridSquares');
let createGridButton = document.querySelector('.gridNumber');
let colNumber = parseInt(document.querySelector('#gridSquares').value);
let optionButtons = document.querySelectorAll('.color');
let clearButton = document.querySelector('.cleanGrid');
clearButton.addEventListener('click', eraser);
let gridToogle = document.querySelector('.toogleGrid');
gridToogle.addEventListener('click', toogleGridLines);
let color;

const createGridDivs = (colNumber) => { //Function to construct grids
    drawingSpace.style.cssText =`grid-template-columns:repeat(${colNumber}, auto); `
    for (i = 0 ; i < `${colNumber**2}` ; i++){
        let square = document.createElement('div');
        square.style.cssText = 'background-color:white; border:none; margin:0; padding:0; width:100%; height:100%; -webkit-user-drag: none;'
        square.classList.add('pixel')
        drawingSpace.appendChild(square);
    }
    updateGridNumber();
} 

function updateGridNumber(){ //Function to display the actual number of grids
    colNumber = parseInt(document.querySelector('#gridSquares').value);
    document.querySelector('.pixelCount').textContent=`${colNumber} x ${colNumber}`;
}

let newGrid = () => { //Function to create a new grid
    colNumber = parseInt(document.querySelector('#gridSquares').value);
    drawingSpace.innerHTML = ' '
    createGridDivs(colNumber);
    colorPicker();
}

createGridRange.addEventListener('mouseup', newGrid);  // Create a grid, using the Range input, available on Desktop
createGridButton.addEventListener('click', newGrid);  // Create a grid, using the button Create, because Range Input event is not available on Mobile

optionButtons.forEach((i) => { //This forEach adds a Click event to the OptionButtons and catch wich one was clicked to assign it to a variable
    i.addEventListener('click', () => {
        
        if (i.classList.contains('blackColor')) {
           return color = 'black';
        } else if ( i.classList.contains('greyColor')){
            return color = 'grey';
        } else if ( i.classList.contains('rainbowColor')){
            return color = 'rainbow';
        } else if (i.classList.contains('eraser')) {
            return color = 'white';
        } else if (i.classList.contains('pickColor')) { 
            
        }
    })
})

function colorPicker(){ //Using the variable from the forEach, this function does a forEach on every gridPixel, and adds the event mouseOver to allow draw, and sets the correct color to draw.
    color='black'; //Here i am setting a default value to color, to use it when the page loads without needing to click o Black button
    let everyDiv = document.querySelectorAll('.pixel');
    everyDiv.forEach((key) => {
        let count = 0; //This count is an internal counter to add opacity in the GreyScale, its value is reset when you pick another color
        key.addEventListener('mouseover' , () => {
            key.style.border='none';          
            if(color == 'rainbow'){
                key.style.backgroundColor = rainbow();
                count = 0;
                key.style.opacity = 1;
            }else if ( color == 'white'){              
                key.style.backgroundColor = color;
                key.style.opacity = 1;
                count = 0;
            } else if ( color == 'grey'){
                key.style.backgroundColor = 'black';
                count += 1
                key.style.opacity = 0.1 * count;
            } else {
                    key.style.backgroundColor = color;
                    count = 0;
                    key.style.opacity = 1;
            }
        })
    })
}

function rainbow(){ //This function returns a randomColor to make a RainbowEffect, i did it a Function because i need to call it whenever i mouseOver every div
    return `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`
}

function eraser(){ //This is a 'Reset' button, i need to call the colorPicker function again because im removing every div
    drawingSpace.innerHTML = ' ';
    createGridDivs(colNumber);
    colorPicker();
}

function toogleGridLines() {
    let borders = document.querySelector('.mainGrid');
    borders.classList.toggle('divBorder')
}

createGridDivs(colNumber);
colorPicker();





