import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import "./DraggableBox.scss";

const DraggableBox = ({
  draggableLabel,
  draggablePrefix,
  draggableId,
  type,
}) => {
  return (
    <Droppable droppableId={`sidebar-${uuid()}`} type={type}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Draggable
            draggableId={`${draggablePrefix}-${draggableId}`}
            index={0}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // className="type-box "
                className="drag-box bg-light border-dark border rounded-pill p-2 my-3 fs-5"
                id={`${draggablePrefix}-${draggableId}`}
              >
                {draggableLabel}
              </div>
            )}
          </Draggable>
          {/* {provided.placeholder} */}
        </div>
      )}
    </Droppable>
  );
};

export default DraggableBox;
