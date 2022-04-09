import React from 'react';


export const Test = () => {
    return (
        <div className="container st-4">
            <input type="text" className="form-control" placeholder={'Enter your name'} list="option-list"/>
            <datalist id="option-list">
                <option value="data"/>
                <option value="object"/>
                <option value="droga"/>
            </datalist>

        </div>
    );
};