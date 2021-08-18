import React, {Component} from 'react';
import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {
             name: 'all',
             label: 'Все'
            },
            {
             name: 'like',
             label: 'Понравилось'
            },
            {
             name: 'important',
             label: 'Важные'
            }
        ];
    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const active = this.props.filter === name;
            const buttonClass = active? 'btn-primary' : 'btn-outline-primary';
            return (
                <button type='button'
                        key={name}
                        className={`btn ${buttonClass}`}
                        onClick={() => {
                            this.props.onFilterSelect(name);
                        }}>
                    {label}
                </button>
            )
        });
        return (
            <div className="btn-group ml-2">
                {buttons}
            </div>
        )
    }
}
