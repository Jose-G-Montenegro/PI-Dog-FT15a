import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, sendDogs } from "../../actions/actions";
import { Link } from "react-router-dom";

export default function Send() {

  const [temps, setTemps] = useState("");
  const [objCreate, setObjCreate] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  })

  const dispatch = useDispatch();
  const temp = useSelector((state) => state.temperament);
  console.log(temp)

  function HandleChange(e) {
    let temporal = {...objCreate}

    temporal[e.target.name]= e.target.value
    setObjCreate(temporal);
  }

  function HandleTemps(e){
    setTemps(e.target.value+ ' '+ temps)
    
    let temporal = {...objCreate}
    temporal["temperaments"]= [...temporal["temperaments"], e.target.value]
    setObjCreate(temporal);
  }

  async function HandleSubmit(e) {
    e.preventDefault();
    dispatch(sendDogs(objCreate));
  }
  
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  return (
    <div>
      <Link to="/Home">Home</Link>
      <form onSubmit={e => HandleSubmit(e)}>
        <div>
          <label>
            Name: 
            <input
              type="text"
              name="name"
              value={objCreate.name}
              onChange={(e) => HandleChange(e)}
            />
          </label>
        </div>
        <div>
          <label>
            Height: 
            <input
              type="text"
              name="height"
              value={objCreate.height}
              onChange={(e) => HandleChange(e)}
            />
          </label>
        </div>
        <div>
          <label>
            Weight: 
            <input
              type="text"
              name="weight"
              value={objCreate.weight}
              onChange={(e) => HandleChange(e)}
            />
          </label>
        </div>
        <div>
          <label>
            Life span: 
            <input
              type="text"
              name="life_span"
              value={objCreate.life_span}
              onChange={(e) => HandleChange(e)}
            />
          </label>
        </div>
        <div>
          <label>
            Temperament: <h6>{temps}</h6>
          </label>
          <select onChange={(e) => HandleTemps(e)}>
            {temp &&
              temp.map((e) => {
                  return <option key={e.id} value={e.temperament}>{e.temperament}</option>;
                })}
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}