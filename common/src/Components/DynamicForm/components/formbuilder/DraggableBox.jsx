import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
// import "./DraggableBox.scss";

const DraggableBox = ({
  draggableLabelIcon,
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
                id={`${draggablePrefix}-${draggableId}`}
                className="text-start text-white mt-3 d-flex flex-row gap-2"
              >
                <i className={draggableLabelIcon}></i> {draggableLabel}
              </div>
            )}
          </Draggable>
        </div>
      )}
    </Droppable>
  );
};

export default DraggableBox;
