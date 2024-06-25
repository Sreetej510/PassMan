import React, { useEffect, useState } from "react";
import DetailsItem from "./DetailsItem";
import { useParams } from 'react-router-dom';
import './Details.css'

function Details() {

    const {id} = useParams();
    const [passwordDetails, setPasswordDetails] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {

        setTitle("example.com")
        setPasswordDetails([{
            "username":"sreetej",
            "password":"12345678",
            "sites":["https://example.com", "https://sub.example.com/signin"]
        }])

    },[id])


    return (<div>
        <h3>{title}</h3>
        {passwordDetails.map(item => 
        <DetailsItem {...item}/>
        )}
    </div>)
}

export default Details;