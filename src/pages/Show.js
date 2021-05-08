import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config'

const reducer = (prevstate, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return {isloading: false, error: null, show: action.show};
        }

        case 'FETCH_FAILED': {
            return {...prevstate, isloading: false, error: action.error};
        }

        default: return prevstate;
    }
}

const initialState ={
    show: null,
    isloading: true,
    error: null,
};

const Show = () => {
    const {id} = useParams();

    const [{ show, isloading, error }, dispatch] = useReducer(
        reducer,
        initialState
    );


    useEffect( ()=> {
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            setTimeout( () => {
                if(isMounted){
                    dispatch({ type: 'FETCH_SUCCESS', show: results });
                }  
            });
           
        }).catch(err => {
            if (isMounted) {
            dispatch({ type: 'FETCH_FAILED', error: err.message})
            }
        })
        return () => {
            isMounted = false;
        }

    }, [id]);

    console.log('show', show);
    

    if(isloading) {
        return <div>loading...</div>
    }
    if(error) {
        return <div>Oops! Looks like an error: {error}</div>
    }

    return <div>THis is Show page</div>

}

export default Show;