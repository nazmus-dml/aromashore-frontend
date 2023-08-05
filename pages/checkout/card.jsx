import React,{useState} from "react";
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import axios from "axios";

export default function App() {

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    //axios.post("(postLink)", {
    //  number: number,
    //  name: name,
    //  expiry: expiry,
    //  cvc: cvc
    //})
  }

  return (
    <div>
       <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
        />
      <form onSubmit={handleSubmit}>

        <input
          type="tel"
          name="number"
          val={number}
          placeholder={"Enter Number"}
          onChange={e => setNumber(e.target.value)}
          onFocus={e=>setFocus(e.target.name)}
        />

        <input
          type="tel"
          name="name"
          val={name}
          placeholder={"Enter Name"}
          onChange={e => setName(e.target.value)}
          onFocus={e=>setFocus(e.target.name)}
        />
        <input
          type="tel"
          name="expiry"
          val={expiry}
          placeholder={"Enter Expiry date"}
          onChange={e => setExpiry(e.target.value)}
          onFocus={e=>setFocus(e.target.name)}
        />
        <input
          type="tel"
          name="cvc"
          val={cvc}
          placeholder={"Enter Cvc"}
          onChange={e => setCvc(e.target.value)}
          onFocus={e=>setFocus(e.target.name)}
        />
        <button type="submit">
          Pay now
        </button>
      </form>
    </div>
  );
}

