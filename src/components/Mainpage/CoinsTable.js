import './cointable.css'
import React,{useState,useEffect,useRef,useContext} from 'react';
import { CoinObj } from '../coinholder';
import emptystar from '../../icons/stars/emptystar.png';
import fullstar from '../../icons/stars/fullstar.png';
import halfstar from '../../icons/stars/halfstar.png'
import { ParticularCoin } from '../../contextfolder/Coindata';
import { v4 as uuidv4 } from 'uuid';
import CoinInfo from './CoinInfo';
import { useNavigate } from 'react-router-dom';
import binancelogo from '../../chainLogo/binanceLogo.png';
import ethereumlogo from '../../chainLogo/ethereumLogo.png';
import {Statecontext} from '../CointoviewContext';

const CoinsTable = ({overallwidth}) => {
    const[coinhold, setcoinhold] = useState( CoinObj );
    const [coinheader,setcoinheader] = useContext(Statecontext).coinheader;
    const [tableposref,settableposref] = useContext(Statecontext).tableposref;
    const[coins,setcoins] = useState(coinhold);
    const [search,setsearch] = useState('');
    const [buttonColor, setbuttoncolor] = useState(['rgb(2, 2, 30)','#708AF4','#708AF4']);
    const tableref = useRef('');
    
    const inputRef = useRef('');

    useEffect( ()=>{
      settableposref(tableref)
    },[])
    useEffect( ()=>{
      
      if(coinheader==='first'){

        setcoins(coinhold)
      }

      else if(coinheader==='second'){
        setcoins(coinhold.slice(0,3))
      }
      else if(coinheader==='third'){
        setcoins(coinhold.slice(4,7))
      }

      else{
        setcoins(coinhold.slice(8,11))
      }
      
    },[coinheader])

    const clickHottest = ()=>{
      setcoinhold(CoinObj);
      setcoins(CoinObj);
      setbuttoncolor(['rgb(2, 2, 30)','#708AF4','#708AF4'])
    }

    const clickpromoted = ()=>{
      setcoinhold(CoinObj.slice(0,4))
      setcoins(CoinObj.slice(0,4));
      setbuttoncolor(['#708AF4','rgb(2, 2, 30)','#708AF4'])
    }

    const clickalltime = ()=>{
      setcoinhold(CoinObj.slice(5,9))
      setcoins(CoinObj.slice(5,9));
      setbuttoncolor(['#708AF4','#708AF4','rgb(2, 2, 30)'])
      
    }

    const handleSearch = () =>{
          return coinhold.filter( (coin)=> (coin[Object.keys(coin)]['name'].toLowerCase().includes(search)||coin[Object.keys(coin)]['symbol'].toLowerCase().includes(search)))
    }

    const Onchange = (e)=>{
       setsearch(e.target.value)
    }

   const inputBorder = ()=>{
     return '0px solid black'
   }

      
     

  return <div ref={tableref} style={{marginTop:'60px', color:'white',boxSizing:'border-box'}}>
    
      <p className='highlighted' onClick={()=> console.log(tableref.current.offsetTop)}>HIGHLIGHTED</p>
      
      <div className='headerClass'>
           <div className='tableheader'><p className='headerleft' >NAME</p> <div className='headerright' ><p className='chain'>CHAIN</p> <p className='capRank'>MARKET-CAP</p> <p className='launch'>LAUNCH-DATE</p> <p className='change'>CHANGE(24hrs)</p> <p className='voteheader' >VOTE</p></div></div>
           { coins.length== 0 ?<div style={{fontSize:'30px'}}>NO MATCHES</div> : <div style={{height:'auto',width:'100%',borderRadius:'0px 0px 10px 10px'}}>{coins.map( coin => <CoinInfo overallwidth={overallwidth} coin={coin} key={uuidv4()}/> )}</div>}
      </div>
  </div>;
};

export default CoinsTable;




export function PromotedCoin({overallwidth}) {
  const empty = <img src={emptystar} style={{width:'20px',height:'20px'}}/>;
    const full = <img src={fullstar} style={{width:'20px',height:'20px'}} />;
    const eth = <img src={ethereumlogo} style={{width:'20px',height:'20px',borderRadius:'50%'}}/>;
    const binance = <img src={binancelogo} style={{width:'20px',height:'20px',borderRadius:'50%'}}/>;
  const [colorvote,setcolorvote] = useState('#FFFFFF ')
  const arrowforvote = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/></svg>;
  const[coins,setcoins] = useState(CoinObj.slice(0,4));
  const [votes,setvotes] = useState(0);
  const [stars,setstars] = useState(emptystar);
  const {votevalidation} = ParticularCoin();
  const navigate = useNavigate()

  const StarClick = ()=>{
    if(votevalidation){
      if(votes<=1){
        setvotes(votes+1);
        
      }
    }
    else{
      alert('please log in to vote')
      navigate('/signin')
    }
  }



  

  useEffect(
    ()=>{
      if(votes===1){
        setstars(halfstar)
      }

      if(votes===2){
        setstars(fullstar)
      }

    },[votes])

    useEffect( ()=>{
      setcoins(CoinObj.slice(0,4))
    },[])


  return <div style={{width:'90%',margin:'0px auto',marginTop:'-15px'}}>
            <div style={{width:'100%',height:'auto',borderRadius:'10px',margin:"30px auto",marginBottom:'0px',boxSizing:'border-box'}}>
           <div className='tableheader'><p className='headerleft' >NAME</p> <div className='headerright'><p className='chain'>CHAIN</p> <p className='capRank'>MARKET-CAP</p> <p className='launch'>LAUNCH-DATE</p> <p className='change'>CHANGE(24hrs)</p> <p className='voteheader'>VOTE</p></div></div>  
              {  coins.map( coin => <div className='coinselector'  key={uuidv4()}>
    
    <div className='tableleft' >
    <div style={{width:'150px',display:'flex',alignItems:'center',justifyContent:"left",padding:'0px'}}>
      <img className='tablecoinlogo' style={{borderRadius:'50%'}} src={coin[Object.keys(coin)]['img']} alt='coinLogo'/>
      <div style={{marginLeft:'15px'}}>
        <p style={{color:'white',textAlign:'left'}}>{coin[Object.keys(coin)]['name']}</p>
        <p style={{color:'grey',textAlign:'left',fontSize:'12px'}}>{coin[Object.keys(coin)]['symbol']}</p>
      </div>    
    </div>
    </div>
       <div className= 'tableright'><p className='chain'><span style={{display:'flex',justifyContent:'center',alignItems:"center"}}>{coin[Object.keys(coin)]['chain'] === 'ETH'? eth:binance}</span> <span style={{display:'flex',justifyContent:'center',alignItems:"center",marginLeft:'4px'}}>{coin[Object.keys(coin)]['chain']}</span></p>
            <p className='capRank'>{coin[Object.keys(coin)]['market_cap_rank']}</p>
            <p className='launch'>{coin[Object.keys(coin)]['launch']}</p>
            <p className='change' style={{textAlign:'center',width:'20%',display:overallwidth>700?'block':'none',color:coin[Object.keys(coin)]['change'][0]=== "+"?'green':'red'}}>{coin[Object.keys(coin)]['change']}</p>
            <div style={{minWidth:'75px',width:'20%',display:'flex',alignItems:'center',justifyContent:'center',color:colorvote}}><div style={{width:'75px',height:"20px",paddingBottom:'27px',borderRadius:'12px',border:'2px solid #FFFFFF',backgroundColor:'transparent'}}><p style={{display:'flex',alignItems:'center',justifyContent:'center'}} onClick={StarClick}>{arrowforvote}</p>
              <p  style={{fontSize:'15px',color:{colorvote}}}>{coin[Object.keys(coin)]['vote']}</p>
              </div>                     
            </div>
            <div className='starholder'>{coin[Object.keys(coin)]['watchlist']?full:empty}</div>
       </div>
    </div> 
    
    )}
    </div>
    </div>
  
}



