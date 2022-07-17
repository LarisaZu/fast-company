const Favourites = ({ status, onStatusClick }) => {
  return (
    <span onClick={onStatusClick}>
      <i className={status ? 'bi bi-star-fill' : 'bi bi-star'}></i>
    </span>
  );
};

export default Favourites;
