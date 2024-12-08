import { Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fethAllUsers, deleteUserRedux } from "../action/actions";
const TableUser = (props) => {
  //   const [listUsers, setListUsers] = useState([]);
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isError = useSelector((state) => state.user.isError);

  //   const fetchAllUser = async () => {
  //     const res = await axios.get("http://localhost:8080/users/all");
  //     const data = res && res.data ? res.data : [];
  //     setListUsers(data);
  //     console.log("check data: ", data);
  //   };
  useEffect(() => {
    // fetchAllUser();
    dispatch(fethAllUsers());
  }, []);
  const handleDeleteUser = (user) => {
    dispatch(deleteUserRedux(user.id));
  };
  return (
    <>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError === true ? (
              <>Something wrong ,plase try again</>
            ) : (
              <>
                {isLoading === true ? (
                  <>
                    <tr>
                      <td colSpan={3}>Loading data ...</td>
                    </tr>
                  </>
                ) : (
                  <>
                    {" "}
                    {listUsers &&
                      listUsers.length > 0 &&
                      listUsers.map((item, index) => {
                        return (
                          <tr key={`user-${index}`}>
                            <td>{index + 1}</td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteUser(item)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default TableUser;
