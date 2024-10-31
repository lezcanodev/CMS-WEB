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