import React,{useEffect,useState}from 'react'
import './Rowposts.css'
import axios from '../../axios'  
import{imageUrl,API_KEY} from '../../constants/constants'
import Youtube from 'react-youtube'
function Rowpost(props) {
    const [UrlId,setUrlId] = useState('')
    const [movies,setMovies] = useState([])
    useEffect(() => {
        axios.get(props.url).then(response=>{
            console.log(response.data)
            setMovies(response.data.results)
        }).catch(err=>{
            // alert(err)
        })
    },[]);

const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters    
      autoplay:1,
    },
}

const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
        if(response.data.results.length!==0){
            setUrlId(response.data.results[0])
        }else{
            console.log('no video');
        }
    })
}

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
            {movies.map((obj)=>
              <img onClick={()=>handleMovie(obj.id)} key={obj.id}  className={props.isSmall ? 'smallposter' :'poster'} src={`${imageUrl}/${obj.backdrop_path}`} alt="poster" />
            )}
        
       

      
        </div>
     {UrlId &&  <Youtube opts={opts} videoId={UrlId.key}/>}
        </div>
  )
}

export default Rowpost