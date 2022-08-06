import React, {useState} from "react";

const ShowMeData = (props) => {
  
  const [reqData, setReqData ] = useState('');
  const [endpoint, setEndpoint ] = useState('');
  const [dataReturned, setDataReturned] = useState('');

  const changeTextHandler = (e) => {
    setEndpoint(e.target.value)
  }

  const sendRequest = () => {
    console.log('Boop: ', endpoint)

    fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setDataReturned(data)
    });
  }

  return (
    <div className='input-field'>
      <input
        // style={styles.input}
        onChange={changeTextHandler}
        value={endpoint}
        placeholder="Hit Me"
      />
      <button 
        onClick={sendRequest}>
        Send Dat
      </button>
      {dataReturned && Object.keys(dataReturned).map( key => {
        return <p>{key}</p>
      })}
    </div>
    
  )
}

export default ShowMeData;