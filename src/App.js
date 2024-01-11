import React, { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteClick = () => {
    setNotes([...notes, { id: Date.now(), text: "" }]);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleTextChange = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  return (
    <div className="container">
      <button className="add" onClick={handleNoteClick}>
        <i className="fas fa-plus"></i> Add Note
      </button>
      {notes.map((note) => (
        <div key={note.id} className="note">
          <div className="tools">
            <button className="plus" onClick={handleNoteClick}>
              <i className="fas fa-plus"></i>
            </button>
            <button className="edit">
              <i className="fas fa-edit"></i>
            </button>
            <button className="delete" onClick={() => handleDelete(note.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          <div className="main hidden"></div>
          <textarea
            value={note.text}
            onChange={(e) => handleTextChange(note.id, e.target.value)}
          ></textarea>
        </div>
      ))}
    </div>
  );
};

export default App;
