import React, {useState} from 'react';
import UploadButton from "../UploadButton";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'


export const Test = () => {

    const dummyJobs = [
        {
            id: "a",
            title: "Job Number One",
            type: "Plumber",
            description: "My first job on the fixit platform",
            isActive: true
        },

        {
            id: "b",
            title: "Job Number Two",
            type: "Plumber",
            description: "My second job on the fixit platform",
            isActive: true
        },

        {
            id: "c",
            title: "Job Number Three",
            type: "Plumber",
            description: "My third job on the fixit platform",
            isActive: true
        },

        {
            id: "d",
            title: "Job Number Four",
            type: "Plumber",
            description: "My fourth job on the fixit platform",
            isActive: true
        }


    ]

    const defaultList = ["A", "B", "C", "D", "E"];
    // React state to track order of items
    const [itemList, setItemList] = useState(dummyJobs);

    // Function to update list on drop
    const handleDrop = (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...itemList];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update State
        setItemList(updatedList);
    };

    return (
        <div className="container st-4">
            <UploadButton />

            <div className="mt-3">
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                        {(provided) => (
                            <div
                                className="list-group"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {itemList.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                className="list-group-item"
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                {item.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>


            <div className="mt-3">
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                        {(provided) => (
                            <div
                                className="list-group"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {itemList.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                className="list-group-item"
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                {item.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>



        </div>
    );
};