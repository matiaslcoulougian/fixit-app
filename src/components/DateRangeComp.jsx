import React, {useEffect, useRef, useState} from "react";
import format from "date-fns/format";
import {DateRange} from "react-date-range";

export const DateRangeComp = (props) => {

    // date state


    // open close
    const [open, setOpen] = useState(false)

    // get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        // console.log(e.key)
        if( e.key === "Escape" ) {
            setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        // console.log(refOne.current)
        // console.log(e.target)
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }

    return (
        <div className="calendarWrap">

            <input
                value={`${format(props.range[0].startDate, "MM/dd/yyyy")} to ${format(props.range[0].endDate, "MM/dd/yyyy")}`}
                readOnly
                className="inputBox"
                onClick={ () => setOpen(open => !open) }
            />

            <div ref={refOne}>
                {open &&
                    <DateRange
                        onChange={item => props.setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={props.range}
                        months={1}
                        direction="horizontal"
                        className="calendarElement"
                    />
                }
            </div>

        </div>
    )
}