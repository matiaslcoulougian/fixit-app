import {React, useEffect, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_ME, GET_WORKER_POSTS} from "../../queries/queries";
import {useLazyQuery, useQuery} from "@apollo/client";
import {Query} from "@apollo/client/react/components";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';




export const MyJobs = () => {

    const [jobList, setJobList] = useState();
    const [me, setMe] = useState();
    const [editMode, setEditMode] = useState(false);


    const [getWorkerJobs, {loading: postsLoading}] = useLazyQuery(
        GET_WORKER_POSTS, {

            onCompleted: (res) =>{
                console.log("Get jobs list: ", res.getWorkerPosts);
                console.log("final Me: ", me);
                setJobList(res.getWorkerPosts);
                //splitJobs()
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    const [getMe, {loadingMe}] = useLazyQuery(
        GET_ME, {
            onCompleted:  (res) => {
                console.log(res.getMe)
                setMe(res.getMe);
                console.log(res.getMe.id)
                getWorkerJobs({variables:{workerId: res.getMe.id}});
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    const columnsFromBackend = {
        ["active"]: {
            name: "Active",
            items: []
        },
        ["disabled"]: {
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
        console.log("called splitJobs")
        console.log("joblist in splitjobs", jobList)
        let tempActiveJobs = []
        let tempDisabledJobs = []
        if(jobList) {
            for (let job of jobList) {
                console.log(typeof job.isActive)
                if (job.isActive === "true") tempActiveJobs.push(job);
                else tempDisabledJobs.push(job)
            }
        }
        // setActiveJobs(tempActiveJobs)
        // setDisabledJobs(tempDisabledJobs)
        columnsFromBackend.disabled.items = tempDisabledJobs;
        columnsFromBackend.active.items = tempActiveJobs;
        setColumns(columnsFromBackend)
    }


    const [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
        getMe();
        splitJobs();
    }, [jobList]);

    const logColumns = () =>{
        console.log("Columns ", columns)
    }

    const enterEditMode = () => setEditMode(true);
    const exitEditMode = () => {
        setEditMode(false);
    }

  return (
    <div>
        <NavBar firstName={localStorage.getItem('firstName')}/>
        <div className={"container"}>
            <h1>My Jobs</h1>
            {/*<div className={"container"}>*/}
            {/*    <h2>Active Jobs</h2>*/}

            <div className={"btn btn-primary"} onClick={logColumns}>Log Columns</div>
            <button disabled={editMode} className={"btn btn-primary"} onClick={enterEditMode}>Edit</button>
            {editMode && <div className={"btn btn-primary"} onClick={exitEditMode}>Save</div>}

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
                                                    <div className={"d-flex justify-content-center"}>
                                                        {postsLoading && <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>}

                                                    </div>
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                                isDragDisabled={!editMode}
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
                                                                            className={"d-flex justify-content-between align-items-start"}
                                                                        >

                                                                            {item.title}
                                                                            <span className={"btn btn-primary"}><i
                                                                                className="bi bi-pencil"></i></span>
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






        </div>


    </div>
  );
};