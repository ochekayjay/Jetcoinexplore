import './cointable.css'
import React,{useState,useEffect,useRef} from 'react';
import { CoinObj } from '../coinholder';
import emptystar from '../../icons/stars/emptystar.png';
import fullstar from '../../icons/stars/fullstar.png';
import halfstar from '../../icons/stars/halfstar.png'
import { ParticularCoin } from '../../contextfolder/Coindata';
import { v4 as uuidv4 } from 'uuid';
import CoinInfo from './CoinInfo';
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {
    const[coinhold, setcoinhold] = useState( CoinObj );
    
    const[coins,setcoins] = useState(coinhold);
    const [search,setsearch] = useState('');
    const [buttonColor, setbuttoncolor] = useState(['rgb(2, 2, 30)','#708AF4','#708AF4']);
    
    const inputRef = useRef('')

    useEffect( ()=>{
      if(search.length>0){

        setcoins(handleSearch())
      }
      else{
       
        setcoins(CoinObj)
        setbuttoncolor(['rgb(2, 2, 30)','#708AF4','#708AF4'])
      }
      
    },[search])

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

      
     

  return <div style={{marginTop:'30px', color:'white',boxSizing:'border-box'}}>
    
      <p style={{fontSize:'25px',marginBottom:'30px'}}>CryptoCurrency Data</p>
      <div className='searchandbutton' >
        <div className='buttonsabovesearch'>
          <div style={{border: '1px solid black',display: 'flex',width: '33.3%',height:'30px',padding: '1px 3px',backgroundColor: buttonColor[0],borderRadius: '12px'}} className='Hottest' onClick={clickHottest} ><p style={{fontSize:"17px",display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>Hottest</p></div>
          <div style={{border: '1px solid black',display: 'flex',width: '33.3%',height:'30px',padding: '1px 3px',backgroundColor: buttonColor[1],borderRadius: '12px'}} className='promoted' onClick={clickpromoted}><p style={{fontSize:"17px",display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>Promoted</p></div>
          <div style={{border: '1px solid black',display: 'flex',width: '33.3%',height:'30px',padding: '1px 3px',backgroundColor: buttonColor[2],borderRadius: '12px'}} className='alltime' onClick={clickalltime}><p style={{fontSize:"17px",display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>All-Time</p></div>
        
        </div>
        
      </div>
      <div className='headerClass'>
           <div className='tableheader'><p className='headerleft' >NAME</p> <div className='headerright' ><p className='symbol'>SYMBOL</p> <p className='capRank'>MARKET-CAP</p> <p className='launch'>LAUNCH-DATE</p> <p className='change'>CHANGE</p> <p style={{textAlign:'center',width:'20%'}}>VOTE</p></div></div>
           { coins.length== 0 ?<div style={{fontSize:'30px'}}>NO MATCHES</div> : coins.map( coin => <CoinInfo coin={coin} key={uuidv4()}/> )}
      </div>
  </div>;
};

export default CoinsTable;




export function PromotedCoin() {
  const [colorvote,setcolorvote] = useState('#797878 ')
    const arrowforvote = <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 24 24" width="17px" fill= {colorvote}><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>;
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


  return <div>
            <div style={{backgroundColor:'rgb(0, 0, 24)',width:'90%',height:'auto',borderRadius:'10px',margin:"30px auto",marginBottom:'0px',boxSizing:'border-box'}}>
           <div className='tableheader'><p className='headerleft' >NAME</p> <div className='headerright'><p className='symbol'>SYMBOL</p> <p className='capRank'>MARKET-CAP</p> <p className='launch'>LAUNCH-DATE</p> <p className='change'>CHANGE</p> <p style={{textAlign:'center',width:'20%'}}>VOTE</p></div></div>  
              {  coins.map( coin => <div className='coinselector' coin={coin} key={uuidv4()}>
    
    <div className='tableleft' >
    <div style={{width:'150px',display:'flex',alignItems:'center',justifyContent:"space-between",padding:'0px'}}>
      <img className='tablecoinlogo' style={{borderRadius:'50%'}} src={coin[Object.keys(coin)]['img']} alt='coinLogo'/>
      <p>{coin[Object.keys(coin)]['name']}</p>
    </div>
    </div>
       <div className= 'tableright'><p className='symbol'>{coin[Object.keys(coin)]['symbol']}</p>
            <p className='capRank'>{coin[Object.keys(coin)]['market_cap_rank']}</p>
            <p className='launch'>{coin[Object.keys(coin)]['launch']}</p>
            <p className='change'>{coin[Object.keys(coin)]['change']}</p>
            <div style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'center',color:colorvote}}><div style={{width:'35px',height:"35px",padding:'4px',backgroundColor:'rgba(8, 52, 107,0.4)'}}><p style={{display:'flex',alignItems:'center',justifyContent:'center'}} onClick={StarClick}>{arrowforvote}</p>
                                                                                                 <p  style={{fontSize:'15px',color:{colorvote}}}>{votes}</p>
                                                                                              </div>                      
      </div>
       </div>
    </div> 
    
    )}
    </div>
    </div>
  
}



