import PropTypes from "prop-types";
import "./Checkbox.css";

const Checkbox = (props) => {
    const handleChange = (event) => {
        props.onClick(event.target.checked);
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={handleChange}
            />
            <span style={{ fontFamily: "primeicons" }}>
                {props.checked === true && "✔"}
            </span>
        </label>
    );
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Checkbox;