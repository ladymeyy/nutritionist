'use strict';
const _= require('lodash');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const { generateInitPopulation, populationFitness, evolvePopulation } = require('../algTools/geneticAlgorithm');
const planGrader = require('../algTools/mealPlanFitness');

const env = process.env;

const chromosomeSize = parseInt(env.CHROMOSOME_SIZE);
const popSize = parseInt(env.POPULATION_SIZE);
let constraints, products;

function getMealPlans(req,res) {

  const msg = `incoming getMealPlans request`;
  const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.info(msg,{ 'meta': locationMeta, 'request': req.body }); //TODO insert uuid : req.body.uuid

  constraints = req.body.body.constraints; //diatery constraints
  products = req.body.body.products;

  const mealPlans = executeAlgorithm(constraints, products);

  //sort by fitness
 const sortedMealPlans = sortPopulation(mealPlans);

 //filter meal plan - return only name + amount of each product
  const bestPlan = filterMealPlan(sortedMealPlans[0]);
  const secondBestPlan  = filterMealPlan(sortedMealPlans[1]);


 //return the two best meal plans
  res.status(200).json({ bestPlan, secondBestPlan });
}

/*-----------------------------------------------------------------------------------------------*/

function executeAlgorithm(constraints, products) {

  let population = generateInitPopulation(products, chromosomeSize, popSize);

  populationFitness(population, constraints, planGrader.planFitness);

  let generationCntr = 1;
  const generations = parseInt(env.NUMBER_OF_GENERATIONS);
  while(generationCntr <= generations){ //algorithm loop

    population = evolvePopulation(population, products);
    populationFitness(population, constraints, planGrader.planFitness);
    ++generationCntr;
  }

  return population;
}


/**
 * This function is helpful for debugging purposes
 * @param pop
 */
function printPopulation(pop) {
  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

  for(let i=0; i<pop.length; i++){
    console.log(`----------------------------${i}------------------------------------`);

  //  console.log(` ${pop[i].logChromosomeGenes()}  \n`);
    console.log('fitness', pop[i].fitness);
    console.log('------------------------------------------------------------------');
  }

  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
}

function filterMealPlan(mealPlan){

  const filteredPlan = {};
  filteredPlan['fitness'] = mealPlan.fitness;
  filteredPlan['genes'] = [];

  mealPlan.genes.forEach(gene =>{
    let obj = {};
    obj['name'] = gene.name;
    obj['numOfUnits'] = gene.amount.numOfUnits;
    obj['grams'] = gene.amount.grams;
    filteredPlan.genes.push(obj);
  });
  return filteredPlan;
}

function sortPopulation(pop){
  return pop.sort(function (a, b) {
    return a.fitness - b.fitness;
  });
}



module.exports = {
  getMealPlans,
  printPopulation
};
