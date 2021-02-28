import React from 'react';

const TakeNote = ({state, ...actions}) => {
    return(
        <div>
        {
            state.visible === false
            ?
            <div className="take-notes1">
              <input type="text" placeholder="Take a note..." onClick={actions.handleClick} className="initial" value={state.notes.title} onChange={()=>null}/>
            </div>
            :
            <div className="take-notes2">
              <input type="text" value={state.notes.title} placeholder="Title" className="title" onChange={(e)=>actions.handleChangeNote(e.target.value,"title")}/><br></br>
              <input type="text" value={state.notes.input} placeholder="Take a note..." onChange={(e)=>actions.handleChangeNote(e.target.value,"input")} className="take-note" autoFocus="autofocus " /> 
              <button onClick={actions.addToNotes}>close</button>
              
            </div>
        }
        </div>
    );
}

export default TakeNote;