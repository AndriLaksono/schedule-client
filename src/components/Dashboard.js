import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scheduleData: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get(`${baseUrl}/schedule`).then(res => {
            this.setState({
                scheduleData: res.data.data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    publishData(id) {
        let del = window.confirm("Publish data ? ");
        if (del) {
            axios.put(`${baseUrl}/schedule/publish/${id}`).then(res => {
                this.fetchData();
            }).catch(err => {
                window.alert(err.response.data.message);
                console.log(err);
            })
        }
    }

    deleteData(id) {
        let del = window.confirm("Delete data ? ");
        if (del) {
            axios.delete(`${baseUrl}/schedule/${id}`).then(res => {
                this.fetchData();
            }).catch(err => {
                window.alert(err.response.data.message);
                console.log(err);
            })
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

    render() {
        return (
            <div className="container">
                <Link to="/create" className="btn btn-info">Add</Link>
                <div className="row">
                    <div className="col s12 m6">
                        <table className="table table-bordered" style={{marginTop: '10px'}}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.scheduleData.length > 0 ?this.state.scheduleData.map(el => {
                                    return (
                                        <tr key={el.id}>
                                            <td>{el.name}</td>
                                            <td>{this.formatDate(el.date)}</td>
                                            <td>{el.status}</td>
                                            <td>{el.start_time}</td>
                                            <td>{el.end_time}</td>
                                            <td>
                                                <Link to={"/edit/"+el.id}> edit </Link>
                                                <Link to={"/show/"+el.id}> show </Link>
                                                <Link to="/" onClick={() => this.publishData(el.id) } style={{color: 'green'}}> publish </Link>
                                                <Link to="/" onClick={() => this.deleteData(el.id) } style={{color: 'red'}}> delete </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                                : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;