const canvasDiv = document.getElementById('canvas-div')
const boardCanvas = document.getElementById('board-canvas')
const boardCtx = boardCanvas.getContext('2d')
const mainCanvas = document.getElementById('main-canvas')
const mainCtx = mainCanvas.getContext('2d')

const knight = new Image()
knight.src = 'knight-icon.png'

const xSlider = document.getElementById('x-slider')
const ySlider = document.getElementById('y-slider')
const goButton = document.getElementById('go-button')
const speedButton = document.getElementById('speed-button')

// find screen width

let canvasWidth = (Math.floor(window.innerWidth / 100) * 100) - 100
let canvasHeight = (Math.floor(window.innerHeight / 100) * 100) - 100
console.log('width:', screen.width, '|', 'height:', screen.height)
console.log(canvasWidth, canvasHeight)
// canvasHeight = 900
// canvasWidth = 900

canvasDiv.style.width = `${canvasWidth}px`
canvasDiv.style.height = `${canvasHeight}px`
boardCanvas.width = canvasWidth
boardCanvas.height = canvasHeight
mainCanvas.width = canvasWidth
mainCanvas.height = canvasHeight

let squareSize
let xSliderValue = Number(xSlider.value)
let ySliderValue = Number(ySlider.value)
let boardWidth
let boardWidthStartingPoint
let boardHeight
let boardHeightStartingPoint

let animationInProgress = false

let animationSpeed = 1

const drawBoard = function () {
    xSliderValue = Number(xSlider.value)
    ySliderValue = Number(ySlider.value)

    if (canvasHeight / ySliderValue < canvasWidth / xSliderValue) {
        squareSize = canvasHeight / ySliderValue
        boardWidth = squareSize * xSliderValue
        boardHeight = squareSize * ySliderValue
        boardWidthStartingPoint = (canvasWidth - boardWidth) / 2
        boardHeightStartingPoint = 0
    }
    else {
        squareSize = canvasWidth / xSliderValue
        boardWidth = squareSize * xSliderValue
        boardHeight = squareSize * ySliderValue
        boardWidthStartingPoint = 0
        boardHeightStartingPoint = (canvasHeight - boardHeight) / 2
    }

    mainCtx.clearRect(0, 0, canvasWidth, canvasHeight)
    boardCtx.clearRect(0, 0, canvasWidth, canvasHeight)
    boardCtx.beginPath()

    //draw squares
    boardCtx.globalAlpha = 1
    boardCtx.fillStyle = 'rgb(205, 205, 205)'
    boardCtx.fillRect(boardWidthStartingPoint, boardHeightStartingPoint, boardWidth, boardHeight)
    boardCtx.fillStyle = 'rgb(50, 50, 50)'
    let whiteSquare
    for (let a = 0; a < xSliderValue; a++) {
        if (a % 2 != 0) {
            whiteSquare = true
        }
        else {
            whiteSquare = false
        }
        let squareStartX = boardWidthStartingPoint + (squareSize * a)
        for (let b = 0; b < ySliderValue; b++) {
            let squareStartY = boardHeightStartingPoint + (squareSize * b)
            if (whiteSquare) {
                boardCtx.fillRect(squareStartX, squareStartY, squareSize, squareSize)
            }
            whiteSquare = !whiteSquare
        }
    }
    // place knight
    mainCtx.drawImage(knight, boardWidthStartingPoint, boardHeightStartingPoint, squareSize, squareSize)
}

knight.addEventListener('load', drawBoard)

// window.addEventListener("resize", (event) => {  // resize canvas and redraw board
//     canvasWidth = (Math.floor(window.innerWidth / 100) * 100) - 100
//     canvasHeight = (Math.floor(window.innerHeight / 100) * 100) - 100

//     canvasDiv.style.width = `${canvasWidth}px`
//     canvasDiv.style.height = `${canvasHeight}px`
//     boardCanvas.width = canvasWidth
//     boardCanvas.height = canvasHeight
//     mainCanvas.width = canvasWidth
//     mainCanvas.height = canvasHeight

//     if (animationInProgress){
//         animationInProgress = false
//         setTimeout(drawBoard, 60)
//     }
//     else {
//         drawBoard()
//     }
// })

xSlider.addEventListener('change', (event) => {
    if (animationInProgress) {
        animationInProgress = false
        setTimeout(drawBoard, 60)
    }
    else {
        drawBoard()
    }
    document.getElementById('x-reader').innerHTML = `x:${xSlider.value}`
})

ySlider.addEventListener('change', (event) => {
    if (animationInProgress) {
        animationInProgress = false
        setTimeout(drawBoard, 60)
    }
    else {
        drawBoard()
    }
    document.getElementById('y-reader').innerHTML = `y:${ySlider.value}`
})

speedButton.addEventListener('click', (event) => {
    animationSpeed += 1
    animationSpeed %= 4
    console.log(animationSpeed)
    speedButton.firstElementChild.src = `speed${animationSpeed}.png`
})

let optionsAreSlidOut = false
const tabDivMovement = function() {
    if (optionsAreSlidOut) {
        document.getElementById('container-div').classList.remove('is-slid-out')
        document.getElementById('container-div').classList.add('is-not-slid-out')
        document.getElementById('tab-icon').src = 'tab-icon-forwards.png'
    }
    else {
        document.getElementById('container-div').classList.add('is-slid-out')
        document.getElementById('container-div').classList.remove('is-not-slid-out')
        document.getElementById('tab-icon').src = 'tab-icon-backwards.png'
    }
    optionsAreSlidOut = !optionsAreSlidOut
}
document.getElementById('tab-div').addEventListener('mousedown', tabDivMovement)
document.getElementById('tab-div').addEventListener('touchstart', tabDivMovement)

let flavourTextIsHidden = true
document.getElementById('flavour-text').style.visibility = 'hidden'
document.getElementById('flavour-text-button').addEventListener('click', (event) => {
    if (flavourTextIsHidden) {
        document.getElementById('flavour-text').classList.remove('flavour-text-invisible')
        document.getElementById('flavour-text').style.visibility = 'visible'
        document.getElementById('flavour-text-button').style.backgroundImage = 'url("flavour-icon-minus.png")'
    }
    else {
        document.getElementById('flavour-text').classList.add('flavour-text-invisible')
        document.getElementById('flavour-text').style.visibility = 'hidden'
        document.getElementById('flavour-text-button').style.backgroundImage = 'url("flavour-icon-plus.png")'
    }
    flavourTextIsHidden = !flavourTextIsHidden
})

function completeTour(totalX, totalY) {
    // const squirrelOrders = ['12345678', '21345678', '31245678', '13245678', '23145678', '32145678', '42135678',
    // '24135678', '14235678', '41235678', '21435678', '12435678', '13425678', '31425678',
    // '41325678', '14325678', '34125678', '43125678', '43215678']


    const squirrelOrders = ['12345678', '34567812', '56781234', '78123456', '21345678', '31245678', '13245678', '23145678', '32145678', '42135678',
        '24135678', '14235678', '41235678', '21435678', '12435678', '13425678', '31425678',
        '41325678', '14325678', '34125678', '43125678', '43215678'] // at least one of these will work if x and y are both less than 300

    for (let squirrelOrder of squirrelOrders) {// for every squirrel order
        const getPossibleNextSquares = function (squareInQuestion) { // find valid next squares and also the number of those valid next squares
            const coordsToAdd = [[1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2]]
            let possibleNextSquares = {}
            let trueCount = 0

            for (let i = 0; i < 8; i++) {
                let x = squareInQuestion[0] + coordsToAdd[i][0]
                let y = squareInQuestion[1] + coordsToAdd[i][1]
                if ((x < totalX && x >= 0) && (y < totalY && y >= 0) && !previouslyVisited.has(`${x},${y}`)) {
                    possibleNextSquares[[x, y]] = true
                    trueCount += 1
                }
                else {
                    possibleNextSquares[[x, y]] = false
                }
            }
            possibleNextSquares['trueCount'] = trueCount
            return possibleNextSquares
        }

        let tourPath = []
        let currentSquare = [0, 0]
        tourPath.push([0, 0])
        let previouslyVisited = new Set()
        previouslyVisited.add('0,0')
        const totalNoOfSquares = totalX * totalY
        while (true) {
            if (tourPath.length === totalNoOfSquares) {
                return tourPath
            }
            let nextSquares = getPossibleNextSquares(currentSquare)
            // console.table(nextSquares)
            let lowest = 8
            let squaresThatHaveTheLowest = []
            for (let i = 0; i < 8; i++) { // find lowest and add all that have the lowest to a list
                if (!nextSquares[Object.keys(nextSquares)[i]]) {
                    // console.log('false so not checking its count')
                    continue
                }
                let squareToCheck = Object.keys(nextSquares)[i].split(',').map(x => Number(x))
                let squareToChecksTrueCount = getPossibleNextSquares(squareToCheck)['trueCount']
                if (squareToChecksTrueCount < lowest) {
                    lowest = squareToChecksTrueCount
                    squaresThatHaveTheLowest = [squareToCheck.toString()]
                }
                else if (squareToChecksTrueCount === lowest) {
                    squaresThatHaveTheLowest.push(squareToCheck.toString())
                }
            }
            // console.table('squares that have the lowest is: ', squaresThatHaveTheLowest)
            // console.log('lowest', lowest)

            if (lowest === 0) { // check if we are at a dead end
                if (tourPath.length < totalNoOfSquares - 1) {
                    // console.log('the order:', squirrelOrder, 'didnt work, remaining squares is :', (totalNoOfSquares - tourPath.length))
                    break
                }
            }
            if (squaresThatHaveTheLowest.length === 1) { // if there is only one lowest.
                let nextSquare = squaresThatHaveTheLowest[0].split(',').map(x => Number(x))
                tourPath.push(nextSquare)
                previouslyVisited.add(nextSquare.toString())
                currentSquare = nextSquare
                // console.log('current square is now', currentSquare)
                continue
            }
            for (let char of squirrelOrder) { // go through squirrel list in  order of preference
                if (squaresThatHaveTheLowest.includes(Object.keys(nextSquares)[Number(char) - 1])) { // if that preference is in fact one of the ones that has the lowest. then that is next and reloop
                    let nextSquare = Object.keys(nextSquares)[Number(char) - 1].split(',').map(x => Number(x))
                    tourPath.push(nextSquare)
                    previouslyVisited.add(nextSquare.toString())
                    currentSquare = nextSquare
                    // console.log('current square is now', currentSquare)
                    break
                }
            }
        } // end of while loop
    } // end of squirrel loop
    // console.log('we made it to the end of the squirrel loop and none of them worked')
    return false
} // end of function

const performTour = function () {

    drawBoard()

    console.log('performing tour')
    let path = completeTour(xSliderValue, ySliderValue)
    path.shift()
    console.log('path:', path)

    boardCtx.fillStyle = 'red'
    boardCtx.lineWidth = 1
    boardCtx.lineCap = 'square'
    boardCtx.strokeStyle = 'green'
    boardCtx.moveTo(boardWidthStartingPoint + (squareSize / 2), boardHeightStartingPoint + (squareSize / 2))

    const animationSpeedObj = {
        0: 10,
        1: 10,
        2: 5,
        3: 1
    }
    let animationSpeedCopy = animationSpeed
    let animationCount = 0
    let currentPos = [0, 0]
    let nextPos = path.shift()

    const animatePath = function () {
        if (animationCount > animationSpeedObj[animationSpeedCopy]) { // move onto next position
            animationSpeedCopy = animationSpeed
            boardCtx.globalAlpha = 0.5
            boardCtx.fillRect(boardWidthStartingPoint + (squareSize * nextPos[0]), boardHeightStartingPoint + (squareSize * nextPos[1]), squareSize, squareSize)
            boardCtx.globalAlpha = 1
            animationCount = 0
            currentPos = nextPos
            if (!path.length) { // after completing the final move
                boardCtx.stroke()
                boardCtx.stroke()
                boardCtx.stroke()
                animationInProgress = false
                return
            }
            nextPos = path.shift()
        }

        mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)

        let animationIncrementX = ((squareSize * nextPos[0]) - (squareSize * currentPos[0])) / animationSpeedObj[animationSpeedCopy]
        let animationIncrementY = ((squareSize * nextPos[1]) - (squareSize * currentPos[1])) / animationSpeedObj[animationSpeedCopy]


        let newStepX = (boardWidthStartingPoint + (squareSize * currentPos[0])) + (animationIncrementX * animationCount)
        let newStepY = (boardHeightStartingPoint + (squareSize * currentPos[1])) + (animationIncrementY * animationCount)

        mainCtx.drawImage(knight, newStepX, newStepY, squareSize, squareSize)
        boardCtx.lineTo(newStepX + (squareSize / 2), newStepY + (squareSize / 2))
        boardCtx.stroke()

        animationCount += 1

        if (!animationInProgress) {
            animationInProgress = false
            return
        }
        if (animationSpeed >= 1) {
            window.requestAnimationFrame(animatePath)
        }
        else {
            setTimeout((f) => { window.requestAnimationFrame(animatePath) }, 50)
        }
    }

    animationInProgress = true
    boardCtx.globalAlpha = 0.5
    boardCtx.fillRect(boardWidthStartingPoint, boardHeightStartingPoint, squareSize, squareSize)
    boardCtx.globalAlpha = 1

    window.requestAnimationFrame(animatePath)
}

goButton.addEventListener('click', (event) => {
    if (animationInProgress) {
        animationInProgress = false
        setTimeout(performTour, 60)
    }
    else {
        performTour()
    }
})
