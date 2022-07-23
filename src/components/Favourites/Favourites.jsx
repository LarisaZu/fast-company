import PropTypes from 'prop-types';

const Favourites = ({ status, onStatusClick }) => {
  return (
    <span onClick={onStatusClick}>
      <i className={status ? 'bi bi-star-fill' : 'bi bi-star'}></i>
    </span>
  );
};

Favourites.propTypes = {
  status: PropTypes.bool.isRequired,
  onStatusClick: PropTypes.func.isRequired,
};

export default Favourites;
