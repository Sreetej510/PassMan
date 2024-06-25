import React from "react";
import InputBar from "../utils/InputBar";

function DetailsItem(props) {
    const sites = props.sites

    return (<div className="detailsItem">
        <div className="sitesList">
            <span>Site</span>
            {sites &&
                Object.fromEntries(sites).map(([sName,url]) => <a href={url} key={url} target="blank">{sName}</a>)
            }
        </div>

        <InputBar type='text' label="Username" value={props.username} disabled={true} copy={true}/>
        <InputBar type='password' label="Password" value={props.password} disabled={true} copy={true} passwdShow={true}/>

        <div className="buttons">
            <button type="button">Edit</button>
            <button type="button">Delete</button>
        </div>
    </div>)
}

export default DetailsItem;