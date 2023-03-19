import React, { useState } from "react"
import './TicTacToe.css'
function TicTacToe() {

    const [turn, setTurn] = useState("x");
    const [cells, setCells] = useState(Array(9).fill(""))
    const [winner, setWinner] = useState()
    const [click, setClick] = useState(0)
    const [draw, setDraw] = useState(false)

    const winnerCheck = (squares) => {
        let winningCombinations = {
            horizontal: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            vertical: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }
        for (let combo in winningCombinations) {
            // console.log(winningCombinations[combo][0])
            winningCombinations[combo].forEach((pattern) => {
                if (squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
                    setWinner(squares[pattern[0]])
                }
                // console.log(pattern)
            })
        }
    }

    const clickHandler = (cellNo) => {
        // alert(`cell ${cellNo} is clicked`)
        let squares = [...cells]
        if (click === 8) {
            setDraw(true)
        }
        if (cells[cellNo] !== "") {
            alert("cannot select same tile twice")
            return;
        }

        if (turn === 'x') {
            setClick(() => click + 1)
            squares[cellNo] = "x"//setting the value index(cellno) to x
            setTurn("o")
        } else {
            setClick(() => click + 1)
            squares[cellNo] = "o"
            setTurn("x")
        }
        winnerCheck(squares)
        setCells(squares)
        // console.log(click)
    }
    const Cell = ({ cellNo }) => {
        return <td style={{backgroundColor:"pink"}} onClick={() => { clickHandler(cellNo) }}>{cells[cellNo]}</td>
    }
    return <div className="container">
        {!winner && !draw && <table>
            <div className="player-margin">turn : <span className="player">{turn}</span></div>

            <tbody>
                <tr>
                    <Cell cellNo={0} />
                    <Cell cellNo={1} />
                    <Cell cellNo={2} />
                </tr>
                <tr>
                    <Cell cellNo={3} />
                    <Cell cellNo={4} />
                    <Cell cellNo={5} />
                </tr>
                <tr>
                    <Cell cellNo={6} />
                    <Cell cellNo={7} />
                    <Cell cellNo={8} />
                </tr>
            </tbody>
        </table>}
        {winner && !draw && (
            <>
                <p className="message">{winner} is the winner!</p>
                
                <button style={{height:"fit-content",position:"relative",top:"60px",left:"-75px"}} onClick={() => {
                    setWinner(null)
                    setCells(Array(9).fill(""))
                    setClick(0)
                }}>Restart</button>
                
            </>

        )}
        {draw && (
            <>
                <p className="message">The game result is Draw!!</p>
                <button style={{height:"fit-content",position:"relative",top:"60px",left:"-115px"}} onClick={() => {
                    setWinner(null)
                    setCells(Array(9).fill(""))
                    setClick(0)
                    setDraw(false)
                }}>Restart</button>
            </>
        )}
    </div>
}

export default TicTacToe