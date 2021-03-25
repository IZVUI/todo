import React from "react";
import Filters from "./Filters";
import Search from "./Search";
import DateFilter from "./DateFilter";

export default (props) => {
    return (
        <div>
            <Filters props = {props}/>
            <br/>
            <DateFilter props={props}/>
            <Search onSearch={props.onSearch}/>
        </div>
    )
}