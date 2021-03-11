import { useState } from 'react'
const AddNote = ({ onSave }) => {
    const [Title, setTitle] = useState('')
    const [NoteContent, setNoteContent] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        if (!Title || !NoteContent) {
            alert("Please add a note");
            return
        }
        onSave({ header:Title, body:NoteContent });

        setTitle('');
        setNoteContent('');
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={Title} placeholder="Note Title" />
            </div>
            <div className="form-control">
                <textarea onChange={(e) => setNoteContent(e.target.value)} value={NoteContent} placeholder="Enter your Note content ..." cols="30" rows="10">

                </textarea>
            </div>
            <button className="btn btn-save-note" type="submit">Save Note</button>
        </form>
    )
}
export default AddNote
