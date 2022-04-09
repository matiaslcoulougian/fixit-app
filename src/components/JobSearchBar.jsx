import React, {useState} from "react";

export const JobSearchBar = (props) => {
    const [text, setText] = useState("");



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

}