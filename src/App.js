import './App.css';
import React from "react";
import Add from "./todo/Add";
import {Component} from "react/cjs/react.production.min";
import Note from "./todo/Note";
import Header from "./todo/Header";
import ToolBar from "./todo/ToolBar";
import * as moment from "moment";

class App extends Component {

    fromStorage = JSON.parse(localStorage.getItem('Notes'));

    state = {
        newNoteName: 'newNote',
        newNotePriority: 'No priority',
        newNoteMark: 'No mark',
        priorityFilter: "",
        dateFilter: '',
        searchText: '',
        notes: this.fromStorage ? this.fromStorage : [],
        deadline: Date.now()
    }

    checkFilterAccess = (note) => {
        if (this.state.priorityFilter == "")
            return true;
        let priors = this.state.priorityFilter.split(" ");
        let isTrue = false;
        priors.forEach((p) => {
            // console.log("p: " + p + '  ' + note.priority.indexOf(p));
            // console.log(p == "");
            if (note.priority.indexOf(p) != -1 && p != "") {
                isTrue = true;
            }
        });
        return isTrue;
    }
    checkDateFilterAccess = (note) => {
        if (this.state.dateFilter == "")
            return true;
        let priors = this.state.dateFilter.split(" ");
        let isTrue = false;
        let deadline = moment(note.deadline);
        let diff = moment(new Date()).diff(deadline, 'hours');
        priors.forEach((p) => {
           switch (p) {
               case 'Passed':
                   if(diff > 0)
                       isTrue = true;
                   break;
               case 'Week':
                   if(diff < 0 && diff > -168)
                       isTrue = true;
                   break;
               case 'Today':
                   if(diff < 0 && diff > -24)
                       isTrue = true;
                   break;
           }
        });
        return isTrue;
    }

    noteNameHandler = (event) => {
        //  console.log(moment(new Date()).diff(moment('2021-03-25','YYYY-MM-DD'), 'hours'));
        // console.log(moment(new Date()).to(moment('2021-03-25','YYYY-MM-DD')));
        this.setState(() => {
            return {
                newNoteName: event.target.value
            }
        });
    }

    addNoteHandler = () => {

        this.setState((state) => {

            let notes = state.notes.concat();
            notes.push({
                text: state.newNoteName,
                priority: state.newNotePriority,
                mark: state.newNoteMark,
                deadline: state.deadline
            });

            let notesSave = JSON.stringify(notes);
            localStorage.setItem('Notes', notesSave);

            return {
                notes
            }
        })
    }

    priorityChangeHandler = (event) => {
        this.setState(() => {
                return {
                    newNotePriority: event.target.value
                }
            }
        )
    }

    markChangeHandler = (event) => {
        this.setState(() => {
                return {
                    newNoteMark: event.target.value
                }
            }
        )
    }

    deleteHandler = (index) => {

        this.setState((state) => {
            let notes = state.notes.concat();
            notes.splice(index, 1)

            let notesSave = JSON.stringify(notes);
            localStorage.setItem('Notes', notesSave);

            return {
                notes
            }
        })
    }


    priorityFilterHandler = (event) => {
        this.setState((state) => {
            let newFilter = state.priorityFilter;
            if (newFilter.indexOf(event.target.value) == -1 || newFilter == "") {
                newFilter += " " + event.target.value;
            } else {
                newFilter = newFilter.replaceAll(event.target.value, "").trim();
            }
            return {
                priorityFilter: newFilter
            }
        });
    }

    dateFilterChanged = (event) => {
        this.setState((state) => {
            let newFilter = state.dateFilter;
            if (newFilter.indexOf(event.target.value) == -1 || newFilter == "") {
                newFilter += " " + event.target.value;
            } else {
                newFilter = newFilter.replaceAll(event.target.value, "").trim();
            }
            return {
                dateFilter: newFilter
            }
        });
    }

    checkSearch = (note) => {
        return note.text.indexOf(this.state.searchText) != -1
            || this.state.searchText == '';
    }

    onSearch = (event) => {
       /* let searchedNotes;
        let notesO;

        if(this.state.toSearchSave.length == 0) {
            searchedNotes = this.state.notes.filter(
                (note) => note.text
                    .indexOf(event.target.value) != -1);
            notesO = this.state.notes;
        } else {
            searchedNotes = this.state.toSearchSave.filter(
                (note) => note.text
                    .indexOf(event.target.value) != -1);
            notesO = this.state.toSearchSave;
        }

        if(event.target.value == '') {
            searchedNotes = this.state.toSearchSave;
            notesO = [];
        }*/
        this.setState((state) => {
            return {
                // toSearchSave: notesO,
                // notes: searchedNotes
                searchText: event.target.value
            }
        })
    }

    deadlineChangeHandler = (date) => {
        this.setState({
            deadline: date
        });
    }


    render() {
        return (
            <div className="App">
                <Header/>
                <Add
                    noteNameHandler={this.noteNameHandler}
                    addNoteHandler={this.addNoteHandler}
                    priorityChangeHandler={this.priorityChangeHandler}
                    markChangeHandler = {this.markChangeHandler}
                    deadlineChangeHandler = {this.deadlineChangeHandler}
                />
                <ToolBar
                    filterChanged={this.priorityFilterHandler}
                    dateFilterChanged = {this.dateFilterChanged}
                    onSearch = {this.onSearch}
                />

                {
                    this.state.notes.map((note, index) => {
                        return (
                            this.checkFilterAccess(note) && this.checkSearch(note) && this.checkDateFilterAccess(note)
                                ?
                                <Note
                                    key={index}
                                    text={note.text}
                                    priority={note.priority}
                                    deleteHandler={this.deleteHandler.bind(this, index)}
                                    mark={note.mark}
                                    deadline={note.deadline}
                                />
                                : null
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
