import React from 'react';
import Masonry from 'react-masonry-css';

const Trash = ({state, ...actions}) => {
    return(
        <div>
        <ul>
          <Masonry
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {state.trash_list.map((item,index)=>
              <li key={index} className="trash-item" >
                <span className="span1">{item.title}</span> 
                <span className="span2">{item.input}</span> 
                <button onClick={e=>actions.removeFromTrash(item.id)} className="delete-forever"><img className="del-forever" src="./del1.png"/></button>
              </li>)}
          </Masonry>
        </ul>
        </div>
    );
}

export default Trash;