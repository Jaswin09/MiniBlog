import React,{useEffect,useState,useContext} from "react";
import { UserContext } from '../../App'


const Profile =()=>{
    const [mypics,setPics] =useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage]=useState("")
    useEffect(()=>{
        fetch('/myposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            //{state?state.followers.length:"0"}
            setPics(result.posts)
        })
    },[])
    useEffect(()=>{
        if(image){
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
               // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
               // dispatch({type:"UPDATEPIC",payload:data.url})
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer " +localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[image])

    const updatephoto=(file)=>{
        setImage(file)
    }

    return(
        <div style={{maxWidth:"800px",margin:"1px auto",color:"white"}}>
            <div className="profilebar" >
            
                    <div>
                        <img style={{width:"180px",height:"180px",borderRadius:"90px"}}
                        src={state?state.pic:"loading"}/>
                        
                    </div>
                    <div>
                        <h1>{state?state.name:"loading"}</h1>
                        <h3>{state?state.email:"loading"}</h3>
                        <div className="file-field input-field">
                        <div className="btn">
                            <span>Edit Profile</span>
                            <input type="file" onChange={(e)=>updatephoto(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",width:"115%"}}>
                    
                                        <h5>{mypics.length} posts</h5>
                                        <h5>{state?state.followers.length:"0"} followers</h5>
                                        <h5>{state?state.following.length:"0"} following</h5>                                        
                        </div>
                    </div>
                 
            </div>

            <div className="gallery">
                {
                  mypics.map(item=>{
                      return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/> 
                      )
                  })  
                }
            </div>
        </div>
    )
}

export default Profile