const drawingSpace = document.querySelector('.mainGrid');
let createGridRange = document.querySelector('#gridSquares');
let createGridButton = document.querySelector('.gridNumber');
let colNumber = parseInt(document.querySelector('#gridSquares').value);
let optionButtons = document.querySelectorAll('.color');
let clearButton = document.querySelector('.cleanGrid');
clearButton.addEventListener('click', eraser)
let gridToogle = document.querySelector('.toogleGrid');
gridToogle.addEventListener('click', toogleGridLines);

createGridRange.addEventListener('mouseup', () => { /* Creates grid on Desktop */
    colNumber = parseInt(document.querySelector('#gridSquares').value);
   drawingSpace.innerHTML = ' '
   createGridDivs(colNumber);
   colorPicker();
})

createGridButton.addEventListener('click', () => { /* Creates grid on Mobile */
    colNumber = parseInt(document.querySelector('#gridSquares').value);
    drawingSpace.innerHTML = ' '
    createGridDivs(colNumber);
    colorPicker();
 })


const createGridDivs = (colNumber) => {
    drawingSpace.style.cssText =`grid-template-columns:repeat(${colNumber}, auto); `
    for (i = 0 ; i < `${colNumber**2}` ; i++){
        let square = document.createElement('div');
        square.style.cssText = 'background-color:white; width:100%; height:100%; -webkit-user-drag: none;'
        square.classList.add('pixel')
        drawingSpace.appendChild(square);
    }
    updateGridNumber();
} 
createGridDivs(colNumber);
let color;

function rainbow(){
    return `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`
}



optionButtons.forEach((i) => {
   
    i.addEventListener('click', () => {
        
        if (i.classList.contains('blackColor')) {
           return color = 'black';
        } else if ( i.classList.contains('greyColor')){
            return color = 'grey';
        } else if ( i.classList.contains('rainbowColor')){
            return color = 'rainbow';
        } else if (i.classList.contains('eraser')) {
            return color = 'white';
        }
    })
})


function colorPicker(){
    color='black';
    let x = document.querySelectorAll('.pixel');
    x.forEach((key) => {
        let count = 0;
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
colorPicker();

function eraser(){
    
    drawingSpace.innerHTML = ' ';
    createGridDivs(colNumber);
    colorPicker();
}

function toogleGridLines() {
    let borders = document.querySelector('.mainGrid');
    borders.classList.toggle('divBorder')
}

function updateGridNumber(){
    colNumber = parseInt(document.querySelector('#gridSquares').value);
    document.querySelector('.pixelCount').textContent=`${colNumber} x ${colNumber}`;
}