import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, sendDogs } from "../../actions/actions";

import s from './CreateDog.module.css'

export default function Send() {

  const [dogCreate, setDogCreate] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });

  const dispatch = useDispatch();
  const temp = useSelector((state) => state.temperament);
  console.log(temp)

  function HandleChange(e) {
    setDogCreate({
      ...dogCreate,
      [e.target.name]: e.target.value
    });
  };

  function HandleTemps(e) {
    if (!dogCreate.temperaments?.includes(e.target.value)) {
      setDogCreate({
        ...dogCreate,
        [e.target.name]: [...dogCreate.temperaments, e.target.value]
      });
    }
  };

  function onClose(e) {
    e.preventDefault()
    let newTemps = dogCreate.temperaments.filter((t) => t !== e.target.value);
    setDogCreate({
      ...dogCreate,
      temperaments: newTemps
    });
  }

  function HandleSubmit(e) {
    e.preventDefault();
    dispatch(sendDogs(dogCreate));
    alert("create you dog")
  };

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  return (
    <div className={s.all}>
      <form onSubmit={e => HandleSubmit(e)}>
        <div>
          <div className={s.text}>
            <div>
              Name
            </div>
            <input
              type="text"
              name="name"
              value={dogCreate.name}
              onChange={(e) => HandleChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={s.text}>
            <div>
              Height
            </div>
            <input
              type="text"
              name="height"
              value={dogCreate.height}
              onChange={(e) => HandleChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={s.text}>
            <div>
              Weight
            </div>
            <input
              type="text"
              name="weight"
              value={dogCreate.weight}
              onChange={(e) => HandleChange(e)}
            />
          </div >
        </div>
        <div>
          <div className={s.text}>
            <div>
              Life span
            </div>
            <input
              type="text"
              name="life_span"
              value={dogCreate.life_span}
              onChange={(e) => HandleChange(e)}
            />
          </div>
        </div>
        <div>
          <div className={s.divTem} >
            Temperament/s
          </div>
          <select className={s.temp} name="temperaments" onChange={(e) => HandleTemps(e)}>
            {temp &&
              temp.map((e) => {
                return <option key={e.id} value={e.temperament}>{e.temperament}</option>;
              })}
          </select>
          <div className={s.view}>
            {dogCreate.temperaments && dogCreate.temperaments.map((el, id) => <button onClick={(e) => { onClose(e) }} value={el} className={s.h} key={id}>{el}</button>)}
          </div>
        </div>
        <button className={s.create} type="submit">Create</button>
      </form>
    </div>
  );
};