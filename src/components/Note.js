import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai"
const Note = ({ Note, onDelete, onEdit }) => {
    const [toggleEditNote, settoggleEditNote] = useState(false);
    const [Title, setTitle] = useState(Note.header);
    const [NoteContent, setNoteContent] = useState(Note.body);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!Title || !NoteContent) {
            alert("Please add a note");
            return
        }
        onEdit({ header: Title, body: NoteContent, id: Note.id });
        settoggleEditNote(false);
    }
    // Show date on Hover
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    return (
        <>
            <div className="note-card" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                <div className="icons" style={{ position: 'absolute', top: 0, right: 0, paddingTop: '0.2rem', paddingRight: '0.2rem' }} >
                    <AiTwotoneEdit onClick={() => settoggleEditNote(!toggleEditNote)} className="note-icon" style={{ marginRight: '0.2rem' }} />
                    <AiTwotoneDelete onClick={() => onDelete(Note.id)} className="note-icon" />
                </div>

                <div className="note-head">
                    {Note.header}
                </div>
                <div className="note-body">
                    {Note.body}
                </div>
                {
                    hovered &&
                    <div className="note-date" style={hovered ? { backgroundColor: "yellow", width: "100%", fontSize: "0.8rem", textAlign: "center" } : {}}>
                        {new Date(Note.date).toLocaleString()}
                    </div>
                }

            </div>
            {
                toggleEditNote &&
                <form className="editNoteForm" onSubmit={onSubmit}>
                    <div className="form-control">
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={Title} placeholder="Note Title" />
                    </div>
                    <div className="form-control">
                        <textarea onChange={(e) => setNoteContent(e.target.value)} value={NoteContent} placeholder="Enter your Note content ..." cols="30" rows="10">

                        </textarea>
                    </div>
                    <button className="btn btn-save-note" type="submit">Save Note</button>
                </form>
            }

        </>
    )
}

Note.propTypes = {
    header: PropTypes.string,
    body: PropTypes.string,
}
export default Note
