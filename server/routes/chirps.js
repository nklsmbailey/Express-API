const express = require('express');
const chirpsStore = require('../chirpstore')
let router = express.Router();



router.get('/:id?', (req, res) => {     
    let id = req.params.id;             
    if (id) {                                                    
        res.json(chirpsStore.GetChirp(id));      
    } else {
        res.send(chirpsStore.GetChirps());       
    }
});

router.post('/', (req, res) => {            
    chirpsStore.CreateChirp(req.body);      
    res.sendStatus(200);                    
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.UpdateChirp(id, req.body);      
    res.sendStatus(200);
})

router.delete('/:id', (req, res) => { 
    let id = req.params.id;
    chirpsStore.DeleteChirp(id); 
    res.sendStatus(200);
})

module.exports = router;