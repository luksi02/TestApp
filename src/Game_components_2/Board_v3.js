import React, { useState } from 'react';

function Tile({ id, value, color, onClick, onMouseEnter, onMouseLeave }) {
    const styles = {
        width: '50px',
        height: '50px',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2px',
        backgroundColor: color,
        color: 'white'
    };

    return (
        <div
            style={styles}
            onClick={() => onClick(id)}
            onMouseEnter={() => onMouseEnter(id)}
            onMouseLeave={() => onMouseLeave(id)}
        >
            {value}
        </div>
    );
}

function Board() {
    // const [tiles, setTiles] = useState(generateInitialTiles());
    const [clickLog, setClickLog] = useState([]);
    const [lastClicked, setLastClicked] = useState(null);
    const [currentTile, setCurrentTile] = useState(null);

    // function generateInitialTiles() {
    //     let newTiles = [];
    //     for (let i = 0; i < 64; i++) {
    //         newTiles.push({
    //             id: i,
    //             value: Math.floor(Math.random() * 10),
    //             color: i === 0 ? 'tile-green' : '',
    //             revealed: false
    //         });
    //     }
    //     return newTiles;
    // }

    // Create an array of 64 elements with values from 0 to 9.
    const randomNumbers = Array.from({ length: 63 }, () => Math.floor(Math.random() * 10));
// Add the number 10 to a random position in the array.
    randomNumbers.splice(Math.floor(Math.random() * 63), 0, 10);
// Initialize tiles
    const [tiles, setTiles] = useState(Array.from({ length: 64 }, (_, id) => ({
        id,
        value: randomNumbers[id],
        color: id === 0 ? '#008000' : '#FFFFFF',
        revealed: false,
    })));

    function handleClick(id) {
        if (isAdjacentToLastClicked(id) || id === 0) {
            const clickedTile = tiles.find(tile => tile.id === id);
            setTiles(tiles.map(tile => {
                if (tile.id === id) {
                    return { ...tile, color: '#FFA500', revealed: true, clickCount: (tile.clickCount || 0) + 1 }
                } else if (tile.id === currentTile) {
                    return { ...tile, color: '#0000FF' }
                }
                return tile;
            }));
            setLastClicked(id);
            setCurrentTile(id);
            setClickLog([...clickLog, clickedTile]);
            if (clickedTile.value === 10) {
                alert('You won!');
            }
        }
    }

    // function handleClick(id) {
    //     if (isAdjacentToLastClicked(id) || id === 0) {
    //         setTiles(tiles.map(tile => {
    //             if (tile.id === id) {
    //                 return { ...tile, color: '#FFA500', revealed: true, clickCount: (tile.clickCount || 0) + 1 }
    //             } else if (tile.id === currentTile) {
    //                 return { ...tile, color: '#0000FF' }
    //             }
    //             return tile;
    //         }));
    //         setLastClicked(id);
    //         setCurrentTile(id);
    //         const clickedTile = tiles.find(tile => tile.id === id);
    //         setClickLog([...clickLog, clickedTile]);
    //     }
    // }


    function handleMouseEnter(id) {
        if (isAdjacentToLastClicked(id)) {
            setTiles(tiles.map(tile =>
                !tile.revealed && tile.id === id ? { ...tile, color: '#008000' } :
                    tile.revealed && tile.id === id ? { ...tile, color: '#FFFF00' } : tile
            ));
        }
    }

    function handleMouseLeave(id) {
        if (isAdjacentToLastClicked(id)) {
            setTiles(tiles.map(tile =>
                !tile.revealed && tile.id === id ? { ...tile, color: '#FFFFFF' } :
                    tile.revealed && tile.id === id ? { ...tile, color: '#0000FF' } : tile
            ));
        }
    }

    function isAdjacentToLastClicked(id) {
        if (lastClicked === null) {
            return false;
        }
        // assuming an 8x8 grid
        const delta = Math.abs(lastClicked - id);
        const smallerId = Math.min(lastClicked, id);
        return (delta === 1 && smallerId % 8 !== 7) || delta === 8;
    }

    const boardStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)', // creates 8 columns
        gridGap: '2px', // space between tiles
    };

    return (
        <div style={boardStyle}>
            {tiles.map(tile =>
                <Tile
                    key={tile.id}
                    id={tile.id}
                    value={tile.revealed ? tile.value : ''}
                    color={tile.color}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            )}
            <ClickLog log={clickLog} />
        </div>
    );
}

function ClickLog({ log }) {
    return (
        <ul>
            {log.map((entry, index) =>
                <li key={index}>{`Tile ${entry.id} - Number: ${entry.value} - Clicked: ${entry.clickCount} times`}</li>
            )}
        </ul>
    );
}

export default Board;