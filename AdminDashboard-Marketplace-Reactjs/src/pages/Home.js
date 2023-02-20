import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { resetData } from '../features/authSlice';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetData());
    }, [])
    
  return (
    <div>Home</div>
  )
}
