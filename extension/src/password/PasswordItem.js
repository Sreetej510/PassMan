import React from 'react';

function PasswordItem(props) {

  const showPasswordDetails = (e) => {
    // TODO redirect to a page which will show the details of the passwords saved on the website
    console.log('redirect to details page : ' + props.url)
  }

  const itemPContent = () => {
    const usernames = props.usernames
    const accountCount = usernames.length;
    const filterText = props.filterText;
    const url = props.url

    var site_jsx = (<span>{url}</span>)
    var details_jsx = "";

    if (filterText != '') {

      if (url.includes(filterText)) {
        var start = url.indexOf(filterText)
        var end = filterText.length + start

        site_jsx = (<span>
          {url.substring(0, start)}
          <b>{filterText}</b>
          {url.substring(end)}
        </span>)
      }
      if (usernames.some(usernames => usernames.includes(filterText))) {

        const boldUsername = usernames.find(username =>
          username.includes(filterText)
        );
        var start = boldUsername.indexOf(filterText)
        var end = filterText.length + start
        details_jsx = (<span style={{ color: "#555", fontSize: "13px", maxWidth: "150px", textOverflow: "ellipsis", overflow: "hidden" }}>
          {boldUsername.substring(0, start)}
          <b>{filterText}</b>
          {boldUsername.substring(end)}
        </span>)
      }

      return (<div className='itemP'>
        <img src={props.imgSrc} />
        {site_jsx}
        {details_jsx}
      </div>)
    } else {
      if (accountCount > 1) {
        details_jsx = (<span style={{ color: "#555", fontSize: "13px" }}>{accountCount} accounts</span>)
      }
    }
    return (
      <div className='itemP'>
        <img src={props.imgSrc} />
        {site_jsx}
        {details_jsx}
      </div>
    )
  }

  return (
    <div className='passwordItem' onClick={showPasswordDetails}>
      {itemPContent()}
      <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
        <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#0F0F0F" />
      </svg>
    </div>
  );
}

export default PasswordItem;