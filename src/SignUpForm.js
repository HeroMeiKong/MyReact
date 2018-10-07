import React,{Component} from 'react'

export default class SignUpForm extends Component{
  render(){
    return(
      <form className="signUp" onSubmit={this.signUp.bind(this)}>{/*注册*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.state.formData.username} onChange={this.changeFormData.bind(this,'username')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.state.formData.password} onChange={this.changeFormData.bind(this,'password')} />
        </div>
        <div className="row">
          <label>邮箱</label>
          <input type="text" value={this.state.formData.email} onChange={this.changeFormData.bind(this,'email')} />
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
    )
  }
}