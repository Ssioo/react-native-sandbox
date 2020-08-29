import { observable } from 'mobx'

class ModalStore {
  @observable info: boolean = false
}
export const modalStore = new ModalStore()
