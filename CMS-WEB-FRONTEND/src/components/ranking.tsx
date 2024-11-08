import React from 'react';
import Slider from "react-slick";
import {  Typography } from '@mui/material';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface Items {
    titulo: string,
    libros: LibroListarData[]
}

export default function Ranking({ titulo, libros }: Items) {
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      Infinity:true,
      autoplaySpeed: 1000,
      width:200,
      responsive: [
      {
        breakpoint: 900, // Para pantallas más pequeñas
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
    return (
      <div className="content" style={{padding: '30px',marginLeft:'60px'}}>
        <Typography variant={'h5'} fontWeight={'bold'} style={{opacity: .5, marginBottom: '25px'}} >{titulo}</Typography>
        <div className="container" style={{maxWidth: '800px', margin: '10 auto'}}>
          <Slider {...settings}>
            {libros.map((item) => (
              <div key={item.id}>
                <div className="img-body">
                <img src='https://i0.wp.com/www.pol.una.py/wp-content/uploads/llamado-a-concurso.jpg?resize=768%2C768&ssl=1' style={{width: '60%', height: '20vh', overflow: 'clip',borderRadius: '10px',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', transition: 'box-shadow 0.3s ease' /* Suaviza el cambio de sombra */}} />
                </div>
                <div>
                  <h3>{item.titulo}</h3>
                  <p>{item.autorNombre}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
    </div>
    );

}

//<img src='https://i0.wp.com/www.pol.una.py/wp-content/uploads/llamado-a-concurso.jpg?resize=768%2C768&ssl=1' style={{width: '10%', height: '20vh', overflow: 'clip',borderRadius: '10px'}}/>
