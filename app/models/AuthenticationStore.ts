import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
// import axios from "axios"
/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    // isAuthenticated: types.optional(types.boolean, false),
    // name: types.optional(types.string, ""),
    authToken: types.maybe(types.string),
    authUsername: "",
    authTanggalLahir: "",
    authTempatLahir: "",
    authPernikahan: "",
    authNpwp: "",
    authSim: "",
    authAlamat: "",
    authNoHp: "",
    authPenempatanKeterangan: "",
    authKebangsaan: "",
    authAgama: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
  }))
  .actions((store) => ({
    setAuthToken(value: string) {
      store.authToken = value
    },
    setAuthUsername(value: string) {
      store.authUsername = value
    },
    setAuthTanggalLahir(value: string) {
      store.authTanggalLahir = value
    },
    setAuthTempatLahir(value: string) {
      store.authTempatLahir = value
    },
    setAuthKebangsaan(value: string) {
      store.authKebangsaan = value
    },
    setAuthAgama(value: string) {
      store.authAgama = value
    },
    setAuthNpwp(value: string) {
      store.authNpwp = value
    },
    setAuthSim(value: string) {
      store.authSim = value
    },
    setAuthAlamat(value: string) {
      store.authAlamat = value
    },
    setAuthNoHp(value: string) {
      store.authNoHp = value
    },
    setAuthPenempatanKeterangan(value: string) {
      store.authPenempatanKeterangan = value
    },
    setAuthPernikahan(value: string) {
      store.authPernikahan = value
    },
    logout() {
      store.authToken = undefined
      store.authUsername = ""
      store.authTanggalLahir = ""
      store.authTempatLahir = ""
      store.authPernikahan = ""
      store.authNpwp = ""
      store.authSim = ""
      store.authAlamat = ""
      store.authNoHp = ""
      store.authPenempatanKeterangan = ""
      store.authKebangsaan = ""
      store.authAgama = ""
      store.authPernikahan = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotOut
  extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotIn
  extends SnapshotIn<typeof AuthenticationStoreModel> {}
export const createAuthenticationStoreDefaultModel = () =>
  types.optional(AuthenticationStoreModel, {})
