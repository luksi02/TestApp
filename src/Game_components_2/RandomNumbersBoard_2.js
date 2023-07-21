import React, { useState } from "react";
import Tile from "./Tile";function RandomNumbersBoard_2() {
    const [selectedTile, setSelectedTile] = useState(0);
    const [numbers, setNumbers] = useState(generateNumbers());
    const [message, setMessage] = useState("");
    const [revealedTiles, setRevealedTiles] = useState([]);  function generateNumbers() {
        const numbers = [];
        for (let i = 0; i < 64; i++) {
            const randomNumber = Math.floor(Math.random() * 10);
            numbers.push({ value: randomNumber, clicked: false, marked: false, reveal: false });
        }
        return numbers;
    }  function isAdjacent(firstIndex, secondIndex) {
        const rowDiff = Math.abs(Math.floor(firstIndex / 8) - Math.floor(secondIndex / 8));
        const colDiff = Math.abs((firstIndex % 8) - (secondIndex % 8));
        return (rowDiff === 0 && colDiff === 1) || (colDiff === 0 && rowDiff === 1);
    }  function handleTileClick(index) {
        if (index === selectedTile) {
            return;
        }    const newNumbers = [...numbers];
        const tile = newNumbers[index];    if (tile.clicked) {
            return;
        }    const selectedTileValue = newNumbers[selectedTile].value;    if (isAdjacent(selectedTile, index) && tile.value === selectedTileValue) {
            newNumbers[index].clicked = true;
            newNumbers[index].marked = true;
            newNumbers[selectedTile].marked = false;
            setSelectedTile(index);
            setMessage(`Tile ${index} revealed number ${tile.value}!`);
            setRevealedTiles((prevTiles) => [
                ...prevTiles,
                `Tile ${index} revealed number ${tile.value}!`,
            ]);
        } else {
            newNumbers[index].clicked = true;
            setMessage(`Tile ${index} revealed number ${tile.value}!`);
            setRevealedTiles((prevTiles) => [
                ...prevTiles,
                `Tile ${index} revealed number ${tile.value}!`,
            ]);
        }    setNumbers(newNumbers);
    }  return (
        <div className="board">
            {numbers.map((tile, index) => (
                <Tile
                    key={index}
                    value={tile.value}
                    clicked={tile.clicked}
                    marked={tile.marked}
                    reveal={tile.reveal}
                    onMouseEnter={() => setSelectedTile(index)}
                    onMouseLeave={() => setSelectedTile(null)}
                    onClick={() => handleTileClick(index)}
                />
            ))}
            <div className="message">{message}</div>
            <div className="revealed-tiles">
                <h3>Revealed Tiles:</h3>
                <ul>
                    {revealedTiles.map((tileMessage, index) => (
                        <li key={index}>{tileMessage}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}export default RandomNumbersBoard_2;