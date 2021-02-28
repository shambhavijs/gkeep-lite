import React from 'react';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Trash from './Trash';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search: null,
      edited_note: {
        title: "",
        input: ""
      },
      notes: {
        title: "",
        input: ""
      },
      deleted_note: {
        title: "",
        input: ""
      },
      search_list: [],
      notes_list: [], 
      visible: false,
      pinned_id: null,
      showPopUp: false,
      popUp_id: null,
      trash_list: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.addToNotes = this.addToNotes.bind(this);
    this.removeFromNotes = this.removeFromNotes.bind(this);
    this.removePin = this.removePin.bind(this);
    this.pinNote = this.pinNote.bind(this);
    this.showNote = this.showNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.removeFromTrash = this.removeFromTrash.bind(this);
    this.actions = {
      handleClick: this.handleClick,
      handleChangeNote: this.handleChangeNote,
      addToNotes: this.addToNotes,
      removeFromNotes: this.removeFromNotes,
      removePin: this.removePin,
      pinNote: this.pinNote,
      showNote: this.showNote,
      updateNote: this.updateNote,
      removeFromTrash: this.removeFromTrash
    };
  }

  componentDidMount() {
    const trash_string = localStorage.getItem('trash');
    const trash_list = JSON.parse(trash_string);
    const list_string = localStorage.getItem('list');
    const notes_list = JSON.parse(list_string);
    this.setState({
      ...this.state,
      notes_list: (notes_list? notes_list : []),
      trash_list: (trash_list? trash_list : [])
    });
  }

  handleClick(){
    this.setState({
      ...this.state,
      visible: true
    });
  }
  handleSearch(value){
    if(value.length > 0) {
      this.setState({
        ...this.state,
        search: value,
        search_list: this.state.notes_list.filter(note=>{ return (note.title.includes(value) || note.input.includes(value))})
      });
    }
    else {
      this.setState({
        ...this.state,
        search: null,
        search_list: []
      });
    }
  }
  handleChangeNote(value,key, obj="notes"){
    this.setState({
      ...this.state,
      [obj]: {
        ...this.state[obj],
        [key]: value
      }
    });
  }
  addToNotes() {
    const notes_list = this.state.notes_list;
    if((this.state.notes.input.length)>0 || (this.state.notes.title.length)>0){
    notes_list.unshift({
      id: Date.now(),
      ...this.state.notes
    });
    this.setState({
      ...this.state,
      notes_list: notes_list,
      notes: {
        ...this.state.notes,
        title:"",
        input: ""
      },
      visible: false
    });
    localStorage.setItem("list",JSON.stringify(notes_list));
    }
    else{
      this.setState({
        ...this.state,
        visible: false
      });
    }
  }
  removeFromNotes(i,id) {
    let deleted_note = this.state.notes_list.filter(item => {return item.id === id})[0];
    const trash_list = this.state.trash_list;
    trash_list.unshift(deleted_note);
    this.setState({
      trash_list: trash_list
    });
    const notes_list = this.state.notes_list.filter((note,index)=> { return index !== i; });
    if(this.state.pinned_id){
    this.setState({
      notes_list: notes_list,
      pinned_id: null
    });}
    else{
      this.setState({
        showPopUp: false,
        notes_list: notes_list,
      });
    }
    localStorage.setItem("list", JSON.stringify(notes_list));
    localStorage.setItem("trash",JSON.stringify(trash_list));
  }
  pinNote(id) {
    this.setState({
      ...this.state,
      pinned_id: id
    });
  }
  removePin() {
    this.setState({
      ...this.state,
      pinned_id: null
    });
  }  
  showNote(id) {
    let edited_note = this.state.notes_list.filter(item=>{return item.id === id})[0];
    this.setState({
      ...this.state,
      edited_note,
      showPopUp: true,
      popUp_id: id
    });
  }
  updateNote(id) {
    let note = this.state.edited_note;
    let containsOnlyOneElement = this.state.notes_list.length === 1;
    this.setState({
      ...this.state, 
      notes_list: (containsOnlyOneElement ? [{id, ...note}] : [{id, ...note}, ...this.state.notes_list.filter(item=>item.id!==id)]),
      edited_note: {
        title: "",
        input: ""
      },
      showPopUp: false,
      popUp_id: null
    });
  }
  removeFromTrash(id) {
    const trash_list = this.state.trash_list.filter((item) => { return  item.id !== id});
    this.setState({
      ...this.state,
      trash_list: trash_list
    });
  }

  render() {
    let styles = {
      inputStyle: {
        display: 'flex'
      }, 
      inputStyle1: {
        display: 'none'
      }
    };
    return(
     
      <div>
        <div className="header">
          <img src="./logo.png" />
          <h3>Keep</h3>
          <input className="search" type="text" placeholder="Search" value={this.state.search ? this.state.search : ""} onChange={(e)=>this.handleSearch(e.target.value)}/>
        </div>
        <hr></hr>
        <div className="content">
          <Router>
            <div className="navigation"> 
              <Link to="/" className="nav-home"><img alt="home" className="home" src="./note.png"/></Link>
              <Link to="/trash" className="nav-trash"><img alt="trash" className="trash" src="./del.png"/></Link>
            </div>
            <Switch>
              <Route exact path="/" render={()=><Home state={this.state} styles={styles} {...this.actions}/>}/>
              <Route path="/trash" render={()=><Trash state={this.state} styles={styles} {...this.actions}/>}/>
            </Switch>
          </Router>
        </div>
       </div>
    );
  };
}

export default App;
