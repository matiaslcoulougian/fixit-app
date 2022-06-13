import {React, useEffect, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_ME, GET_WORKER_POSTS} from "../../queries/queries";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {Query} from "@apollo/client/react/components";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import {JobSearchBar} from "../JobSearchBar";
import {UPDATE_JOB_POSTS} from "../../queries/mutations";




export const MyJobs = () => {

    let [jobList, setJobList] = useState();
    const [me, setMe] = useState();
    const [editMode, setEditMode] = useState(false);
    const [jobEditSuccessful, setJobEditSuccessful] = useState(false);
    const [saved, setSaved] = useState(false);
    const [focusJobEdit, setFocusJobEdit] = useState({title:"loading...", description:"loading..."});

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

    const [updateJobPosts, {loading: updateLoading, error: updateError}] = useMutation(
        UPDATE_JOB_POSTS, {
            onCompleted: (res) => {
                setSaved(true);
                console.log("updated job status");
            },
            onError: (err) => {
                console.log(err);
            }
        }

    );

    const manageStatus = () => {

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
                console.log(typeof job.status)
                if (job.status === "active") tempActiveJobs.push(job);
                else if(job.status === "inactive") tempDisabledJobs.push(job);
            }
        }
        // setActiveJobs(tempActiveJobs)
        // setDisabledJobs(tempDisabledJobs)
        columnsFromBackend.disabled.items = tempDisabledJobs;
        columnsFromBackend.active.items = tempActiveJobs;
        setColumns(columnsFromBackend)
    }


    let [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
        getMe();
        splitJobs();
    }, [jobList]);

    const logColumns = () =>{
        console.log("Columns ", columns)
    }

    const enterEditMode = () => setEditMode(true);

    function save() {
        console.log("columns", columns)

        let activeJobs = [...columns.active.items]
        let inactiveJobs = [...columns.disabled.items]
        let fullList = [];

        for (let jobToActivate of activeJobs) {
            let localJob = {
                title: jobToActivate.title,
                description: jobToActivate.description,
                id: jobToActivate.id
            };
            localJob.status = "active"
            fullList.push(localJob);
        }
        for (let jobToDisable of inactiveJobs){
            let localJob = {
                title: jobToDisable.title,
                description: jobToDisable.description,
                id: jobToDisable.id
            };
            localJob.status = "inactive";
            fullList.push(localJob);
        }

        console.log("full jobs list", fullList)

        updateJobPosts({variables:{input:{jobPosts: fullList}}})

    }

    const exitEditMode = () => {
        setEditMode(false);
        save();
    }



    const EditJobModal = (job) => {
        function useForceUpdate(){
            const [value, setValue] = useState(0); // integer state
            return () => setValue(value => value + 1); // update state to force render
            // An function that increment 👆🏻 the previous state like here
            // is better than directly setting `value + 1`
        }

        const useForce = useForceUpdate();

        // useEffect(() => {
        //     useForce();
        // }, [focusJobEdit]);

        return(<div className="modal fade" id="edit-job-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title" id="modal-title">Edit Job</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>

                    </div>

                    <div className="modal-body border-0 py-0">
                        <hr/>
                        <div className="container">

                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-title"> New Job Title</label>
                                <input className="form-control" id="job-title" rows="3" onChange={useForce} value={focusJobEdit.title}/>
                            </div>


                            <div className="mt-3">
                                <label className="form-label" htmlFor="job-description">Description of the Job</label>
                                <textarea className="form-control" id="job-description"  rows="3">{focusJobEdit.description}</textarea>
                            </div>

                            {jobEditSuccessful && <div className="alert alert-success mt-2" role="alert">
                                Job changed Successfully! Please close this window.
                            </div>}

                        </div>
                        <hr/>
                    </div>

                    <div className="modal-footer border-0 pt-0">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                        <button type="button" className="btn btn-primary">Add Job</button>
                    </div>



                </div>
            </div>
        </div>);
    }



    return (
    <div>
        <EditJobModal/>
        <NavBar isWorker={true} firstName={localStorage.getItem('firstName')}/>
        <div className={"container"}>
            <h1>My Jobs</h1>
            {/*<div className={"container"}>*/}
            {/*    <h2>Active Jobs</h2>*/}

            {/*<div className={"btn btn-primary"} onClick={logColumns}>Log Columns</div>*/}
            <button disabled={editMode} className={"btn btn-primary me-1"} onClick={enterEditMode}>Edit</button>
            {editMode && <div className={"btn btn-primary ms-1"} onClick={exitEditMode}>Save</div>}

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
                                                                            <span ><button onClick={() => {setFocusJobEdit({title: item.title, description: item.description})}} className={"btn btn-primary"} data-bs-toggle="modal" data-bs-target="#edit-job-modal" disabled={!editMode}><i
                                                                                className="bi bi-pencil"></i></button></span>
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