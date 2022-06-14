import {React, useCallback, useEffect, useRef, useState} from 'react';
import {NavBar} from "../NavBar";
import {GET_ME, GET_WORKER_POSTS} from "../../queries/queries";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {UPDATE_JOB_POSTS} from "../../queries/mutations";
import BackButton from "../BackButton";
import {Modal} from "@mui/material";




export const MyJobs = () => {

    function useAsyncState(initialState) {
        const [state, setState] = useState(initialState);
        const resolveState = useRef();
        const isMounted = useRef(false);

        useEffect(() => {
            isMounted.current = true;

            return () => {
                isMounted.current = false;
            };
        }, []);

        useEffect(() => {
            if (resolveState.current) {
                resolveState.current(state);
            }
        }, [state]);

        const setAsyncState = useCallback(
            newState =>
                new Promise(resolve => {
                    if (isMounted.current) {
                        resolveState.current = resolve;
                        setState(newState);
                    }
                }),
            []
        );

        return [state, setAsyncState];
    }

    const [targetId, setTargetId] = useAsyncState(0);
    const updateTargetId = async (id) => {
        const currentState = await setTargetId(prev => id);
        console.log(currentState);
    };




    let [jobList, setJobList] = useState();
    const [me, setMe] = useState();
    const [editMode, setEditMode] = useState(false);
    const [jobEditSuccessful, setJobEditSuccessful] = useState(false);
    const [saved, setSaved] = useState(false);
    const [focusJobEdit, setFocusJobEdit] = useState({title:"loading...", description:"loading..."});
    const [focusJob, setFocusJob] = useState({});
    const [myState, setMyState] = useState();
    const [openModal, setOpenModal] = useState(false)


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

        for (let activeJob of activeJobs) {
            let localJob = {
                title: activeJob.title,
                description: activeJob.description,
                id: activeJob.id
            };
            localJob.status = "active"
            fullList.push(localJob);
        }
        for (let inactiveJob of inactiveJobs){
            let localJob = {
                title: inactiveJob.title,
                description: inactiveJob.description,
                id: inactiveJob.id
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

    const updateJobInfo = (newTitle, newDescription) => {
        console.log("entered updateJobInfo")
        console.log(newDescription, newTitle)
        let editedJob = {...focusJob};
        if(newTitle) editedJob.title = newTitle;
        if(newDescription) editedJob.description = newDescription;
        console.log(editedJob)
        setFocusJob(editedJob)
        const newActive = columns.active.items.map((item) => {
            return item.id === editedJob.id ? editedJob : item
        })
        console.log(newActive)
        const newDisabled = columns.disabled.items.map((item) => {
            return item.id === editedJob.id ? editedJob : item
        })
        console.log(newDisabled)
        setColumns({["active"]: {name: "Active", items: newActive}, ["disabled"]: {name: "Disabled", items: newDisabled}})
        console.log("cols updated")
        setOpenModal(false)
    }

    const setSelectedJob = (id) => {
        updateTargetId(id)
        //await setFocusJobEdit(jobData)
        console.log("set triggered")
    };

    const EditJobModal = (props) => {
        const [newTitle, setNewTitle] = useState();
        const [newDescription, setNewDescription] = useState();

        const setTitle = (e) => {
            setNewTitle(e.target.value);
        };
        const setDescription = (e) => {
            setNewDescription(e.target.value);
        };

        return(
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
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
                                        <input className="form-control" id="job-title" rows="3" onChange={(e)=> setNewTitle(e.target.value)} defaultValue={focusJob.title}/>
                                    </div>


                                    <div className="mt-3">
                                        <label className="form-label" htmlFor="job-description">Description of the Job</label>
                                        <textarea className="form-control" id="job-description"  onChange={(e)=> setNewDescription(e.target.value)} rows="3" defaultValue={focusJob.description}></textarea>
                                    </div>

                                    {jobEditSuccessful && <div className="alert alert-success mt-2" role="alert">
                                        Job changed Successfully! Please close this window.
                                    </div>}
                                </div>
                                <hr/>
                            </div>
                            {/*updateJobInfo(newTitle, newDescription)}*/}
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(false)} >Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => updateJobInfo(newTitle, newDescription, focusJob)}>Save</button>
                            </div>



                        </div>
                    </div>
            </Modal>
        );
    }

    const handlePencilClick = (job) => {
        setFocusJob(job)
        setOpenModal(true)
    }

    return (
    <div>
        <EditJobModal />
        <NavBar isWorker={true} firstName={localStorage.getItem('firstName')}/>
        <div className={"container"}>
            <h1>Active Jobs</h1>
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

                                                                            <span><button onClick={() => handlePencilClick(item)} className={"btn btn-primary"}  disabled={!editMode}><i
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
            <BackButton/>
        </div>
    </div>
  );
};