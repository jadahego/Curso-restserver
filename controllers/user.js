const { request } = require('express');
const bcrypsjs = require ('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

   // const {q, nombre} = req.query;
   const {limite = 5, desde = 0} = req.query;

   //const usuarios = await Usuario.find({estado: true})
   //.skip(Number(desde))
   //.limit(Number(limite));

   //const total = await Usuario.countDocuments({estado: true});

   const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({estado: true}),
    Usuario.find({estado: true})
      .skip(Number(desde))
      .limit(Number(limite))
   ])

    res.json({
        total,
        usuarios
    });
  }

  const usuariosPut = async  (req, res = response) => {
    const id = req.params.id;
    const {_id, password, google,correo,  ...resto} = req.body;

    // Todo validar contra base de datos
    if (password){
       //encriptar la contraseña
    const salt = bcrypsjs.genSaltSync();
    resto.password = bcrypsjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
  }

  const usuariosPost = async (req, res = response) => {

   

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

     
    //encriptar la contraseña
    const salt = bcrypsjs.genSaltSync();
    usuario.password = bcrypsjs.hashSync(password, salt);

    //guardar BD
    await usuario.save();

    res.json({
        ok: true,
        msg: 'post api controlador',
        usuario
    });
  }

  const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    // Fisicamente se borra
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        usuario
    });
  }



  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }