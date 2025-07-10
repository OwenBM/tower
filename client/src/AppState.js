/* eslint-disable no-unused-vars */
import { reactive } from 'vue'
import { TowerEvent } from './models/TowerEvent.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent}*/
  towerEvent: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]}*/
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent}*/
  TowerEventPage: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent}*/
  newTowerEventData: null,
})

