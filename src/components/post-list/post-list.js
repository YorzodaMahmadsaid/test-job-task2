import React, {useState} from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const elements = posts.map((item, itemIndex) => {
        const {id, ...itemProps} = item;
        return (
            <span key={item.id} className="list-group-item">
                <PostListItem {...itemProps}
                              editingIndex={editingIndex}
                              key={itemIndex}
                              itemIndex={itemIndex}
                              onEdit={(editingIndex) => {
                                  setEditingIndex(editingIndex)
                              }
                              }
                              sendEditedItemData={(editedItemData) => {
                                  posts[editingIndex].label = editedItemData.label;
                                  posts[editingIndex].phone = editedItemData.phone;
                              }}
                              onDelete={() => onDelete(id)}
                              onToggleImportant={() => onToggleImportant(id)}
                              onToggleLiked={() => onToggleLiked(id)}/>
            </span>
        )
    });

    return (
        <ul className="app-list-item pl-0 mt-3">
            {elements}
        </ul>
    )
}

export default PostList;
