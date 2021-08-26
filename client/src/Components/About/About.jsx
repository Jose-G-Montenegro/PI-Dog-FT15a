import React from 'react'

import s from './About.module.css'

function About() {
    return (
        <div className={s.div}>
            <div className={s.all}>
                <div className={s.subTitle1}>Herramientas utilizadas</div>
                <ul className={s.ul1}>
                    <p className={s.p} >CSS</p>
                    <p className={s.p} >REACT.JS</p>
                    <p className={s.p} >REDUX</p>
                    <p className={s.p} >NODE.JS</p>
                    <p className={s.p} >EXPRESS</p>
                    <p className={s.p} >SEQUELIZE</p>
                    <p className={s.p} >POSTGRESS</p>
                </ul>
                <div className={s.subTitle1}>API</div>
                <a href="https://docs.thedogapi.com/" className={s.link} >The Dog Api</a>
                <div className={s.subTitle2}>Contacto</div>
                <ul className={s.links}>
                    <a href="https://www.linkedin.com/in/jos%C3%A9-montenegro94/" className={s.link} >-LinkedIn-</a>
                    <a href="https://github.com/Jocho94" className={s.link} >-GitHub-</a>
                </ul>
            </div>
        </div>
    )
}

export default About
