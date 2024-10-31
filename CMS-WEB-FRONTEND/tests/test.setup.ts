import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { workerFakeApi } from './utils/server.fake'

beforeAll(async () => {
  console.log("Fake Api inicializada")
  workerFakeApi.listen();
})

afterEach(() => {
  cleanup()
  workerFakeApi.resetHandlers();
})

afterAll(async () => {
  console.log("Fake Api Finalizada")
  workerFakeApi.close();
})



// Configuración para evitar el problema "Fix for "matchMedia not present, legacy browsers require a polyfill jest" error " 
// causado por el package react-slick
import "regenerator-runtime/runtime";
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
};