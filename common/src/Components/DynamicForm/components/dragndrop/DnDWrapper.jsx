import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const DnDWrapper = ({
  children,
  droppableType,
  draggablePrefix,
  draggableId,
  placeholder,
  index,
  flex,
  direction,
  dropColor,
  droppableId
}) => {
  return (
    <Droppable
      droppableId={droppableId ? droppableId :`${droppableType}-${uuid()}`}
      type={droppableType}
      direction={direction === "horizontal" ? "horizontal" : "vertical"}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${flex ? "flex-fill w-100" : ""}`}
          style={{backgroundColor: snapshot.isDraggingOver ? dropColor : ""}}
        >
          <Draggable
            draggableId={`${draggablePrefix}${draggableId}`}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                id={`${draggablePrefix}-${draggableId}`}
              >
                {children}
              </div>
            )}
          </Draggable>
          {placeholder && provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DnDWrapper;
