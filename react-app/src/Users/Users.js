import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { apiClientOn } from "../services/api";

const Users = (props) => {

  const [usersData, setUsersData] = React.useState([]);
  const accessToken = props.accessToken;
  const loggedIn = props.loggedIn;
  const [customOptions, setCustomOptions] = React.useState({
    size: 10,
    page: 1,
    name: "id",
    direction: "asc",
  });
  const [tableOptions, setTableOptions] = React.useState({
    count: 0
  });

  const columns = [
    {
      name: "name",
      label: "Name"
    },
    {
      name: "email",
      label: "Email"
    },
    {
      name: "created_at",
      label: "Created at"
    },
  ];

  const options = {
    serverSide: true,
    onTableChange: (action, tableState) => {
      // Do something
      console.log(action);
      console.log(tableState);
      //

      switch (action) {
        case "changePage":
          setCustomOptions({ ...customOptions, page: tableState.page + 1 });
          break;
        case "changeRowsPerPage":
          setCustomOptions({ ...customOptions, size: tableState.rowsPerPage });
          break;
        case "sort":
          setCustomOptions({ ...customOptions, name: tableState.sortOrder.name, direction: tableState.sortOrder.direction });
          break;
        default:
          //console.log("Action not handled.");
      }
    },
    count: tableOptions.count,
    rowsPerPageOptions: [10, 15, 30, 50, 100],
  };

  useEffect(() => {
    if (loggedIn === true && accessToken !== false) {
      users_api_call();
    }
  }, [loggedIn, accessToken, customOptions]); // Waiting to get this states

  const users_api_call = async () => {
    await apiClientOn({ accessToken: accessToken })
      .get("api/users?size=" + customOptions.size + "&page=" + customOptions.page + "&name=" + customOptions.name + "&direction=" + customOptions.direction)
      .then((response) => {
        if (response.status === 200) {
          let responseJSON = response.data;
          setUsersData(responseJSON.data);
          setTableOptions({ ...tableOptions, count: responseJSON.total });
        }
      })
      .catch((error) => {
        // Do something
      });
  };

  return (
    <div className="container main_container">
      <div className="card">
        <div className="card-header">
          <strong>Users</strong>
        </div>
        <div className="card-body text-center">
          <MUIDataTable
            data={usersData}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
