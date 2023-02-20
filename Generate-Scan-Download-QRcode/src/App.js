import React, { useState } from "react";
import QRCode from "qrcode"; //import



export default function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateQrCode = async (e) => {
    e.preventDefault();
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const Data1 = (
    <div>
      <form className="row g-3" onSubmit={generateQrCode}>
        <div className="col-auto">
          <label htmlFor="inputPassword2" className="visually-hidden">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPassword2"
            placeholder="qrcode"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </div>
        <div className="col-auto">
          {/* <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>generateQrCode()}> */}
          <button type="submit" className="btn btn-primary mb-3">
            Confirm identity
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center">
        {imageUrl ? (
          <a href={imageUrl} download>
            <img src={imageUrl} alt="img" />{" "}
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );

  // const qrScanner = new QrScanner(videoElem, result => console.log('decoded qr code:', result));
  // const QrScanner = require('qr-scanner');
  const Data3=(
    <div className="card">
      <div className="card-header">Scan barcode</div>
      <div className="card-body"><video></video></div>
    </div>
  )

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h1>Generate download and Scan QRcode with React js</h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">{Data1}</div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">adwd</div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">{Data3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


//qrcode