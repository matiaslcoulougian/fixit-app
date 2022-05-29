import React, {useEffect, useState} from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from 'uuid'
import { v4 as uuidv4 } from 'uuid';



const JobColumns = () => {

    const [activeJobs, setActiveJobs] = useState([])
    const [disabledJobs, setDisabledJobs] = useState([])

    const dummyJobs = [
        {
            id: uuidv4(),
            title: "Job Number One",
            type: "Plumber",
            description: "My first job on the fixit platform",
            isActive: true
        },

        {
            id: uuidv4(),
            title: "Job Number Two",
            type: "Plumber",
            description: "My second job on the fixit platform",
            isActive: true
        },

        {
            id: uuidv4(),
            title: "Job Number Three",
            type: "Plumber",
            description: "My third job on the fixit platform",
            isActive: true
        },

        {
            id: uuidv4(),
            title: "Job Number Four",
            type: "Plumber",
            description: "My fourth job on the fixit platform",
            isActive: true
        }


    ]



    const columnsFromBackend = {
        [uuidv4()]: {
            name: "Active",
            items: dummyJobs
        },
        [uuidv4()]: {
            name: "Disabled",
            items: []
        }
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    function splitJobs(){
        let tempActiveJobs = []
        let tempDisabledJobs = []

        for (const job in dummyJobs) {
            if(job.isActive) activeJobs.push(job);
            else disabledJobs.push(job)
        }
        setActiveJobs(tempActiveJobs)
        setDisabledJobs(tempDisabledJobs)
    }




    useEffect(() => {
        splitJobs()
    });

    const [columns, setColumns] = useState(columnsFromBackend);
    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 500,
                                                    minHeight: 250
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            padding: 16,
                                                                            margin: "0 0 8px 0",
                                                                            minHeight: "50px",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        
                                                                        {item.title}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default JobColumns;