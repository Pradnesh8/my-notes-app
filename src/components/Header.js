import { BiNotepad } from "react-icons/bi";
import { FaRegWindowClose } from "react-icons/fa";
const Header = ({ onToggle, text }) => {
    return (
        <header>
            <h3>My Notes</h3>
            <button onClick={onToggle}
                style={{
                    width: "7em",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }} className="btn">
                {text === 'New' ? 
                (
                    <BiNotepad style={{ fontSize: "1rem" }} />
                ):
                (
                    <FaRegWindowClose style={{ fontSize: "1rem" }} />
                )}

                {text}
            </button>
        </header>
    )
}

export default Header
