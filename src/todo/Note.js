import React from "react";
import * as moment from "moment";


export default (props) => {
    let now = moment(new Date()) ;
    let deadline = moment(props.deadline);
    let diff = now.to(deadline);

   // console.log(moment(new Date()).to(moment('2021-02-10','YYYY-MM-DD')));
    return (
        <div /*style={
            {
                display:"block",
                border:"1px solid black",
                marginBottom:10,
                padding:10,
                width:400
            }
        }*/ className='container-fluid list-group-item'>
            <div style={{display: "inline-block"}}>
                <input type={'checkbox'} className='form-check-input me-1'/>
            </div>
            <div style={{display: "inline-block"}}>
                <p className='text-break'
                      style={{display: "inline-block", margin: 10, minWidth: 200}}>{props.text}</p>
                <p style={{color:"#c85f5f"}}>Deadline: {props.deadline} ( {diff} )</p>
            </div>
            <div style={{display: "inline-block"}}>
                <button onClick={props.deleteHandler}
                        className='btn btn-outline-danger'
                        style={{display: "inline-block", margin: 10}}>Delete
                </button>
            </div>
            <br/>
            <div style={{display: "inline-block"}}>
                <strong style={{fontSize: 10}}>Priority: {props.priority}</strong>
                <br/>
                <strong style={{fontSize: 10}}>Mark: {props.mark}</strong>
            </div>
        </div>
    )
}