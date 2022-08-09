import React, {useState} from "react";
import { JSONTree } from 'react-json-tree';
import styles from './ShowMeData.module.css'

const ShowMeData = (props) => {
  const [endpoint, setEndpoint ] = useState('');
  const [dataReturned, setDataReturned] = useState('');
  const [domain, setDomain] = useState('https://api.scryfall.com');

  const changeTextHandler = (e) => {
    setEndpoint(e.target.value)
  }
  const changeDomainHandler = (e) => {
    setDomain(e.target.value)
  }

  const sendRequest = () => {
    fetch(`${domain}${endpoint}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setDataReturned(data)
    });
  }

  return (
    <div className='input-field'>
      <input
        className={styles.input}
        onChange={changeDomainHandler}
        value={domain}
        placeholder="Domain"
      />
      <input
        className={styles.input}
        onChange={changeTextHandler}
        value={endpoint}
        placeholder="Hit Me"
      />
      <button 
        className={styles.button}
        onClick={sendRequest}>
        Send Dat
      </button>
      <JSONTree data={dataReturned}/>
    </div>
    
  )
}

export default ShowMeData;