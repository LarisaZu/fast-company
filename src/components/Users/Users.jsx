import { useState, useMemo } from "react";

import { Table } from "../Table/Table";
import "./User.css";
import api from "../../api";

export const Users = () => {
  const [users, setUsers] = useState(() => api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (value) => {
    const num = value.length;

    return num > 0 ? (
      <h1 className="badge bg-primary">
        {num} человек будут тусить с тобой сегодня
      </h1>
    ) : (
      <h1 className="badge bg-danger">Никто не хочет тусить с тобой сегодня</h1>
    );
  };
  // console.log(renderPhrase(2))
  const renderQualities = (cellInfo) => {
    const {
      cell: {
        row: {
          original: { qualities },
        },
      },
    } = cellInfo;

    return (
      <div className="qualities-wrapper">
        {qualities.map((el) => (
          <span key={el._id} className={`badge bg-${el.color}`}>
            {el.name}
          </span>
        ))}
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Имя",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Качества",
        accessor: "qualities",
        Cell: renderQualities,
      },
      {
        Header: "Профессия",
        accessor: "profession",
        Cell: ({ row: { original } }) => {
          return original.profession.name;
        },
      },
      {
        Header: "Встретился, раз",
        accessor: "completedMeetings",
      },
      {
        Header: "Оценка",
        accessor: "rate",
      },
      {
        Header: "",
        accessor: "_id",
        Cell: ({ value }) => {
          console.log("🚀 ~ file: Users.jsx ~ line 62 ~ Users ~ value", value);
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
    []
  );

  return (
    <>
      <div className="title">{renderPhrase(users)}</div>
      <div className="table-wrapper">
        <Table columns={columns} state={users} />
      </div>
    </>
  );
};
