import { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import PropTypes from 'prop-types';
import './Table.css';

const Table = ({ state, columns }) => {
  const data = useMemo(() => state, [state]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 4 },
    },
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination alert alert-secondary d-flex mt-2">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>

        <button
          className={'btn btn-' + (canPreviousPage ? 'primary' : 'secondary')}
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<<'}
        </button>
        <button
          className={'btn btn-' + (canPreviousPage ? 'primary' : 'secondary')}
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <button
          className={'btn btn-' + (canNextPage ? 'primary' : 'secondary')}
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <button
          className={'btn btn-' + (canNextPage ? 'primary' : 'secondary')}
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>>'}
        </button>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[4, 8, 10].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  state: PropTypes.array.isRequired,
};

export default Table;
