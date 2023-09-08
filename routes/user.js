
const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/user');


//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, tieneRole} = require('../middlewares')

const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');





const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPut);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y mas de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es valido').isEmail(),
        //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('correo').custom( emailExiste ),
        check('rol').custom( esRoleValido ),
        validarCampos,
], usuariosPost);

router.delete('/:id',[
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);

  

module.exports = router;


