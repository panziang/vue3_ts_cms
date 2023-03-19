import { setupWorker } from 'msw'
import { loginHandlers } from './login/login'
import { analysisHandlers } from './main/analysis/analysis'
import { systemHandlers } from './main/system/system'

const handlers = [...loginHandlers, ...analysisHandlers, ...systemHandlers]

export const mocker = setupWorker(...handlers)
