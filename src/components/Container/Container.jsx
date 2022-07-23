import PropTypes from 'prop-types';
import './Container.css';

const Container = ({ children }) => {
  return <main className="main-container">{children}</main>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
