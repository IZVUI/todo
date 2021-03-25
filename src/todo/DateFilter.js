import React from "react";

export default ({props}) => {
    return (
        <div>
            <label style={{marginRight:5}}>
                <input type={"checkbox"} onChange={props.dateFilterChanged} value={"Today"}/>
                Today</label>
            <label style={{marginRight:5}}><input type={"checkbox"} onChange={props.dateFilterChanged} value={"This Week"}/>
                This Week</label>
            <label style={{marginRight:5}}><input type={"checkbox"} onChange={props.dateFilterChanged} value={"Passed"}/>
                Passed</label>
        </div>
    )
}