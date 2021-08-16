
import React, { useState } from "react";
import { getTemperament } from "../../actions/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import s from "./CreateDog.module.css"

function CreateDog() {


  const DefImg = 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    numero: /^\d{1,2}$/, // no usada
    url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
  };

  //////////////////////////////////////// HOOKS ////////////////////////////////////////////////

  const [name, setName] = useState({ value: "", valid: null }); //Nombre
  const [minH, setMinH] = useState({ value: "0", valid: null }); //Altura Minima
  const [maxH, setMaxH] = useState({ value: "", valid: null }); //Altura MAxima
  const [minW, setMinW] = useState({ value: "0", valid: null }); //Peso Minimo
  const [maxW, setMaxW] = useState({ value: "", valid: null }); //Peso Maximo
  const [minAge, setMinAge] = useState({ value: "0", valid: "true" }); //Edad
  const [maxAge, setMaxAge] = useState({ value: "", valid: "true" }); //Edad
  const [image, setImage] = useState({ value: "", valid: null }); //Edad
  const [selectedTemps, setSelectedTemps] = useState([]);
  const [error, setError] = useState({
    name: undefined,
    url: undefined
  }); // Error
  const { push } = useHistory(); //Hook Para Redireccionar
  const temps = useSelector((state) => state.temperament); //Temperamentos Disponibles en el Back
  const dispatch = useDispatch(); //Hook Dispatch

  useEffect(() => {
    dispatch(getTemperament()); //CDM Component Did Mount
    // return () => dispatch(clear) //CWU Component Will UnMount
  }, [dispatch]); //CDU Component Did Update

  //////////////////////////////////////// HANDLERS ////////////////////////////////////////////////

  /////////////////////////////////////// HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    let imgvalue;
    if (image.valid === null) { imgvalue = DefImg } else { imgvalue = image.value }
    if (name.valid === "true") {
      let temps = selectedTemps.map((t) => t.id);
      let dogi = {
        name: `${name.value}`,
        height: `${minH.value} - ${maxH.value}`,
        weight: `${minW.value} - ${maxW.value}`,
        age: `${minAge.value} - ${maxAge.value} years`, //seteando valores de perrito
        image: imgvalue,
        temperaments: temps,
      };

      axios.post("/dog", dogi) // Sumbit del perrito
        .then((response) => {
          setTimeout(function () {
            alert("dog has been succesfully Created")
          }, 1000);
          setTimeout(function () {
            push("dogs/" + response.data.id);
          }, 2000)
        });
    } else {
      alert("some value is not valid");
    }
  };
  /////////////////////////////////////// HANDLE CHANGE
  const handleChange = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "name":
        setName({ ...name, value: e.target.value });
        break;
      case "minH":
        setMinH({ ...minH, value: e.target.value });
        break;
      case "maxH":
        setMaxH({ ...maxH, value: e.target.value });
        break; //handles dogs changes
      case "minW":
        setMinW({ ...minW, value: e.target.value });
        break;
      case "maxW":
        setMaxW({ ...maxW, value: e.target.value });
        break;
      case "minAge":
        setMinAge({ ...minAge, value: e.target.value });
        break;
      case "maxAge":
        setMaxAge({ ...maxAge, value: e.target.value });
        break;
      case "image":
        setImage({ ...image, value: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSelect = (e) => {
    //handles temperaments changes
    e.preventDefault();
    let temp = e.target.value.split(",");
    var i = selectedTemps.length;
    var flag = false;
    while (i--) {
      if (selectedTemps[i].name === temp[0]) return (flag = true);
    }
    if (flag) return;
    var pack = { id: temp[1], name: temp[0] };
    return setSelectedTemps([...selectedTemps, pack]);
  };

  const onClose = (e) => {
    e.preventDefault();
    let newTemps = selectedTemps.filter((t) => t.id !== e.target.value);
    setSelectedTemps(newTemps);
  };

  const validate = (e) => {
    if (expresiones.nombre.test(e.target.value)) {
      setName({ ...name, valid: "true" });
      setError({ ...error, name: null });
    } else setError({ ...error, name: "Name is not valid" });

  };

  const validateUrl = (e) => {
    if (expresiones.url.test(e.target.value)) {
      setImage({ ...image, valid: "true" });
      setError({ ...error, url: null })
    }
    else setError({ ...error, url: "url is not valid" })
  }

  const handleCreate = (e) => {
    e.preventDefault();
  };
  //////////////////////////////////////// HANDLERS ////////////////////////////////////////////////

  ///////////////////////////////////////////////// DA Form
  return (
    <div className={s.container}>
      <div>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={s.inputName}>
            <div className={s.name}>
              {error.name ? <p className={s.span}>{error.name}</p> : <label>Name dog</label>}</div>
            <input
              type="text"
              name="name"
              placeholder="name..."
              onBlur={validate}
              onKeyUp={validate}
              onChange={handleChange}
              value={name.value}
              className={error.name ? s.error : s.input}
            ></input>
          </div>
          <div className={s.inputName}>
            <label>Height </label>
            <input
              type="number"
              placeholder="Min H"
              name="minH"
              min="0"
              max={maxH.value}
              step="1"
              onChange={handleChange}
              className={s.input2}
            ></input>
            <label> - </label>
            <input
              type="number"
              name="maxH"
              placeholder="Max H"
              min={minH.value}
              max="103"
              step="1"
              onChange={handleChange}
              className={s.input2}
            ></input> cm
          </div>
          <div className={s.inputName}>
            <label>Weight</label>
            <input
              type="number"
              placeholder="Min W"
              name="minW"
              min="0"
              max={maxW.value}
              step="0.5"
              onChange={handleChange}
              className={s.input2}
            ></input>
            <label> - </label>
            <input
              type="number"
              name="maxW"
              placeholder="Max W"
              min={minW.value}
              max="220"
              step="0.5"
              onChange={handleChange}
              className={s.input2}
            ></input> Kg
          </div>
          <div className={s.inputName}>
            <label>Age</label>
            <input
              type="number"
              placeholder="Min A"
              name="minAge"
              min="0"
              max={maxAge.value}
              step="1"
              onChange={handleChange}
              className={s.input2}
            ></input>
            <label> - </label>
            <input
              type="number"
              name="maxAge"
              placeholder="Max A"
              min={minAge.value}
              max="29"
              step="1"
              onChange={handleChange}
              className={s.input2}
            ></input> years
          </div>
          {/* <div className={s.inputName}>
            <div className={s.name}>
              {error.url ? <p className={s.span}>{error.url}</p> : <label>Image url</label>}</div>
            <input
              type="text"
              name="image"
              value={image.value}
              onChange={handleChange}
              onBlur={validateUrl}
              onKeyUp={validateUrl}
              className={error.url ? s.error : s.input}
            ></input>
          </div> */}
          {selectedTemps.length < 10 ? <select className={s.select} onChange={handleSelect}>
            <option value disabled>
              select temperaments
            </option>
            {temps &&
              temps.map((t) => {
                return <option value={[t.name, t.id]}>{t.name}</option>;
              })}
          </select> : null}
          <div className={s.tempC}>
            {selectedTemps ? (
              selectedTemps.map((t) => {
                return (
                  <button className={s.temp} onClick={onClose} key={t.name} value={t.id}>
                    {t.name}
                  </button>)
              })) : null}
          </div>
          <button className={s.btnS} type="submit" onSubmit={handleCreate}>
            Create Doggo!
          </button>
        </form>
      </div>
      <div className={s.btnC}>
        <Link className={s.btn} to="/home">Cancel</Link>
      </div>

    </div>

  );
}

export default CreateDog;