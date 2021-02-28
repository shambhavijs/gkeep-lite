import React from 'react';
import Masonry from 'react-masonry-css';
import TakeNote from './TakeNote';

const PinnedNote = ({state, removeFromNotes, removePin}) => {
    if(state.pinned_id){
      return (
      <div className="pinned">
        <h4>Pinned</h4>
        {state.notes_list.filter(n=>{ return n.id === state.pinned_id }).map((item,index)=>
        <p key={index} className="list-item" id="li">
          <span className="span1">{item.title} <button className="pin-button" onClick={e=>removePin(item.id)}><img className="pin" src="./push-pin.png"/></button></span> 
          <span className="span2">{item.input}</span>
          <button className="list-button" onClick={e=>removeFromNotes(index,item.id)}>delete</button>
        </p>
        )}
        <hr></hr>
      </div>
      );
    }
    else {
        return null;
    }
}
const Home = ({state, styles, ...actions}) => {
    return(
        <div>
        <TakeNote state={state} {...actions} />
        <div className="popup" style={state.showPopUp ? styles.inputStyle : styles.inputStyle1}>
            <p className="text" >
              <span className="edit-title"><input value={state.edited_note.title} onChange={(e)=>actions.handleChangeNote(e.target.value,"title", "edited_note")}/> <button onClick={e=>actions.pinNote(state.popUp_id)}><img className="pin" src="./push-pin.png"/></button></span>
              <input value={state.edited_note.input} onChange={(e)=>actions.handleChangeNote(e.target.value,"input", "edited_note")} className="edit-input" />
              <button onClick={e=>actions.updateNote(state.popUp_id)} className="close">close</button>
              <button onClick={e=>actions.removeFromNotes(state.popUp_id)} className="delete">delete</button>
            </p>
        </div>
        <PinnedNote state={state} {...actions}/>
        <ul>
          <Masonry
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {(!state.search ? state.notes_list : state.search_list).filter(n=>{ return ((n.id !== state.pinned_id) && (n.id !== state.popUp_id)) }).map((item,index)=>
              <li key={index} className="list-item" >
                <span className="span1">{item.title} <button className="pin-button" onClick={e=>actions.pinNote(item.id)}><img className="pin" src="./push-pin.png"/></button></span> 
                <span className="span2">{item.input}</span> 
                <button className="list-button" onClick={e => actions.showNote(item.id)}>Edit</button>
                <button className="list-button" onClick={e=>actions.removeFromNotes(index, item.id)}>Delete</button></li>)}
          </Masonry>
        </ul>
        </div>
    );
}

export default Home;