import { SORT_POSTS , SHOW_DETAIL , FETCHED_RESULTS, DETAILED_VIEW,SET_LOCAL,
     SORT_POSTS_BY_WATCHING ,SORT_POSTS_BY_OWNER} from  './types.js';



export const showDetails = (data)=>(dispatch)=>{
    console.log(data);
    dispatch({
        type:SHOW_DETAIL,
        payload:data
    })
}


export const fetchResults = (data)=>(dispatch)=>{

    console.log('fetchResults called : '+data);
    let url = `https://api.github.com/search/repositories?q=${data}`;
    console.log(url);
    fetch(url,{
        method:'get',
        mode:'cors',
        headers:{
          'content-type': 'application/json'
        },
      })
      .then(res=>res.json())
      .then(response=> {
        console.log(response);  
        dispatch({
          type:FETCHED_RESULTS,
          payload:response.items,
          initialQuery:data
      })});
}
    

export const setDetailedView = (data)=> dispatch=>{
        console.log('Was called');
             dispatch(
                 {
                    type:DETAILED_VIEW,
                    payload:data
                }
            )
        }
export const setLocalData = (data)=>dispatch=>{
    dispatch({
        type:SET_LOCAL,
        payload:JSON.stringify(data)
    })
}



export const onSort=(value)=>dispatch=>{

    switch(value){

        case 'forks':


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