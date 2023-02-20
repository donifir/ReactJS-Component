import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Paginate from './components/Paginate'

export default function App() {
  const [datas, setDatas] = useState([])
  
  async function getUser() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setDatas(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <div>App
      {/* {console.log(data)} */}
      <Paginate data={datas}/>
    </div>
  )
}
