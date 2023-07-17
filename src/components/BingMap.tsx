import React, {useEffect, useRef, useState} from "react";
import "bingmaps"
// import { loadBingApi, Microsoft } from "../BingMapLoader";
import BingMapsReact from "bingmaps-react"

const BingMap = (props: any) => {

    const pushpin ={
        center: {
            latitude: props.lat,
            longitude: props.lon
        },
        options: {
            title: props.name
        }
    }

    const pushPins = [pushpin];

    const ref = useRef<any>()
    const [bingMapReady, setBingMapReady] = useState(false);
        
      


    useEffect(() => {

        
    }, [])

    return (
        <>
            
             <div>

                <BingMapsReact
                        bingMapsKey={process.env.REACT_APP_API_KEY_BINGMAP}
                        style={{}}
                        height="30vh"
                        mapOptions={{
                            navigationBarMode: "square",
                        }}
                        onMapReady={function (){
                            setBingMapReady(true);
                        }}
                        pushPins={bingMapReady ? pushPins : null}
                        width="34vw"
                        viewOptions={{
                            center: { 
                                latitude: props.lat, 
                                longitude:props.lon },
                            mapTypeId: "Road",
                            }}
                        
                        
                />

            </div>
        </>
    )
}


export default BingMap;
