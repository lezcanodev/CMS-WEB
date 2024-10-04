
import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from 'react-router-dom';

// card
function Card({
    id,
    columnIndex,
    cardIndex,
    title,
    moveCard,
    isSpacer,
    columnId
}) {
    const [, drag, preview] = useDrag({
      type: "CARD",
      item: {
        cardId: id,
        columnIndex,
        cardIndex,
        title,
        columnId
      }
    });
  
    const [, drop] = useDrop({
      accept: "CARD",
      hover: (_, monitor) => {
        moveCard(monitor.getItem().cardId, cardIndex, columnId);
      }
    });
  
    const spacer = isSpacer ? { backgroundColor: "purple", height: 200 } : "";
  
    const ref = useRef(null);
    drag(drop(ref));
  
    return (
      <div ref={preview} style={{background: 'green', height: '200px'}}>
        <div
          style={{ ...spacer,  border: "2px solid pink",  height: 'auto' }}
          ref={ref}
          className={`Card ${isSpacer ? "Card--spacer" : ""}`}
        >
          <div className="Card__title">{title}</div>
          <div className="Card__title">
            Titulo: admin
                <Link to={'/'}>Ver</Link>
            </div>
          <div className="Card__title">Autor: admin</div>
          <div className="Card__title">Categoria: Electronica</div>
        </div>
      </div>
    );
  }

//Column
function Column(props) {
    const [, drop] = useDrop({
      accept: "CARD",
      hover: (_, monitor) => {
        if (!props.hasTasks) {
          props.moveCard(monitor.getItem().cardId, 0, props.colIndex);
          debugger;
        }
      },
      drop: (item, monitor) => {
        console.log(item, monitor)
      }
    });
  
    return (
      <div className="Column" style={{background: 'black', width: '100%'}} ref={drop}>
        <Typography className="Column__title" color='primary' fontWeight={'bold'} textAlign={'center'}>{props.title}</Typography>
        {props.children}
      </div>
    );
  }

  
// board
function Board({ cards, columns, moveCard, addCard, addColumn }: any) {
    return (
      <div className="Board" style={{display: 'flex', background: 'yellow', width: '100%'}}>
        {columns.map((column, colIndex) => (
          <Column
            key={column.id}
            title={column.title}
            colIndex={colIndex}
            moveCard={moveCard}
            hasTasks={column.cardIds.length > 0}
          >
            {column.cardIds
              .map((cardId) => cards.find((card) => card.id === cardId))
              .map((card, index) => {
                return (
                  <Card
                    key={card.id}
                    id={card.id}
                    columnIndex={colIndex}
                    columnId={column.id}
                    cardIndex={index}
                    title={card.title}
                    moveCard={moveCard}
                  />
                );
              })}
            {column.cardIds.length === 0 && (
              <Card
                key={"efc37989-1ef7-4db1-a019-b41867e3b208"}
                isSpacer
                // moveCard={(cardId) => moveCard(cardId, 0, colIndex)}
              />
            )}
          </Column>
        ))}
      </div>
    );
  }

let _columnId = 0;
let _cardId = 0;

const initialCards = Array.from({ length: 9 }).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`
}));

const initialColumns = [ "Guardado", "Pendiente", "Publicado", "Rechazado"].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 4, i * 4 + 4).map((card) => card.id)
}));

export function Kanban(){
  const [cards, setCards] = useState(initialCards);
  const [columns, setColumns] = useState(initialColumns);
  const [kanabData, setKanbaData] = useState<any>();
  function moveCard(cardId, indexInColumn, destColumnId) {
   
    const cloneOfColums = [...columns];

    const updatedColumns = cloneOfColums.map((column) => {
      const filteredColumnTasks = column.cardIds.filter((id) => id !== cardId);

      let updatedTasks = [];
      if (column.id === destColumnId) {
        updatedTasks = [
          ...filteredColumnTasks.slice(0, indexInColumn),
          cardId,
          ...filteredColumnTasks.slice(indexInColumn)
        ];
        column.cardIds = updatedTasks;
      } else {
        setKanbaData({cardId, indexInColumn, destColumnId});
        column.cardIds = [...filteredColumnTasks];
      }

      return column;
    });
    setColumns(updatedColumns);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
        console.log(kanabData)
    }, 100)
    return () => clearTimeout(timeout);
  }, [kanabData])

  return (
    <DndProvider backend={HTML5Backend}>
      <Board cards={cards} columns={columns} moveCard={moveCard} />
    </DndProvider>
  );
}
