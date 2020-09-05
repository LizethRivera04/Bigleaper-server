const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const exportFoliosController = require('../controllers/exportFoliosController');
const manageActorsController = require('../controllers/manageActorsController');

//Save a new folio if has a token
//POST/exportFolios
router.post('/',
    verifyToken,
    exportFoliosController.exportFolioCreate
)



//Get all folios if has a token
//GET/exportfolios
router.get('/',
    verifyToken,
    exportFoliosController.exportFolioList
)


//Get an exportfolio if has a token
//GET/exportfolios/id
router.get('/:id',
    verifyToken,
    exportFoliosController.exportfolio

)

router.post('/:id/manageactors',
    verifyToken,
    manageActorsController.manageActorsCreate
)

router.put('/:id/manageactors/',
    verifyToken,
    manageActorsController.manageActorsUpdate
)

router.get('/:id/manageactors/',
    verifyToken,
    manageActorsController.manageActorsFolio
)

module.exports = router;