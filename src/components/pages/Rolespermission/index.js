import React, { useState, useEffect } from "react";
import "./Rolespermission.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useTable, usePagination } from 'react-table'

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>

      <table {...getTableProps()}>
        <thead >
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
            prepareRow(row)
            return (
              <tr  {...row.getRowProps()}>
                <div >
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </div>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

const Rolespermission = () => {

  const { id } = useParams();

  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'ID',
      //   accessor: 'id',
      // },
      {
        Header: 'Role Name',
        accessor: 'useremail',
      },
      {
        Header: 'User Count',
        accessor: "userpassword"
      },
      // {
      //   Header: 'Actions',
      // }
    ],
    []
  )

  const stnStyle = {
    backgroundColor: "green",
  };
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)
  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler()
    } else {
      getAllStudent()
    }
  }, [searchQuery])

  const searchHandler = () => {
    let filterDAta = student.filter((data) =>
      //  console.log("data",data)
      data.useremail.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      console.log("filterDAta", filterDAta)
      setStudent(filterDAta);
    }
    console.log(filterDAta)
    setSearch(true)
  };
  async function getAllStudent() {
    try {
      const student = await axios.get("http://localhost:3003/posts");
      setStudent(student.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/posts/${id}`);
    var newstudent = student.filter((item) => {
      return item.id !== id;
    });
    setStudent(newstudent);
  };

  return (
    <div className="header">
      <Header headerName="Role and Permissions" />
      <div className="main">
        <div style={{ marginTop: "4%" }}>
          <div class="row">
            <div class="col-sm-6">
              {" "}
              {/* <input
                className="form-control me-2"
                type="search"
                style={{
                  backgroundImage: "url(" + "images/Search.png" + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right",
                  padding: "5px",
                  width: "200px",
                }}
                placeholder="Search"
                aria-label="Search"
              /> */}
              <div class="col-sm-5">
                <div class="input-group">
                  <input
                    class="form-control  border"
                    type="search"
                    id="example-search-input"
                    placeholder="Search Member"
                    //value={searchQuery}
                    // onChangeText={(value) => setSearchQuery(value)}
                    onChange={(value) => setSearchQuery(value.target.value)}
                    style={{

                      backgroundImage: search == false ? "url(images/Search.png)" : "",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right",
                      backgroundOrigin: "content-box",
                      padding: "5px",
                      backgroundColor: "#f1f1f1"
                    }}
                  />
                </div>
                {/* <span class="input-group-append">
                    <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
                    <img
                      className="filter_image"
                      src="images/Search.png"
                      alt="logo"
                    />
                    </button>
                </span> */}
              </div>
            </div>
            <div class="col-sm-6">
              {" "}
              <div className="pos">
                <button
                  className="btn btn-outline-success float-right"
                  type="submit"
                >
                  <Link to="/">
                    <img
                      className="export_image"
                      src="images/Export.png"
                      alt="logo"
                    />
                  </Link>
                  Export
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  type="submit"
                >
                  <Link to="/">
                    <img
                      className="filter_image"
                      src="images/Filter.png"
                      alt="logo"
                    />
                  </Link>
                  filter
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  style={{ backgroundColor: "#003366", color: "white" }}
                  type="submit"
                >
                  Add Role
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid"> */}
        {/* <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              style={{
                backgroundImage: "url(" + "images/Search.png" + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                padding: "5px",
                width: "200px",
              }}
              placeholder="Search"
              aria-label="Search"
            />

            <div className="pos">
              <button
                className="btn btn-outline-success float-right"
                type="submit"
              >
                <Link to="/">
                  <img
                    className="export_image"
                    src="images/Export.png"
                    alt="logo"
                  />
                </Link>
                Export
              </button>
              <button
                className="btn btn-outline-success float-right"
                type="submit"
              >
                <Link to="/">
                  <img
                    className="filter_image"
                    src="images/Filter.png"
                    alt="logo"
                  />
                </Link>
                filter
              </button>
              <button
                className="btn btn-outline-success float-right"
                type="submit"
              >
                Add Role
              </button>
            </div>
          </form> */}
        {/* </div>
      </nav> */}

        {/* <div class="container">
          <div class="row">
            <div class="col">
              <p>
                ID &nbsp;{" "}
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>
                Role Name &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>
                User Count &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>Actions</p>
            </div>
          </div>
        </div> */}

        {/* {student.map((students, i) => {
          return (
            <div class="newcontainer">
              <div class="row" key={i}>
                <div class="col">
                  <p>{i + 1}</p>
                </div>
                <div class="col">
                  <p>{students.useremail}</p>
                </div>
                <div class="col">
                  <p>{students.userpassword}</p>
                </div>
                <div class="col" style={{ marginRight: "4%" }}>
                  <button
                    className="dustbin_image"
                    onClick={() => handleDelete(students.id)}
                  >
                    <img src="images/Del.png" alt="logo" />
                  </button>
                  <Link to={`/view/${students.id}`}>
                    <img
                      className="dustbin_image"
                      src="images/Edit.png"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })} */}
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li class="page-item disabled">
              <a class="page-link text-decoration-underline border-0" href="#" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item"><a class="page-link  border-0" href="#">1</a></li>
            <li class="page-item"><a class="page-link  border-0" href="#">2</a></li>
            <li class="page-item"><a class="page-link  border-0" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link text-decoration-underline border-0" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>

      <Table data={student} columns={columns} />
    </div>
  );
};

export default Rolespermission;
