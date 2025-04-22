// This file is used to re-export Vuex functions with proper TypeScript support
import Vuex from 'vuex'

export const createStore = Vuex.createStore
export const useStore = Vuex.useStore
export const Store = Vuex.Store
export const storeToRefs = Vuex.storeToRefs 