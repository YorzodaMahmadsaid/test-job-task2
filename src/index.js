import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/app";

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
                { id: 2, name: "Wasif", age: 21, email: "wasif@email.com" },
                { id: 3, name: "Wasif", age: 21, email: "wasif@email.com" },
                { id: 4, name: "Wasif", age: 21, email: "wasif@email.com" },
                { id: 5, name: "Wasif", age: 21, email: "wasif@email.com" }
            ]
        };
    }

    hideRow(id) {
        const students = this.state.students.map((student) => {
            if (student.id !== id) {
                return student;
            }

            return { ...student, isHidden: true };
        });

        this.setState({ students });
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const { id, name, age, email, isHidden } = student;
            if (isHidden === true) {
                return null;
            }

            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{email}</td>
                    <td>
                        <button onClick={() => this.hideRow(id)}>HIDE</button>
                    </td>
                </tr>
            );
        });
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0]);
        return header.map((key, index) => {
            if (key === "isHidden") {
                return null;
            }

            return <th key={index}>{key.toUpperCase()}</th>;
        });
    }

    render() {
        return (
            <div>
                <table id="students">
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
