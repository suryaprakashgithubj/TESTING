import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux'
import './UserProfile'
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const UserProfile = () => {

    const { userDetails } = useSelector(store => store.master);
    return (
        <div>
        <div className='live'>
        <div className='img'>
           <img src='/images/info.png'></img>
        </div>
        <div className='det'>
            <h3>NAME : {userDetails.firstName + " " + userDetails.lastName}</h3>
            <h3>USERNAME : {userDetails.username}</h3>
            <h3>EMAIL : {userDetails.email}</h3>
            <h3>ADDRESS : {userDetails.address}</h3>
            <h3>MOBILE NUMBER : {userDetails.mobile}</h3>
            <h3>DATE OF BIRTH : {userDetails.dob}</h3>
            <h3>GENDER : {userDetails.gender}</h3>
            <h3>LOCATION : {userDetails.location}</h3>
        </div>
        </div>
        </div>
    );
}

export default UserProfile