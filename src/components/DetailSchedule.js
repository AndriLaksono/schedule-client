import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';

class DetailSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            tanggal: "",
            start_time: "",
            end_time: "",
            status: "",
            error: false,
            success: false,
            message: ""
        }
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

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`${baseUrl}/schedule/${id}`).then(res => {
            this.setState({
                date: this.formatDate(res.data.data.date),
                name: res.data.data.name,
                start_time: res.data.data.start_time,
                end_time: res.data.data.end_time,
                status: res.data.data.status,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="container">
                <Link to="/" className="btn btn-info btn-sm"> &larr; Back Home</Link>
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-sm-6">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>{this.state.date}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <td>Start Time</td>
                                    <td>{this.state.start_time}</td>
                                </tr>
                                <tr>
                                    <td>End Time</td>
                                    <td>{this.state.end_time}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{this.state.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailSchedule;