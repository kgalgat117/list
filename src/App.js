import './App.css';
import { useState } from 'react'
import { useEffect } from 'react'
import Pagination from "react-js-pagination";
import { getUsers } from './utils/api';



function App() {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({ UserFriends: [] })
  const [queryData, setQueryData] = useState({ currentPage: 0, totalPages: 1, page: 1 })
  const [view, setView] = useState('user')

  useEffect(() => {
    getData()
  }, [queryData.currentPage])

  async function getData() {
    try {
      let response = await getUsers(queryData)
      if (response) {
        let temp = []
        temp = response.data.user.rows
        setUsers(temp)
        let tempData = { ...queryData }
        tempData.totalPages = response.data.user.count
        setQueryData(tempData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  function pageChanged(page) {
    page = page - 1
    let temp = { ...queryData }
    temp.page = page + 1
    temp.currentPage = page
    setQueryData(temp)
  }

  function viewChanged(data) {
    let temp = { ...data }
    setUser(temp)
    setView('friend')
  }

  function goBack() {
    setView('user')
  }

  return (
    <div className="container-fluid">
      {view === 'user' &&
        <>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-plain table-plain-bg">
                <div className="card-header">
                  <h4 className="card-title">Users List - {queryData.totalPages}</h4>
                  <p className="card-category">Users done on your app by the users</p>
                </div>
                <div className="card-header">
                </div>
                <div className="card-body table-full-width table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <th>S.No.</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                    </thead>
                    <tbody>
                      {users.map((item, index) => (
                        <tr key={index} onClick={e => { viewChanged(item) }}>
                          <td>{index + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Pagination
                activePage={queryData.page}
                itemsCountPerPage={10}
                totalItemsCount={queryData.totalPages}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={pageChanged}
              />
            </div>
          </div>
        </>
      }
      {
        view === 'friend' &&
        <>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-plain table-plain-bg">
                <div className="card-header">
                  <button onClick={goBack} type="button" className="btn btn-primary">Go Back</button>
                  <h4 className="card-title">User - {user.firstName} {user.lastName} </h4>
                  <p className="card-category">Friends List</p>
                </div>
                <div className="card-header">
                </div>
                <div className="card-body table-full-width table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <th>S.No.</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                    </thead>
                    <tbody>
                      {user.UserFriends.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.User.firstName}</td>
                          <td>{item.User.lastName}</td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
