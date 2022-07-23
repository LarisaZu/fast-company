import PropTypes from 'prop-types';

const SearchStatus = ({ num }) => {
  const renderStatus = num => {
    const lastOne = Number(num.toString().slice(-1));
    if ([2, 3, 4].indexOf(lastOne) !== -1) return 'человека тусанет';
    return 'человек тусанет';
  };

  return (
    <div className="mb-3">
      <span
        className={'badge bg-' + (num > 0 ? 'primary' : 'danger') + ' p-2 fs-4'}
      >
        {num > 0
          ? `${num} ${renderStatus(num)} с тобой сегодня`
          : 'Никто не хочет тусить с тобой'}
      </span>
    </div>
  );
};

SearchStatus.propTypes = {
  num: PropTypes.number.isRequired,
};

export default SearchStatus;
