import React,{useState ,useEffect} from "react";
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const SignUp =()=>{
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)
    const history = useHistory()

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
     
    const uploadPic=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","MiniBlog")
        data.append("cloud_name","jaswin09")
        fetch("https://api.cloudinary.com/v1_1/jaswin09/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#c62828 red darken-3"}) 
             return
         }
     fetch("/signup",{
         method:"post",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             name,
             password,
             email, 
             pic:url 
         })
     }).then(res=>res.json())
     .then(data=>{
        if(data.error){
            M.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
            M.toast({html:data.message,classes:"#2e7d32 green darken-3"})
            history.push('/signin')
        }
     }).catch(err=>{
         console.log(err)
     })
    }

    const PostData =()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
    return(
        <div className="mycard">
            <div className ="card auth-card">
                <h2>MiniBlog</h2>
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                 <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Profile ImG</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                <br/>
                <button class="btn waves-effect waves-light"  onClick={()=>PostData()}> Register
                </button>
                <h5>
                <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignUp