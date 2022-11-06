import { BiNotepad } from "react-icons/bi";
import { FaRegWindowClose } from "react-icons/fa";
const Header = ({ onToggle, text, toggleThemeN }) => {
    return (
        <header>
            <h3>My Notes</h3>
            <div className='switchMode'>
                <input type="checkbox" class="checkbox" id="checkbox" onChange={toggleThemeN} />
                <label for="checkbox" class="label">
                    <i class="fas fa-moon"></i>
                    <i class='fas fa-sun'></i>
                    <div class='ball'></div>
                </label>
            </div>
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
                    ) :
                    (
                        <FaRegWindowClose style={{ fontSize: "1rem" }} />
                    )}

                {text}
            </button>
        </header>
    )
}

export default Header
