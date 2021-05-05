import React, { useContext } from 'react'
import { Link,useHistory} from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'

const NavBar =()=>{
  const {state,dispatch}=useContext(UserContext)
  const history = useHistory() 
  const renderList =()=>{
    if(state){
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/myfollowingposts">My followings</Link></li>,
        <li> <button className="btn #e53935 red darken-1" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          M.toast({html:"You are logged out!",classes:"#2e7d32 green darken-3"})
          history.push('/signin')
        }}>Logout
        </button></li>
      ]
    }else{
      return[
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left">MiniBlog</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default NavBar