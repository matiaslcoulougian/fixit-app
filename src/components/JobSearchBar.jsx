import React, {forwardRef, useImperativeHandle, useState} from "react";

export const JobSearchBar = forwardRef((props, ref) => {
    const [text, setText] = useState("");
    const jobTypeList = ['Full Time', 'Part Time', 'Freelance', 'Internship'];
    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({


        getText(){
            return text;
        }



    }));

    return(
        <div>
            <input type="text" style={props.style ? props.style : null} onChange={event => setText(event.target.value)} className="form-control" placeholder="Search for a job..." aria-label="Recipient's username" aria-describedby="button-addon2" list="job-type-list" />
            <datalist id="job-type-list">
                {jobTypeList.map((jobType) => <option value={jobType}/>)}
            </datalist>
        </div>
    );
});

/*
export const JobSearchBar = (props) => {
    const [text, setText] = useState("");

    getText(){
        return text;
    }



    //const jobTypeList = getJobTypeList();
    const jobTypeList = ['Full Time', 'Part Time', 'Freelance', 'Internship'];

    //onChange={(e) => setSearchedTerm(e.target.value)}
    return(
        <div>
            <input type="text" style={props.style ? props.style : null} onChange={event => setText(event.target.value)} className="form-control" placeholder="Search for a job..." aria-label="Recipient's username" aria-describedby="button-addon2" list="job-type-list" />
            <datalist id="job-type-list">
                {jobTypeList.map((jobType) => <option value={jobType}/>)}
            </datalist>
        </div>
    );

}*/