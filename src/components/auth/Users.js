import { useEffect, useState } from "react"
import axios from 'axios';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.js'
import { Table } from 'react-bootstrap'

function Users({ auth: { isAuthenticated, loading }, logout}) {
  const [usersList,setUserList]=useState([])
  const [pending, setPending] = useState(false)
  const [checkedUsers, setCheckedUsers] = useState([])

  const [checkedUsersId,setCheckedUsersId]=useState([])
  const [isCheckAll, setIsCheckAll] = useState(false);

  const history = useNavigate()
  const authLink = (
    <Link to='/' onClick={() => logout(localStorage.getItem('id'))}>
      Logout
    </Link>
  )


 

  var fetchData = async () => {
    setPending(true)
    await axios("https://itransition-task4-auth.herokuapp.com/api/users")
    .then(res => {
      Object.keys(res.data).forEach(dat => {
        if(res.data[dat].email === localStorage.getItem('email')){
          localStorage.setItem('id', res.data[dat]._id)
          console.log(res.data[dat]._id)
        }
      })
      // console.log(res.data._id)
      setUserList(res.data)
    }
    )
    setPending(false)
  };
  useEffect(() => {
      fetchData();
  }, []);
  // const handleBlock= async (userID, userStatus)=>{
  //   var changedStatus = userStatus === "active"?"blocked":"active";
  //   await fetch(`http://localhost:5001/api/users/${userID}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "status": changedStatus
  //     })
  //   })
  //   fetchData();
  // }

  const unblockCheckedUsers = () => {
    checkedUsersId.map(async (selectedUserId) => {
      await fetch(`https://itransition-task4-auth.herokuapp.com/api/users/${selectedUserId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "status": 'active'
        })
      })
    fetchData(); 
    })
  }
  const blockCheckedUsers = () => {
    checkedUsersId.map(async (selectedUserId) => {
      await fetch(`https://itransition-task4-auth.herokuapp.com/api/users/${selectedUserId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "status": 'blocked'
        })
      })
    
    //   updatedArray.map(updatedArr => {
    //   if(updatedArr[2] === localStorage.getItem("email") && updatedArr[1] === 'blocked'){
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("email")
    //     logout()
    //     history("/");
    //   }
    // });
    fetchData();
    })
  }

  // const handleAllCheck = (event) => {
  //   console.log("checked users",usersList)
  //   handleCheck(event.target.checked)
  // }

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setCheckedUsersId(usersList.map(li => li._id));
    if (isCheckAll) {
      setCheckedUsersId([]);
    }
  };

  const handleChangeCheckbox=(e)=>{
    const { id, checked } = e.target;
    setCheckedUsersId([...checkedUsersId, id]);
    if (!checked) {
      setCheckedUsersId(prev=>prev.filter(item => item !== id));
    }
  }

  return (
      <div id='users_list'>
        <Table >
          <thead>
            <tr>
              <th><input type="checkbox" name="" onChange={handleSelectAll} /></th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login time</th>
              <th>Last Register time</th>
              <th>Status</th>
              <th><button className="block_unblock_Button blockBTN" onClick={blockCheckedUsers} disabled={!checkedUsersId.length}>Block</button></th>
              <th><button className="block_unblock_Button unblockBTN" onClick={unblockCheckedUsers} disabled={!checkedUsersId.length}>Unblock</button></th>
            </tr>
          </thead>
          <tbody>
          {usersList.map(user=>(
        <tr key={user._id}>
          <td><input type="checkbox" onChange={handleChangeCheckbox} id={user._id} checked={checkedUsersId.includes(user._id)} /></td>
          {/* <td><input type="checkbox" name={user.name}  value={user._id + ` ${user.status}` + ` ${user.email}`} onChange={handleCheck} checked={checkedUsers.includes(user._id + ` ${user.status}` + ` ${user.email}`)} /></td> */}
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{new Date(user.loginTime).toLocaleString()}</td>
          <td>{new Date(user.time).toLocaleString()}</td>
          <td className={`${user.status==='active'?'statusActiveTxt':'statusBlockedTxt'}`}>{user.status==='active'?'Active':'Blocked'}</td>
        </tr>
      ))}
      {/* <div key={user._id}>
          <input type="checkbox" id="userCheck" value={user._id + ` ${user.status}`} onChange={handleCheck} />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.status === 'blocked' ? 'Blocked' : 'Active'}
            <button disabled={pending} onClick={() => handleBlock(user._id, user.status)}>
              {user.status === 'active' ? 'Block' : 'Unblock'}
            </button>
            </p>
        </div> */}
          </tbody>
        </Table>
        {authLink}

    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Users);
