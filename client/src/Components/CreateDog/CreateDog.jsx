import React from 'react';
import { useDispatch } from 'react-redux';


export default function CreateDog(props) {

    const dispatch = useDispatch();

  const [state, setState] = React.useState({
    name:"",
    heigth:"",
    weigth:"",
    life_span:""
  })

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  function handleSubmit(e){
    e.preventDefault();
  }
  console.log(props)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input
          id="name"
          type="text"
          name= "name"
          onChange={(e) =>handleChange(e)}
          value={state.name}
          />
        </div>
        <div>
          <label htmlFor="heigth">heigth</label>
          <textarea
          id="heigth"
          name="heigth"
          value={state.heigth}
          onChange={(e) =>handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="weigth" >weigth</label>
          <input
          id="weigth"
          name="weigth"
          value={state.weigth}
          onChange={(e) =>handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
          id="date"
          name="date"
          value={state.date}
          onChange={(e) =>handleChange(e)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
};