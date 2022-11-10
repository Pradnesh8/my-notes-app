import Note from "./Note"
import PropTypes from 'prop-types'

const Notelist = ({ Notes, onDelete, onEdit, toggleView }) => {
    return (
        <div className="notes-deck">
            {
                (Notes).map((note) => (
                    <Note key={note.id} Note={note} onDelete={onDelete} onEdit={onEdit} toggleView={toggleView} />
                ))
            }
        </div>
    )
}

Notelist.propTypes = {
    Notes: PropTypes.array.isRequired,
}

export default Notelist
