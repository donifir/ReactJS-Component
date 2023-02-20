import React,  { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './print/ConponentToPrint';

export default function App() {
  const componentRef = useRef();
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
    </div>
  )
}
