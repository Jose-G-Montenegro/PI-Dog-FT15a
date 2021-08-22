import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, sendDogs } from "../../actions/actions";

// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// }));

// export default function NewForm() {

//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//     console.log(errors);

//     const classes = useStyles();

//     return (
//         <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
//             <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//             <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//             <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//             <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//         </form>
//     );
// }

// import React from 'react';


export default function NewForm() {

    const dispatch = useDispatch();
    const temp = useSelector((state) => state.temperament);

    useEffect(() => {
        dispatch(getTemperament());
      }, [dispatch]); 
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(handleSubmit)
    const onSubmit = data =>  console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <input type="text" placeholder="Name" {...register("Name", { required: true, maxLength: 25, pattern: /[A-Za-z ]/i })} />
            <input type="number" placeholder="Height" {...register("Height", { required: true, max: 150, min: 15, maxLength: 5 })} />
            <input type="number" placeholder="Weight" {...register("Weight", { required: true, max: 150, min: 5, maxLength: 5 })} />
            <input type="number" placeholder="Life Span" {...register("Life Span", { required: true, max: 30, min: 5, maxLength: 2 })} />
            <select {...register}>
            {temp &&
              temp.map((e) => {
                return <option key={e.id} value={e.temperament}>{e.temperament}</option>;
              })}
            </select>

            <input type="submit" />
        </form>
    );
}
