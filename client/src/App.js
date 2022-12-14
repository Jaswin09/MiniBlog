import './App.css';
import React,{useEffect,createContext,useReducer, useContext} from 'react'
import NavBar from './components/screens/Navbar'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import SignUp from './components/screens/signup'
import Signin from './components/screens/signin'
import Profile from './components/screens/profile'
import CreatePost from './components/screens/createpost'
import {reducer,initialState } from "./reducers/userReducer"
import UserProfile from './components/screens/Userprofile'
import Subsrcibe from './components/screens/subscribeuserpost'
export const UserContext = createContext()

const Routing =()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route path="/signin">
      <Signin/>
    </Route>
    <Route path="/signup">
      <SignUp/>
    </Route>
    <Route exact path="/profile">
      <Profile/>
    </Route>
    <Route path="/create">
      <CreatePost/>
    </Route>
    <Route path="/profile/:userid">
      <UserProfile/>
    </Route>
    <Route path="/myfollowingposts">
      <Subsrcibe/>
    </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
