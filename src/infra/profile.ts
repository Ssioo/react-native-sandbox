import { Profile } from 'common.ts'

let _profile: Profile | null = null
export const setProfile = (profile: Profile | null) => {
  _profile = profile
}
export const getProfile = () => _profile
