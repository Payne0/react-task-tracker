import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; Earth</p>
      <Link to="/about">~Have a nice day~</Link>
    </footer>
  );
};

export default Footer;
