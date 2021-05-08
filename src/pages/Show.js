/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
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

    return (<div><ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
)
}

export default Show;