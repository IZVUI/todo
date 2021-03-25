import React from "react";

export default ({props}) => {
    return (
        <div>
            <label style={{marginRight:5}}>
                <input type={"checkbox"} onChange={props.filterChanged} value={"No priority"}/>
                No priority</label>
            <label style={{marginRight:5}}><input type={"checkbox"} onChange={props.filterChanged} value={"High"}/>
                High</label>
            <label style={{marginRight:5}}><input type={"checkbox"} onChange={props.filterChanged} value={"Medium"}/>
                Medium</label>
            <label style={{marginRight:5}}><input type={"checkbox"} onChange={props.filterChanged} value={"Low"}/>
                Low</label>
        </div>
    )
}