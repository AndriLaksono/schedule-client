import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';

class EditSchedule extends Component {
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
        console.log(e.target.value, "======= APA OY");
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

    formatDate(dateISO) {
        let date = new Date(dateISO);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return (year + '-' + month + '-' + dt);
    }

    formatTime(dateISO) {
        let date = new Date(dateISO);
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return (hours + ':' + minutes);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`${baseUrl}/schedule/${id}`).then(res => {
            this.setState({
                date: this.formatDate(res.data.data.date),
                name: res.data.data.name,
                start_time: this.formatTime(res.data.data.start_time),
                end_time: this.formatTime(res.data.data.end_time),
                status: res.data.data.status,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    onSubmitHandler() {
        let id = this.props.match.params.id;
        axios.put(`${baseUrl}/schedule/${id}`, {
            name: this.state.name,
            date: this.state.date,
            start_time: this.state.date + " " + this.state.start_time,
            end_time: this.state.date + " " + this.state.end_time,
        }).then(res => {
            this.setState({
                success: true,
                error: false,
                message: res.data.message
            });
        }).catch(err => {
            this.setState({
                success: false,
                error: true,
                message: err.response.data.message
            });
            console.log(err);
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
                ) : ""}
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert" style={{ marginTop: '10px' }}>
                        <strong>{this.state.message}</strong>
                    </div>
                ) : ""}
                <div className="col-sm-6">
                    <input type="text" value={this.state.name} onChange={(e) => this.handleInputName(e)} name="name" className="form-control" placeholder="Name Shift" />
                    <input type="date" value={this.state.date} onChange={(e) => this.handleInputDate(e)} name="date" className="form-control" />
                    <input type="time" value={this.state.start_time} onChange={(e) => this.handleInputStart(e)} name="start_time" className="form-control" placeholder="Start Time" />
                    <input type="time" value={this.state.end_time} onChange={(e) => this.handleInputEnd(e)} name="end_time" className="form-control" placeholder="End Time" />
                    <button className="btn btn-success" onClick={this.onSubmitHandler}>
                        Submit
                        </button>
                </div>
            </div>
        )
    }
}

export default EditSchedule;