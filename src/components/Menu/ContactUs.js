import React,{useState} from 'react';
import './contactUs.css';
import { useNavigate  } from 'react-router-dom';

export default function ContactUs({overallwidth}) {
    const [firstname,setfirstname] = useState('')
    const [lastname,setlastname] = useState('')
    const [email,setemail] = useState('')

    const navigate = useNavigate()
    const changeFirstname = (event)=>{
        setfirstname(event.target.value)
      }

      const changeLastname = (event)=>{
        setlastname(event.target.value)
      }
      const changeEmail = (event)=>{
        setemail(event.target.value)
      }
    const backward = <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>;
  return (
    <div className='contactHolder'>
        <div style={{width:'100%',display:'flex',justifyContent:'left',flexDirection:'column'}}>
                <div style={{color:"white",paddingLeft:'2.5%',width:"100%",justifyContent:"left",display:"flex",boxSizing:"border-box",cursor:'pointer',fontSize:'20px'}} onClick={()=> navigate('/')}><p>{backward}</p>Back</div>
                <p className='enlist'><strong>GET IN TOUCH!</strong></p>
        </div>

        <div className='contactlayerOne'>
            <div className='contactlayerTwo' >
                <div className='contactdivOne' >
                    <div style={{width:'100%',height:'45px',display:'flex',justifyContent:'space-between',border:'0.5px solid white',borderWidth:'0px 0px 0.5px'}}>
                        <p style={{marginBottom:'0px',color:'white'}}>Firstname:</p>
                        <input onChange={changeFirstname} type='text' style={{fontSize:'17px',backgroundColor:'transparent',width:'100%',color:'white',marginBottom:'0px',paddingTop:"30px",boxSizing:'border-box',height:'100%',border:'0px solid white',outline:'none'}}/>
                    </div>

                    <div style={{width:'100%',height:'45px',display:'flex',justifyContent:'space-between',border:'0.5px solid white',borderWidth:'0px 0px 0.5px'}}>
                        <p style={{marginBottom:'0px',color:'white'}}>Lastname:</p>
                        <input onChange={changeLastname} type='text' style={{fontSize:'17px',backgroundColor:'transparent',width:'100%',color:'white',marginBottom:'0px',paddingTop:"30px",boxSizing:'border-box',height:'100%',border:'0px solid white',outline:'none'}}/>
                    </div>
                    <div style={{width:'100%',height:'45px',display:'flex',justifyContent:'space-between',border:'0.5px solid white',borderWidth:'0px 0px 0.5px'}}>
                        <p style={{marginBottom:'0px',color:'white'}}>Email:</p>
                        <input onChange={changeEmail} type='email' style={{fontSize:'17px',backgroundColor:'transparent',width:'100%',color:'white',marginBottom:'0px',paddingTop:"30px",boxSizing:'border-box',height:'100%',border:'0px solid white',outline:'none'}}/>
                    </div>
                </div>

                <div className='contactdivTwo' >
                <section style={{textAlign:'left',width:'100%',height:'100%',boxSizing:'border-box'}}>
                            <p style={{textAlign:'left',height:'20%',color:'white',paddingBottom:overallwidth<=900?'5px':'15px',boxSizing:'border-box'}}>Message</p>
                            <textarea  style={{height:'80%',paddingTop:'10px',paddingLeft:'10px',boxSizing:'border-box',borderRadius:'10px',width:'100%',fontSize:'15px',backgroundColor:'#071323' ,color:'white',outline:'none',borderWidth:'0px 0px 0px',borderColor:'rgba(95, 94, 94, 0.698)',textAlign:'left'}}/>
                        </section>

                </div>
                    
            </div>
        </div>
    
    </div>
  )
}