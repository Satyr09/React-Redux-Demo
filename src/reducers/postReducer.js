import {SORT_POSTS, SHOW_DETAIL,FETCHED_RESULTS , DETAILED_VIEW,SET_LOCAL ,
     SORT_POSTS_BY_WATCHING,SORT_POSTS_BY_OWNER } from  '../actions/types.js';

const initialState = {
    items: [],
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
            
            console.log('Here');
            console.log(state);
            return {...state , results:sortedItems};
        case SHOW_DETAIL:
            console.log(action.payload);

        case FETCHED_RESULTS:

            return {...state,results:action.payload,initialQuery:action.initialQuery}

        case DETAILED_VIEW:
            return {...state,detailedView:action.payload}

        case SET_LOCAL:
            localStorage.setItem('resultData', action.payload)
            return state ;

        case SORT_POSTS_BY_WATCHING:
            let sortedByWatching = state.results.slice().sort((a,b)=>{
                if(a.watchers_count>b.watchers_count)
                return -1;
                return 1;
            });
            
            console.log(state);
            return {...state , results:sortedByWatching};
        case SORT_POSTS_BY_OWNER:
            let sortedByOwner = state.results.slice().sort((a,b)=>{
                if(a.owner.login>b.owner.login)
                return -1
                return 1
            })

            return {...state,results:sortedByOwner}

        case 'SET_SORT_FILTER':

            return {...state,sortFilter:action.payload}


        case 'CHECK_STATE':

            console.log(state);

        case 'CHECK_TEST':
            return{...state,testCheck:'Daipayan'}


        default:
        return state;
    }
}


