
import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/Auth.context'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }


    return (
        <div className="row">
            <div className="col l6 m8 s10 offset-l3 offset-m2 offset-s1">
                <h1>Сократи ссылку</h1>
                <div className="card grey darken-3">
                    <div className="card-content white-text">
                    <span className="card-title">Авторизация</span>
                    <div>

                        <div className="input-field">
                            <input 
                                placeholder="Введите email" 
                                id="email" 
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input 
                                placeholder="Введите пароль" 
                                id="password" 
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Пароль</label>
                        </div>
                        
                    </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn teal lighten-3 black-text"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти 
                        </button>
                        <button 
                            className="btn teal darken-3"
                            onClick={registerHandler}
                            disabled={loading}
                        > 
                            Регистрация 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}