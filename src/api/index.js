import { mockApi } from './mock/mockApi.js'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * The single API entry point for all screens.
 * Swap VITE_USE_MOCK=false + implement realApi to switch to backend.
 */
const api = useMock ? mockApi : mockApi // TODO: replace with realApi when backend is ready

export default api
