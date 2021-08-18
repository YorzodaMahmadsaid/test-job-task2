import React, {Component} from 'react';
import AppHeader from '../app-header';
import PostList from '../post-list';
import PostAddForm from "../post-add-form";

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Jone', phone: '935114323', id: 1},
                {label: 'Alex', phone: '935114323', id: 2},
                {label: 'David', phone: '935114323', id: 3},
                {label: 'Jones', phone: '935114323', id: 4}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 9;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(element => element.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        if(body !== undefined && body !== '') {
            const newItem = {
                label: body,
                phone: body,
                important: true,
                id: this.maxId++
            }
            this.setState((data) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            })
        }
    }

    onToggleImportant(id) {
        this.setState((data) => {
            const index = data.findIndex(element => element.id === id);
            const old = data[index];
            const newItem = {...old, important: !old.important};
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArray
            }

        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(element => element.id === id);
            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArray
            }

        })
    }

    searchPost(items, term) {
        if(term.length === 0) {
            return items
        }

        return items.filter((item) => {
           return item.label.indexOf(term) > -1;
        });

    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like)
        }
        else if(filter === 'important') {
            return items.filter(item => item.important)
        }
        else {
            return items;
        }
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const { data, term, filter } = this.state;
        const liked = this.state.data.filter(item => item.like).length;
        const allPosts = this.state.data.length;
        const important = this.state.data.filter(item => item.important).length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app py-3">
                <AppHeader liked={liked}
                           allPosts={allPosts}
                           important={important}/>
                <div className="search-panel d-flex">
                </div>
                <PostList posts={this.state.data}
                          onDelete={this.deleteItem}
                          hideRow={this.hideRow}
                          onToggleImportant={this.onToggleImportant}
                          onToggleLiked={this.onToggleLiked}/>
                <PostAddForm onAdd={this.addItem} addNewPost={(post) => {
                    this.setState({data: [...this.state.data, post]});
                }
                }/>
            </div>
        )
    }
}
