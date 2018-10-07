import AV from 'leancloud-storage'

var APP_ID = 'ATwdiNu4opHiuaLvHh4RX6Sy-gzGzoHsz';
var APP_KEY = 'n224PeuEeiaquD6PJi6bhpme';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,successFn,errorFn){
  var user= new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function (loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  }, function(error){
    errorFn.call(null,error)
  })
  return undefined
}

export function getCurrentUser(){
  let user = AV.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}
function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}