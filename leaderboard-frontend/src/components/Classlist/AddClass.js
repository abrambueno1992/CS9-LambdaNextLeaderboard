import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {Button, Icon, Input} from 'semantic-ui-react'

import {addClass, getClassesStudentsAction} from "../../actions";

'./ClassList.css'

class AddClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNew: false,
            class_name: ''
        }
    }

    handleInput = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.class_name)
    }
    handleSubmit = () => {
        const obj = {
            name: this.state.class_name.toUpperCase()
        }
        console.log(this.state.class_name)
        this.props.addClass(obj)
        this.setState({addNew: false, class_name: ''})
    }
    addNew = () => {
        this.setState({addNew: true})
    }

    render() {
        if (this.props.solo === "no" && this.state.addNew === false) {
            return (
                <div className="APP__ADDCLASS__CARD">
                    {/*<AddClass />*/}
                    <p>Add a new class</p>
                    <Icon onClick={this.addNew} className="APP__ADDCLASS_ADDBUTTON" name="plus circle huge"/>
                </div>
            )
        } else if (this.props.solo === "no" && this.state.addNew === true) {
            return (<div className="APP__ADDCLASS__CARD">
                <h1>Enter new class name</h1>

                <Input
                    focus
                    type="text"
                    placeholder="Enter classname"
                    name="class_name"
                    className="Add_Input"
                    value={this.state.class_name}
                    onChange={this.handleInput}
                />
                <Button secondary onClick={this.handleSubmit} className="Add_Submit">Submit</Button>
                {/*<button onClick={this.handleSubmit} className="Add_Submit">Submit</button>*/}
            </div>)
        }
        else
            return (
                <div>

                    <div className="APP__ADDCLASS__SOLO">
                        <Icon onClick={this.addNew} className="APP__ADDCLASS_ADDBUTTON" name="plus circle huge"/>

                        {/*<button className="APP__ADDCLASS_ADDBUTTON">+</button>*/}
                    </div>
                </div>
            );
    }

}

const mapStateToProps = state => {
    return {
        error: state.error
    }
}
export default connect(mapStateToProps, {addClass, getClassesStudentsAction})(AddClass)
