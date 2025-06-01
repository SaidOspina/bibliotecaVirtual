const express = require('express');
const pool = require('../db');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/login', async (req, res) => {
  res.render('login');
});

router.post('/login', async (req,res) =>{

 
  const busqueda = await pool.query('SELECT * FROM usuario WHERE identificacion  = ?', [req.body.cedula])
  
  if (busqueda.length!==0) {
    console.log(busqueda)
    // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
    if (bcrypt.compareSync(req.body.password, busqueda[0].contrasena)) {
      
      req.flash('success', 'Bienvenido usuario: ' +  busqueda[0].cedula)
      if (busqueda[0].tipo_usuario === "administrador") {
        res.redirect('/dashboardAlumno');
      } else if (busqueda[0].tipo_usuario === "gerente") {
        res.redirect('/dashboardBibliotecario');
      } else if (busqueda[0].tipo_usuario === "vendedor") {
        res.redirect('/dashboardAlumno');
      } else if (busqueda[0].tipo_usuario === "cajero") {
        res.redirect('/dashboardProfesor');
      } else if (busqueda[0].tipo_usuario === "auxiliar") {
        res.redirect('/dashboardProfesor');
      } else if (busqueda[0].tipo_usuario === "cliente") {
        res.redirect('/dashboardProfesor');
      }
    } else {
      
      req.flash('error', 'La contraseña es incorrecta, ¿olvidaste tu contraseña?')
      res.redirect('/login');
    }
  } else {
    
      req.flash('error', 'No se encontro ningun usuario con el correo electronico')
      res.redirect('/login');
  }
  }) 
  module.exports = router;
