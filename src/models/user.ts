export interface Profile {
  id: number
  name: string
  phone: string
  email: string
  gender: 1 | 2 | 3 | 4 // 민증 뒷자리 첫자
}

export interface SignUpParams {
  id: string
  pw: string
  repassword: string
  phone: string
  name: string
  gender: 1 | 2
  birth: string
  profile: string
  nickname: string
  language: string
  email: string | null
  os: 'IOS' | null
}
