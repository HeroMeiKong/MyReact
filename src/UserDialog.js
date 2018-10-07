import React,{Component} from 'react'
import './UserDialog.css'
import {signUp,signIn,sendPasswordResetEmail} from './LeanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'

export default class UserDialog extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp',
      formData: {
        username: '',
        password: '',
        email: ''
      }
    }
  }
  
  signUp(e){
    e.preventDefault()
    let {username,password,email} = this.state.formData
    if(username === ''){ alert('用户名为空')}
    else if(password === ''){alert('密码不能为空')}
    else{
      let success = (user)=>{
        this.props.onSignUp.call(null,user)
      }
      let error = (error)=>{
        console.log(error)
        switch (error.code) {
          case 202:
            alert('用户名已被占用')
            break;
        
          default:
          alert(error)
            break;
        }
      }
      signUp(username,password,email,success,error)
    }
  }
  signIn(e){
    e.preventDefault()
    let {username,password} = this.state.formData
    if(username === ''){ alert('用户名为空')}
    else if(password === ''){alert('密码不能为空')}
    else{
      let success = (user)=>{
        this.props.onSignIn.call(null,user)
      }
      let error = (error)=>{
        switch (error.code) {
          case 210:
            alert('用户名与密码不匹配')
            break;
          case 201:
            alert('没有提供密码，或者密码为空')
            break;
          case 211:
          console.log(error.code)
            alert('找不到用户')
            break;
          default:
            alert(error)
            break;
        }
      }
      signIn(username,password,success,error)
    }
  }
  changeFormData(key,e){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
  render(){
    return(
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ? 
            <SignInOrSignUp formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)} /> : 
            <ForgotPasswordForm formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)} />}
        </div>
      </div>
    )
  }
  showForgotPassword(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)
  }
}