import React, {useEffect, useRef, useState} from "react";
import "bingmaps"
// import { loadBingApi, Microsoft } from "../BingMapLoader";
import BingMapsReact from "bingmaps-react"

const BingMap = (props: any) => {

    const pushpin ={
        center: {
            latitude: props !== undefined ? props.lat : null,
            longitude: props !== undefined ? props.lon : null
        },
        options: {
            title: props !== undefined ? props.name : null
        }
    }

    const pushPins = [pushpin];

    const ref = useRef<any>()
    const [bingMapReady, setBingMapReady] = useState(false);
        
      


    useEffect(() => {
        setBingMapReady(true);
        
    }, [bingMapReady])

    return (
        <>
            
             <div>

                 { bingMapReady && <BingMapsReact
                        bingMapsKey={process.env.REACT_APP_API_KEY_BINGMAP}
                        style={{}}
                        height="30vh"
                        mapOptions={{
                            navigationBarMode: "square",
                        }}
                        onMapReady={function (){
                            setBingMapReady(true);
                        }}
                        pushPins={props !== undefined ? pushPins : null}
                        width="34vw"
                        viewOptions={{
                            center: { 
                                latitude: props !== undefined ? props.lat : null , 
                                longitude: props !== undefined ? props.lon : null},
                            mapTypeId: "Road",
                            }}
                        
                        
                />
                        }
            </div>
        </>
    )
}


export default BingMap;
