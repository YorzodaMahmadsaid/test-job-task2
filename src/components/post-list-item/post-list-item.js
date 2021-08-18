import React, {Component} from 'react';
import './post-list-item.css'

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            important: false,
            editingItemValue: '',
            itemValue: props.label,
            phone: props.phone,
            like: false,
            showResult: true
        };
        this.onImportant = this.onImportant.bind(this);
        this.onLike = this.onLike.bind(this);
    }

    onImportant() {
        this.setState(({important}) => ({
            important: !important
        }))
    }

    onLike() {
        this.setState(({like}) => ({
            like: !like
        }))
    }

    render() {
        const {onDelete, onToggleImportant, onToggleLiked, important, like} = this.props;

        let classNames = 'app-list-item d-flex justify-content-between';
        let starIcon = 'btn btn-outline mt-2 '
        if (important) {
            classNames += ' important';
            starIcon += ' text-warning'
        }

        if (like) {
            classNames += ' like';
        }

        if (this.props.editingIndex === this.props.itemIndex) {
            return (
                <li className={classNames}>

                    <input type="text"
                           style={{width: '35%'}}
                           value={this.state.editingItemValue}
                           onChange={(event) => {
                                this.setState({editingItemValue: event.target.value})
                    }}/>

                    <input type="number"
                           style={{width: '35%', marginLeft: '10px'}}
                           value={this.state.phone}
                           onChange={(event) => {
                                this.setState({phone: event.target.value})
                    }}/>

                    <div className="d-flex justify-content-center align-items-center ml-auto">
                        <button type="button" className="btn btn-danger mt-2 btn-sm" onClick={() => {
                            this.props.onEdit(null);
                        }}>Отмена
                        </button>
                        <button type="button" className="btn btn-success mt-2 btn-sm" onClick={() => {
                            this.setState({itemValue: this.state.editingItemValue});
                            this.props.sendEditedItemData({label: this.state.editingItemValue, phone: this.state.phone});
                            this.props.onEdit(null);
                        }}>Сохранить
                        </button>
                    </div>
                </li>
            )
        } else {
            return (
                <li className={classNames}>
                    <div className="app-list-item-label my-2" onClick={onToggleLiked}>{this.state.itemValue}</div>
                    <span className="ml-4 mt-2">{this.state.phone}</span>
                    <div className="d-flex align-items-center">
                        <button type="button" onClick={() => {
                            this.setState({editingItemValue: this.state.itemValue});
                            this.props.onEdit(this.props.itemIndex)
                        }} className="btn mt-2 btn-sm">
                            <i className="fa fa-edit"/>
                        </button>

                        <button type="button" className="btn mt-2 btn-trash btn-sm" onClick={onDelete}>
                            <i className="fa fa-trash-alt"/>
                        </button>
                    </div>
                </li>
            )
        }
    }
}
