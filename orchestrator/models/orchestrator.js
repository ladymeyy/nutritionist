'use strict';
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const uuid4 = require('uuid/v4');
const _ = require('lodash');
const { sendHttpRequest } = require('../utils/httpRequestHandler');
const env = process.env;

class Orchestrator {
  constructor(constrains, products) {
    this.productsFromClient = products;
    this.constraints = {
      maxCalories: constrains.maxCal,
      macroMolecules:
        {
          carbs: constrains.carbs,
          proteins: constrains.proteins,
          fats: constrains.fats
        }
    };
    this.meta = {
      service: 'userData',
      uuid: uuid4()
    };
  }


  /**
   * Execute service
   * @return {Promise<void>}
   */
  async execute() {

    const reqToDbGw = {
      meta: this.meta,
      body: { products: _.map(this.productsFromClient, 'name') }
    };


    const dbGwResponse = await Orchestrator.sendToDbGw(reqToDbGw);

    const productsFromDB =  dbGwResponse.body.results;


    console.log(' ------------------- productsWithNuts ---------------------------', dbGwResponse.body.results);

    const reqToPlanner = this.buildPlannerRequest(productsFromDB);


    console.log('-------------------  reqToPlanner --------------', reqToPlanner);

    const plannerResponse =  await Orchestrator.sendToPlanner(reqToPlanner);


    console.log('-------------------  plannerResponse --------------', plannerResponse.body);
    return plannerResponse.body;
  }

  /**
   * Send request to dbGateway
   * @return {Promise<void>}
   */
  static async sendToDbGw(products){

    const url = `${env.DB_GW_PROTOCOL}://${env.DB_GW_HOST}:${env.DB_GW_PORT}${env.DB_GW_URI}`;

    const opt = { url, data: products };

    try {
      return await sendHttpRequest('post', opt);
    }catch (err) {
      return err;
    }
  }
}
module.exports = Orchestrator;