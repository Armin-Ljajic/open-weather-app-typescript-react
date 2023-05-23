import React, {useEffect, useRef} from "react";
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
    

        
      


    useEffect(() => {
       

        
    }, [])

    return (
        <>
            {/* <script type="text/javascript" src='http://www.bing.com/api/maps/mapcontrol?callback=initMap'></script>
            <div ref={ref} className="map" style={{position:'relative', width:'600px', height:'400px'}}></div> */}
            <div>

                <BingMapsReact
                        bingMapsKey="Aiz3FXWF3d9BNzeRon844MKzGplbv4r7s-MaZ5yNVUcmIf6rfECI16Q9oNwZxrBK"
                        style={{}}
                        height="30vh"
                        mapOptions={{
                            navigationBarMode: "square",
                            
                        }}
                        
                        pushPins={pushPins}
                        width="34vw"
                        viewOptions={{
                            center: { latitude: props.lat, longitude: props.lon },
                            mapTypeId: "Road",
                            }}
                        
                        
                    />

            </div>
        </>
    )
}


export default BingMap;
