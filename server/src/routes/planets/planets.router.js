const { Router } = require('express');

const planetsRouter = Router();

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;
