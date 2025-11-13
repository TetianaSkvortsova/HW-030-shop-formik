import React, {useContext} from 'react';
import './Categories.css';
import {DataContext} from "../../contexts/contexts.js";

function Categories({setCategoryId, setProductId, categoryId}) {

    const {content} = useContext(DataContext);
    const handleClick = (id) => {
        return () => {
            setCategoryId(id);
            setProductId(null);
        }
    }

    return (
        <div className="categories-container">
            <h1>Категорії</h1>
            <ul>
                {content.length > 0 &&
                    content.map((item) => (
                        <li key={item.id} onClick={handleClick(item.id)} className={ item.id === categoryId ? 'active' : ''}>
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;