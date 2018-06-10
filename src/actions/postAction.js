import { SORT_POSTS , SHOW_DETAIL , FETCHED_RESULTS, DETAILED_VIEW,SET_LOCAL,
     SORT_POSTS_BY_WATCHING ,SORT_POSTS_BY_OWNER,FETCH_TOPICS, SORT_POSTS_BY_FORKS,SORT_POSTS_BY_SCORE}
      from  './types.js';



export const showDetails = (data)=>(dispatch)=>{
    dispatch({
        type:SHOW_DETAIL,
        payload:data
    })
}


export const fetchResults = (data)=>(dispatch)=>{

    let url = `https://api.github.com/search/repositories?q=${data}`;
    fetch(url,{
        method:'get',
        mode:'cors',
        headers:{
          'content-type': 'application/json'
        },
      })
      .then(res=>res.json())
      .then(response=> {

        let frequencyObject={};
        response.items.forEach(function(element) {
            
            let found=0;
            


            for(var key in frequencyObject){

                if(key===element.language){
                    frequencyObject[key]=frequencyObject[key]+1;
                    found=1;
                }
            }
            if(found===0 && element.language!=null){

                frequencyObject[element.language]=1;
            }
        }, this);


        dispatch({
          type:FETCHED_RESULTS,
          payload:response.items,
          initialQuery:data,
          languageObject:frequencyObject
      })});
}
    

export const setDetailedView = (data)=> dispatch=>{
             dispatch(
                 {
                    type:DETAILED_VIEW,
                    payload:data
                }
            )
        }
export const setLocalData = (data)=>dispatch=>{
    localStorage.setItem('resultData', JSON.stringify(data))
    
    dispatch({
        type:SET_LOCAL,
        payload:JSON.stringify(data)
    })
}



export const onSort=(value)=>dispatch=>{

    switch(value){

        case 'forks':
            dispatch({
                type:SORT_POSTS_BY_FORKS
            })
        break;

        case 'stars':
            dispatch(
                {
                type:SORT_POSTS
            }
        )
        break;

        case 'watchers':
            dispatch({
                type:SORT_POSTS_BY_WATCHING,
        
            })
            break;
            
        case 'owner':
            dispatch({
                type: SORT_POSTS_BY_OWNER
            })
            break;
        case 'best_match':
            dispatch({
                type: SORT_POSTS_BY_SCORE
            })
            break;
        default:
            dispatch({
                type:'CHECK_STATE'
            })
            

    }

}


export const setSortFilter=(data)=>dispatch=>{
    dispatch({
        type:'SET_SORT_FILTER',
        payload:data
        
    })
}
export const checkState=()=>dispatch=>{
    dispatch({
        type:'CHECK_STATE'
        
    })
}

export const checkTest = ()=>dispatch =>{
    dispatch({
        type:'CHECK_TEST'
    })
}

export const fetchTopics = (data)=>dispatch=>{

    fetch(`https://api.github.com/repos/${data.owner}/${data.name}/topics`,{
        headers:{
            Accept:'application/vnd.github.mercy-preview+json'
        }
    })
    .then(res=>res.json())
    .then(response=>{
        dispatch({
            type:FETCH_TOPICS,
            payload:response.names
        })
    });

}