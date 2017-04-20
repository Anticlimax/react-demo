import AV from 'leancloud-storage'

const appId = '404OB1m4hOXOScV8P56mJfEg-gzGzoHsz'
const appKey = 'gxModxAyOwTK2JEoySRvV3iX'
AV.init({ appId, appKey })

export default AV

export function signUp(username, password, successFn, errorFn) {
  const user = new AV.User()

  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then((loginedUser)=>{
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },(error)=>{
    errorFn.call(null,error)
  })

  return undefined
}

function getUserFromAVUser(AVUser) {
  return {
    id:AVUser.id,
    ...AVUser.attributes
  }
}

export function getCurrentUser() {
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

export function signOut() {
  AV.User.logOut()
  return undefined
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username,password).then((loginedUser)=>{
    let user = getUserFromAVUser(loginedUser)
    console.log(1)
    successFn.call(null,user)
  },(error)=>{
    errorFn.call(null,error)
  })

}