import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';

class AddSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            start_time: "",
            end_time: "",
            error: false,
            success: false,
            message: ""
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    handleInputStart(e) {
        this.setState({
            start_time: e.target.value
        });
    }

    handleInputEnd(e) {
        this.setState({
            end_time: e.target.value
        });
    }

    handleInputDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    handleInputName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmitHandler() {
        axios.post(`${baseUrl}/schedule`, {
            name: this.state.name,
            date: this.state.date,
            start_time: this.state.date + " " + this.state.start_time,
            end_time: this.state.date + " " + this.state.end_time,
        }).then(res => {
            console.log(res);
            this.setState({
                name: "",
                date: "",
                start_time: "",
                end_time: "",
                success: true,
                error: false,
                message: res.data.message
            });
        }).catch(err => {
            this.setState({
                name: "",
                date: "",
                start_time: "",
                end_time: "",
                success: false,
                error: true,
                message: err.response.data.message
            });
        })
    }

    render() {
        return (
            <div className="container">
                <Link to="/" className="btn btn-info btn-sm"> &larr; Back Home</Link>
                {this.state.success ? (
                    <div className="alert alert-success" role="alert" style={{ marginTop: '10px' }}>
                        <strong>{this.state.message}</strong>
                    </div>
                ): ""}
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert" style={{ marginTop: '10px' }}>
                        <strong>{this.state.message}</strong>
                    </div>
                ) : ""}
                <div className="row" style={{marginTop: '10px'}}>
                    <div className="col-sm-6">
                        <input type="text" value={this.state.name} onChange={(e) => this.handleInputName(e)} name="name" className="form-control" placeholder="Name Shift"/>
                        <input type="date" value={this.state.date} onChange={(e) => this.handleInputDate(e)} name="date" className="form-control" />
                        <input type="time" value={this.state.start_time} onChange={(e) => this.handleInputStart(e)} name="start_time" className="form-control" placeholder="Start Time"/>
                        <input type="time" value={this.state.end_time} onChange={(e) => this.handleInputEnd(e)} name="end_time" className="form-control" placeholder="End Time"/>
                        <button className="btn btn-success" onClick={this.onSubmitHandler}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSchedule;