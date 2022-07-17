import { useState, useMemo } from 'react';

import Table from '../Table';
import SearchStatus from '../SearchStatus';
import Qualities from '../Qualities';
import Favourites from '../Favourites';
import './Users.css';
import api from '../../api';

const Users = () => {
  const [users, setUsers] = useState(() => api.users.fetchAll());

  const handleDelete = userId => {
    setUsers(prevState => prevState.filter(user => user._id !== userId));
  };

  const handleStatusChange = id => {
    setUsers(prev =>
      prev.map(user =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user,
      ),
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Имя',
        accessor: 'name',
      },
      {
        Header: 'Качества',
        accessor: 'qualities',
        Cell: cellInfo => <Qualities cellInfo={cellInfo} />,
      },
      {
        Header: 'Профессия',
        accessor: 'profession',
        Cell: ({ row: { original } }) => {
          return original.profession.name;
        },
      },
      {
        Header: 'Встретился, раз',
        accessor: 'completedMeetings',
      },
      {
        Header: 'Оценка',
        accessor: 'rate',
      },
      {
        Header: 'Избранное',
        accessor: null,
        Cell: cellInfo => {
          const {
            cell: {
              row: {
                original: { _id, bookmark },
              },
            },
          } = cellInfo;
          return (
            <Favourites
              status={bookmark}
              onStatusClick={() => handleStatusChange(_id)}
            />
          );
        },
      },
      {
        Header: '',
        accessor: '_id',
        Cell: ({ value }) => {
          return (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(value)}
            >
              delete
            </button>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <SearchStatus num={users.length} />

      <div className="table-wrapper">
        {users.length > 0 && <Table columns={columns} state={users} />}
      </div>
    </>
  );
};

export default Users;
