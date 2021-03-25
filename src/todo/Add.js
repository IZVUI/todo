import React, {Component} from "react";
import MarkFilter from "./MarkFilter";
import Moment from "react-moment";


export default class Add extends Component {

    state = {
        marks: [
            {text: 'No mark'},
            {text: 'Home'},
            {text: 'Work'},
            {text: 'Entertainment'}
        ],
        name: '',
        deadline: new Date()
    }

    onChange = (e) => {
        this.props.noteNameHandler(e);

        this.setState({
                name: e.target.value
            }
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(Date.parse(this.state.deadline) < Date.now()) {
            alert("Date can't be earle than now!")
            return
        }
        this.props.deadlineChangeHandler(this.state.deadline);
        this.props.addNoteHandler();
        this.setState({
            name: ''
        })
    }

    dateChange = (e) => {
        this.setState({
            deadline:e.target.value
        })
    }


    render() {

        const MarksList = this.state.marks.map((filter) => {
            return (
                <MarkFilter mark={filter.text}/>
            )
        })

        return (
            <form onSubmit={this.onSubmit} style={{
                border: "1px solid black",
                margin: 20,
            }}>
                <input onChange={this.onChange} style={{margin: 10}} value={this.state.name}/>
                <button type={"submit"}>Add</button>
                <br/>
                <label style={{marginRight: 15}}>Note priority: <select onChange={this.props.priorityChangeHandler}>
                    <option>No priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                </label>
                <label>Mark Filter: <select onChange={this.props.markChangeHandler}>
                            {MarksList}
                        )
                    }
                </select>
                </label>
                <br/>
                <input type='date' value={this.state.deadline} onChange={this.dateChange}/>
            </form>
        );
    }
}
