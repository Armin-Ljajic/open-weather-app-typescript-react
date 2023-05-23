import React, { useEffect, useState, useContext } from 'react'
import GET, { GETHOURFORECAST, GETIPINFO } from '../API/APIRequest'
import { get } from 'http';
import { resolve } from 'path';
import { Card, TextField, Button, useFormControl } from '@mui/material';
import shadows from '@mui/material/styles/shadows';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../AuthContext';
import AccountComponent from './AccountComponent';
import { BrowserRouter as Router, Route, Link, useNavigate, useLocation } from "react-router-dom";
import BingMap from './BingMap';
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ScrollContainer from 'react-indiana-drag-scroll'
import {GiWaterDrop} from 'react-icons/gi'
import {BsWind} from 'react-icons/bs'
import {FaCompass} from 'react-icons/fa'



const WeatherComponent = () => {
    
    const [searchString, setSearchString] = useState<string>("Helsingborg");
    const [loading, setLoading] = useState<string>("");
    const [response, setResponse] = useState<any>();
    const [alreadyInSaved, setAlreadyInSaved] = useState<String>("");
    const array: any[] = [];
    const [savedTemps, setSavedTemps] = useState<any[]>([]);
    const [limit, setLimit] = useState<number>(4);
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const loc = useLocation();
    const [dailyForecast, setDailyforecast] = useState<any>();
    const [bool, setBool] = useState(false);
    const [ipInfo, setIpInfo] = useState<any>(); 
    const [ip, setIp] = useState<any>(false);
    // const [useDate, setUse Date] = useState<Date>(new Date())
    

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const openAccount = () => {
        navigate("/account")
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
  
    const saveTemp = (temp: any) => {
        console.log(temp)
            if(savedTemps.some((x) => x.name === temp.name) && savedTemps.includes(temp)){
                setAlreadyInSaved("You have already saved this location")
            } else if(savedTemps.length === limit){
                setAlreadyInSaved("You have reached max amount of saved locations")
                
            } else{
                setSavedTemps([...savedTemps, temp]);
                setAlreadyInSaved("")
                console.log(user)
            }
        } 
        
        
    const fetchDailyForeCast = (bool: boolean) => {
        if(bool === true){
            GETHOURFORECAST(response?.coord.lat, response?.coord.lon).then((res: any) =>{
                setDailyforecast(res.body);
                setBool(true)
             }).
             catch((err:any) => {
                 setLoading("error")
             })
        } else {
            setBool(false);
        }
    }
    
    const fetchIPInfo = () => {
        GETIPINFO().then((res: any) => {
            setIpInfo(res.body)
            setIp(true)
            GET(res.body.city)
            .then((res: any) => {
                setLoading("loading")
                setResponse(res.body);
                console.log(response);
                setLoading("success");
                setIp(false)
                setSearchString(ipInfo.city)
                // setSearchString(ipInfo.city)
            })
            .catch((err: any) => {
                setLoading('error');
            })
        }).
        catch((err: any) => {
            console.log(err)
            setIp(false);
        })
        
    }

    const removeTemp = (i: any) => {
       if(i > -1){
        savedTemps.splice(i, 1)
       }
        setSavedTemps([...savedTemps]);   
        console.log(savedTemps);     
    }
    
    useEffect(() => {
        console.log(bool)
        console.log(window.Microsoft)
        if(bool == true){
            
        }
    }, [searchString, response, savedTemps, bool, ipInfo])
    
   console.log(dailyForecast)
   console.log(response)
   console.log(ipInfo)
   console.log(ip)
   console.log(searchString)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "12vh"
      }));
    
    
   
    return (

            
            <>
                <div className="Weather-grid">
                    <div className="grid1">
                    
                    </div>
            <div className="grid2" style={{}}>
                
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "38vw", height: 50, margin: "0 auto", marginLeft: 10}}>
                    <IconButton sx={{ p: '10px' }} aria-label="menu"  id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                            <MenuItem onClick={() => fetchIPInfo()}>IpInfo</MenuItem>
                            <MenuItem onClick={openAccount}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    <InputBase type="text" placeholder='Search for a city...' onChange={(e) => setSearchString(e.target.value)} sx={{ ml: 1, flex: 1 }}/>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        
                    <IconButton  type='button' onClick={() => GET(searchString) 
                                            .then((res: any) => {
                                                setLoading("loading")
                                                setResponse(res.body);
                                                console.log(response);
                                                setLoading("success");
                                            })
                                            .catch((err: any) => {
                                                setLoading('error');
                                            })}><SearchIcon /></IconButton>
                                            
                                         
                </Paper>
                           {/* <i style={{width: 700, fontSize: 20, display: "flex", marginLeft: "14vw"}}>{savedTemps.includes(response) ? alreadyInSaved : savedTemps.length === limit ? alreadyInSaved : null}</i>                  */}
                            {
                                response ? response.weather.map((x:any) => {
                                    return (
                                       
                                        <Card variant="outlined" elevation={5} sx={{width: "34.3vw", marginTop: 2, padding: 5, backgroundImage: "linear-gradient(white, lightblue)", boxShadow: 3, height: "80.5vh", marginLeft: 9.5, fontSize: 15}} onClick={() => saveTemp(response)}>
                                            <Switch {...label} onClick={() => fetchDailyForeCast(!bool)} checked={bool} sx={{display: "flex", float: "right"}}/>
                                            <div style={{borderRadius: "5px", 
                                            width: "32.5vw", 
                                            height: "25vh" , 
                                            padding: "15px", 
                                            display: "flex", 
                                            background: "white", 
                                            flexDirection: "row", 
                                            gap: "50px", 
                                            justifyContent: "center", 
                                            fontSize: 13, 
                                            marginBottom: 10,
                                            }}>
                                                <div>
                                                    <h4 style={{marginRight: "15vw", display: "inline-block"}}>Current Weather</h4>
                                                    <Divider sx={{ height: 2, width: "20vw", m: 0.5 }} orientation="horizontal" />
                                                    <p style={{marginRight: "15vw"}}>{response.name}</p>
                                                    
                                                    <div style={{display: "flex", flexDirection: "row", color: "#282c34", margin: 0, height: 100}}>
                                                        <p><img src={`http://openweathermap.org/img/w/${x.icon}.png`} alt="img" style={{width: "7vw"}}/> </p>
                                                        <p style={{fontSize: 50 }} >
                                                            {response.main.temp}°
                                                        </p>
                                                    </div>
                                                    <p style={{marginRight: "15vw", marginTop: "-20px;"}}>{x.main}</p>
                                                    {/* <p style={{marginRight: "15vw"}}>{x.description}</p> */}
                                                </div>
                                                <Divider orientation='vertical' sx={{height: "25vh"}}/>
                                                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginRight: "0"}}>
                                                    <p style={{color: "grey" }}>Feels like {response.main.feels_like} °</p>
                                                   
                                                    <p><FaCompass/> Pressure {response.main.pressure}hPa</p>
                                                    <p><GiWaterDrop/>Humidity {response.main.humidity}%</p>
                                                    <p><BsWind/> Wind {response.wind.speed} kpH</p>
                                                </div>
                                            </div>
                                            <div style={{marginTop: "2vh"}}>
                                                <BingMap 
                                                lat={response.coord.lat} 
                                                lon={response.coord.lon} 
                                                name={response.name}/>
                                            </div>
                                            <ScrollContainer horizontal={true}>
                                                <Stack direction="row" spacing={2} sx={{height: "15vh", marginTop: 5}}>
                                                    {dailyForecast && bool ===  true? dailyForecast.list.map((daily: any) => {
                                                        return (
                                                            <Item sx={{fontSize: 8}}>
                                                                <p>
                                                                    {new Date(daily.dt_txt).toLocaleDateString('en-US', {weekday: "long"})}
                                                                </p>
                                                                <p>{daily.dt_txt}</p> 
                                                                <p>{daily.main.temp} °</p> 
                                                                {daily.weather.map((wh: any) => {
                                                                    return <img src={`http://openweathermap.org/img/w/${wh.icon}.png`} alt="img" style={{width: 50}}/>
                                                                })}
                                                            </Item>
                                                        )
                                                    }): null}    
                                                </Stack>     
                                            </ScrollContainer>                                                   
                                        </Card>
                                        
                                    )
                                }) :  null 
                            }
                        </div>
                        {/* <div className="grid3">
                                {savedTemps.map((x: any, i) => { 
                                        return (
                                            <div className="saved-temp" style={{marginTop: 33, width: 200, height: 350}} onClick={() => removeTemp(i)}>
                                                <h4>{x.name}</h4>
                                                <h3>{x.main.temp} C</h3>
                                                <img src={`http://openweathermap.org/img/w/${x.weather[0].icon}.png`} alt="img" style={{width: 50}}/>
                                                <h2>{x.weather[0].description}</h2>
                                            </div>
                                        )          
                                })}
                        </div> */}


                </div>


            </>


    )
}

export default WeatherComponent;
