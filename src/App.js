import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Notelist from './components/Notelist';
import { useState, useEffect } from 'react';
import AddNote from './components/AddNote';


function App() {

  const [Notes, setNotes] = useState([]);
  const [AddNoteToggle, setAddNoteToggle] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes()
      setNotes(notesFromServer);
    }

    getNotes()
  }, [])

  // Fetch data form Json-server
  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/Notes");
    const data = await res.json();
    // let array = data;
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // console.log(array);

    return data;
  }

  // Add data
  const AddNoteForm = async (note) => {
    // TO add date and time of Note when created
    let date = new Date();
    const res = await fetch('http://localhost:5000/Notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...note, "date": date }),
    })
    const data = await res.json();

    // To add new note in Notes
    setNotes([data, ...Notes]);
    // To toggle the form
    setAddNoteToggle(!AddNoteToggle);

    console.log("Add note form called");
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newNote = { id, ...note }
    // setNotes([...Notes, newNote]);
    // setAddNoteToggle(!AddNoteToggle);
  }

  // Update Note
  const editNote = async (note) => {
    // TO add date and time of Note when updated
    let date = new Date();
    const res = await fetch(`http://localhost:5000/Notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...note, "date": date }),
    })
    const ret_data = await res.json();
    console.log("Edit note form called");
    // console.log(data);
    // Update if id matches with edit note id
    setNotes(Notes.map((data) => data.id === note.id ? { ...ret_data } : data));
  }

  // Delete Note
  const delteNote = async (id) => {
    const res = await fetch(`http://localhost:5000/Notes/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setNotes(Notes.filter((note) => note.id !== id))
      : alert('Error Deleting This Task')

    console.log("Delete note called for Id:" + id);
    // setNotes([Notes.filter((note) => note.id !== id)]);
  }
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  const [view, setView] = useState('grid');
  const toggleView = (v) => {
    if (v === 'grid') {
      setView('grid');
    } else {
      setView('list');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
      <Header onToggle={() => setAddNoteToggle(!AddNoteToggle)} text={AddNoteToggle ? 'Close' : 'New'} toggleThemeN={() => toggleTheme()} />
      <h1>Welcome to My notes app!</h1>
      <div className="view-toggle">
        <div className="view-toggle-switch">
          <div className={`icon-bg ${view === "grid" ? "icon-bg-selected" : ""}`} onClick={() => toggleView("grid")}>
            <img src="assets/grid-icon.svg" alt="grid" />
          </div>
          <div className={`icon-bg ${view === "list" ? "icon-bg-selected" : ""}`} onClick={() => toggleView("list")}>
            <img src="assets/list-icon.svg" alt="list" />
          </div>
        </div>
      </div>
      {Notes.length === 0 && <h3>No notes added yet!</h3>}
      {
        AddNoteToggle && <AddNote onSave={AddNoteForm} />
      }
      <Notelist Notes={Notes} onDelete={delteNote} onEdit={editNote} toggleView={view} />
      <Footer />
    </div>
  );
}

export default App;
