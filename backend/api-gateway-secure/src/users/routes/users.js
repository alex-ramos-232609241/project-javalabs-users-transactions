    const express = require('express');
    const router = express.Router()

    const {
        listUsers,
        saveUsers,
    } = require('../controllers');
    const CustomException = require('../../commons/supports/custom.exception');
    const handleController = async (controllerFn, req, res) => {
        try {
            const result = await controllerFn(req);
            if (result instanceof CustomException) {
                console.error(result.message);
                return res.status(result.status || 500).json({
                    success: false,
                    message: result.message,
                    details: result.details || null,
                });
            }
    
            if (result === null) {
                return res.status(204).json({ success: true });
            }
    
            if (result.status === 201) {
                return res.status(result.status).json({ success: true, data: result });
            }
    
            return res.status(200).json({ success: true, data: result });
            
        } catch (err) {
            return res.status(500).json({ success: false, message: "Unexpected Server Error" });
        }
    };

    router.get('/', (req, res) => handleController(listUsers, req, res));
    router.post('/', (req, res) => handleController(saveUsers, req, res));
    

    module.exports = router;

