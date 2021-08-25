import React from 'react';
import { Link } from 'react-router-dom';

import s from './Dog.module.css'

export default function Dog({ name, id, image, temperament }) {
    //console.log(temperament)
    return (
        <div className={s.all}>
            <Link to={`/dog/home/${id}`}>
                <h2 className={s.title}>{name}</h2>
                <img src={image} alt="dog img" className={s.img} />
                <h2 className={s.temp}>{temperament ?
                    typeof temperament[0] === 'object' ?
                        temperament.length > 5 ?
                            temperament.slice(0,5).map(el => ' ' + el.temperament + ' ') :
                            temperament.map(el => ' ' + el.temperament + ' ') :
                        temperament.length > 5 ?
                            temperament.slice(0,5).map(el => ' ' + el + ' ')  :
                            temperament.map(el => ' ' + el + ' ') :
                    'without temperaments'} </h2>
            </Link>
        </div>
    )
}
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//     root: {
//         maxWidth: 345,
//     },
// });

// export default function Dog({ name, id, image, temperament }) {
//     const classes = useStyles();

//     return (
//         <Card className={classes.root}>
//             {console.log({name,temperament})}
//             <CardActionArea>
//                 <CardMedia
//                     component="img"
//                     alt="Contemplative Reptile"
//                     height="140"
//                     image={image}
//                     title="Contemplative Reptile"
//                 />
//                 <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                         {name}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" component="p">
//                         {temperament ?
//                             typeof temperament[0] === 'object' ?
//                                 temperament.map(el => ' ' + el.temperament + ' ') :
//                                 temperament.map(el => ' ' + el + ' ') :
//                             'without temperaments'}
//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
//             <CardActions>
//                 <Button size="small" color="primary">
//                     Agregar a favorito
//                 </Button>
//                 <Link to={`/dog/home/${id}`}>
//                     <Button size="small" color="primary">
//                         Learn More
//                     </Button>
//                 </Link>
//             </CardActions>
//         </Card>
//     );
// }
