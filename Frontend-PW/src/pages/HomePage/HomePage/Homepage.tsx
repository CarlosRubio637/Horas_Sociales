import Body from "../../../components/Body_desing/Body";

const HomePage = () =>{
    return(
        
    <Body>
        <section className="presentation">
                    <div className="presentation-title">
                        <h1>Centro de Servicio Social UCA</h1>
                    </div>
                </section>

                <section className="info-content">
                    <h2>Nuestra Historia</h2>
                    <p>
                        El Centro de Servicio Social (CSS) de la UCA nació en 1973 para vincular a los estudiantes con la realidad del país a través de proyectos comunitarios.
                            1970s-80s: Primeras experiencias en alfabetización, obras físicas y proyectos culturales.
                            1990s: Con los Acuerdos de Paz, se amplió el trabajo en comunidades rurales y organizaciones sociales.
                            2000s: Se fortaleció la dimensión formativa y nació la Feria de la Solidaridad.
                            2010s-2020s: Uso de TIC y redes sociales, creación de programas como Círculos de Estudio y adaptación virtual durante la pandemia.
                        Hoy, el CSS coordina el servicio social estudiantil, fomenta la solidaridad y conecta a los estudiantes con más de 100 instituciones para poner en práctica sus conocimientos al servicio de comunidades y sectores vulnerables.
                    </p>
                </section>

                <section className="info-content-2">
                    <div className="info-content-blue">
                        <div className="blue-grid">
                        <div className="blue-text">
                            <h2>¿Quienes somos?</h2>
                            <p>
                                El Centro de Servicio Social de la UCA promueve la solidaridad y el compromiso social del estudiantado,
                                organizando proyectos comunitarios y alianzas con instituciones para apoyar a sectores vulnerables.
                                Prioridades Es la colaboración no remunerada de estudiantes en proyectos sociales o educativos. 
                                Busca acercarlos a la realidad del país, aplicar sus conocimientos en beneficio de comunidades vulnerables y apoyar las funciones de la UCA.
                            </p>
                        </div>

                            <div className="blue-img">
                                <img src="./servicio_social.jpg" alt="Servicio Social UCA" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="info-content3">
                    <div className="info-content-white">
                        <div className="white-grid">
                            <div className="priority-item">
                                <h3>Misión</h3>
                                <p>
                                    Velar por la realización de un servicio social estudiantil, 
                                    basado en la solidaridad, trabajo en equipo, 
                                    responsabilidad y honradez, 
                                    de preferencia dirigido hacia los sectores más pobres de nuestro país 
                                    con apoyo y participación de la comunidad universitaria.
                                </p>
                            </div>
                            <div className="priority-item">
                                <h3>Visión</h3>
                                <p>
                                    Ser una instancia modelo reconocida en la promoción y acompañamiento 
                                    de un servicio social estudiantil que contribuya en la formación 
                                    de profesionales con sensibilidad social comprometidos con la construcción 
                                    de una sociedad que promueva la dignidad humana.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
    </Body>
    )
}

export default HomePage;