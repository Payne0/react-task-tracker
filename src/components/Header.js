import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h3>{title}</h3>
      {location.pathname === "/" && (
        <Button
          text={showAdd ? "Close" : "Add"}
          color={showAdd ? "Red" : "green"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "React Course",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
