import axios from "axios";
import React, { useEffect, useState } from "react";
import Images from "./components/Image"

export default function App() {
  const [images, setImages] = useState([]);
  async function getUser() {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/photos");
      console.log(response);
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      {/* {console.log(data)} */}
      <Images data={images}/>
    </div>
  );
}
