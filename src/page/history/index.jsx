import React, { useEffect } from 'react'
import api from '../../config/axios';

function History() {

    const fetchHistory = async() =>{
        try{
            const response = await api.get("/..")
        
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() =>{
        fetchHistory();
    },[]);

  return (
    <div>History</div>
  )
}

export default History