'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = clearProperty(newState);
        break;

      case 'addProperties':
        newState = addProperties(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = removeProperties(newState, action.keysToRemove);
        break;
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

function clearProperty(state) {
  for (const key in state) {
    delete state[key];
  }

  return state;
}

function addProperties(currentState, extraData) {
  return Object.assign(currentState, extraData);
}

function removeProperties(currentState, keysToRemove) {
  for (const key of keysToRemove) {
    delete currentState[key];
  }

  return currentState;
}

module.exports = transformStateWithClones;
