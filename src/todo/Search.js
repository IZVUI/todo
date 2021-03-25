import React from "react";

export default ({onSearch}) => {
    return (
        <div>
            <input placeholder='Search' onInput={onSearch}/>
        </div>
    )
}