import React, {Component} from 'react';
import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            label: '',
            phone: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.label === '' ) {
            this.setState({showMessage: true});
        } else {
            this.props.addNewPost(this.state);
            this.setState({showMessage: false});
            this.setState({label: '', phone: ''});
        }

    }

    render() {
        return (
            <div>
                <form className="bottom-panel d-flex mt-2" onSubmit={this.onSubmit}>
                    <input className="search-input w-50"
                           type="text"
                           placeholder="Введите имя пользователя"
                           onChange={(event) => {
                               this.setState({label: event.target.value, phone: this.state.phone});

                           }}
                           value={this.state.label}
                    />
                    <input className="search-input w-50 ml-2"
                           type="number"
                           placeholder="Введите телефон"
                           onChange={(event) => {
                               this.setState({label: this.state.label, phone: event.target.value});
                           }
                           }
                           value={this.state.phone}
                    />
                    <button type="submit" className="btn btn-primary ml-2 w-25">
                        Добавить
                    </button>
                </form>
                {this.state.showMessage && <div className="alert alert-danger mt-2" role="alert">
                    Please enter the field name!
                </div>}

            </div>

        )
    }
}
