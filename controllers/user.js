const { request } = require('express');


const usuariosGet = (req = request, res = response) => {
    const {q, nombre} = req.query;

    res.json({
        ok: true,
        msg: 'get api controlador',
        q,
        nombre
    });
  }

  const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put api controlador',
        id
    });
  }

  const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        ok: true,
        msg: 'post api controlador',
        nombre,
        edad
    });
  }

  const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete api controlador'
    });
  }



  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }