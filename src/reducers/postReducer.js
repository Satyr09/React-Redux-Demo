import {SORT_POSTS, SHOW_DETAIL,FETCHED_RESULTS , DETAILED_VIEW,SET_LOCAL ,
     SORT_POSTS_BY_WATCHING,SORT_POSTS_BY_OWNER,FETCH_TOPICS,SORT_POSTS_BY_FORKS,SORT_POSTS_BY_SCORE } 
     from  '../actions/types.js';

const initialState = {
    items: [],          //not used
    results : []
}

export default function postReducer(state=initialState,action){
    switch(action.type) {
        
        case SORT_POSTS:
            let sortedItems = state.results.slice().sort((a,b)=>{
                if(a.stargazers_count>b.stargazers_count)
                return -1;
                return 1;
            });
            
            return {...state , results:sortedItems};
        case SHOW_DETAIL:
            console.log(action.payload);
            return state;
            

        case FETCHED_RESULTS:

            /*languageObject containes the calculated frequency of top languages in response object*/
        
            return {...state,results:action.payload,initialQuery:action.initialQuery,languageObject:action.languageObject}

        case DETAILED_VIEW:
            return {...state,detailedView:action.payload}

        case SET_LOCAL:
            //localStorage.setItem('resultData', action.payload)
            return state ;

        case SORT_POSTS_BY_WATCHING:
            let sortedByWatching = state.results.slice().sort((a,b)=>{
                if(a.watchers_count>b.watchers_count)
                return -1;
                return 1;
            });
            
            return {...state , results:sortedByWatching};
        case SORT_POSTS_BY_OWNER:
            let sortedByOwner = state.results.slice().sort((a,b)=>{
                if(a.owner.login>b.owner.login)
                return -1
                return 1
            })
            return {...state,results:sortedByOwner}
            
        case SORT_POSTS_BY_FORKS:
            let sortedByForks= state.results.slice().sort((a,b)=>{
                if(a.forks>b.forks)
                return -1
                return 1
            })

            return {...state,results:sortedByForks}
            
        case SORT_POSTS_BY_SCORE:
            let sortedByScore= state.results.slice().sort((a,b)=>{
                if(a.score>b.score)
                return -1
                return 1
            })                

            return {...state,results:sortedByScore}

        case 'SET_SORT_FILTER':

            return {...state,sortFilter:action.payload}


        case 'CHECK_STATE':

            console.log(state);
            return state;

        
        case FETCH_TOPICS:
            return{...state,topics:action.payload}


        default:
            return state;
    }
}


