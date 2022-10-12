import React from "react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

class Scan extends React.Component{
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    render() {
        return (<div>
            <h1>Ticket Scanner</h1>
            <Html5QrcodePlugin 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={this.onNewScanResult}/>
        </div>);
    }

    onNewScanResult(decodedText, decodedResult) {
        // Handle the result here.
    }
}

export default Scan;