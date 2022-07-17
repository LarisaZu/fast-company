const Qualities = ({ cellInfo }) => {
  const {
    cell: {
      row: {
        original: { qualities },
      },
    },
  } = cellInfo;

  return (
    <div className="qualities-wrapper">
      {qualities.map(el => (
        <span key={el._id} className={`badge bg-${el.color} m-1 p-2`}>
          {el.name}
        </span>
      ))}
    </div>
  );
};

export default Qualities;
