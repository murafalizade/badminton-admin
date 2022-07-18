import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { Loading } from '../../elements/loading/Loading';
import { useAuth } from '../../../app/hooks/auth';
import { Button, Form } from 'react-bootstrap'
import { IUser } from '../../../interfaces/IUser';
import { BASE_URL } from '../../../constants/constants';
import logo from '../../../assets/logos/adminLogo.svg';
import './Login.scss'


export const Login = () => {

  // Change routering 
  const navigate = useNavigate();

  // State for input values
  const [user, setUser] = useState<IUser>({ username: "", password: "" })

  // State for check loading
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Check auth 
  const { authed, login } = useAuth();

  useEffect(()=>{
    if(authed)
      navigate('/dashboard/news')
  },[authed])

  // Change state value when input change
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Post all data and login
  const onSubmitData = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, user);
      console.log(res.data)
      login(res.data.token);
      navigate('/dashboard/news')
    }

    catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Xəta',
        text: 'Istifadəçi adı və ya şifrə səhvdir!'
      })
    }
  }

  return (
    <div className='login-container'>
      {isLoading ? <Loading /> : null}
      <div className='login-body'>
        <img src={logo} alt="badminton-logo" />
        <Form className='login-form'>
          <Form.Label> EMAIL
            <Form.Control
              value={user.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
              name="username"
              placeholder='Email' />
          </Form.Label>
          <Form.Label> ŞIFRƏ
            <Form.Control
              value={user.password}
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
              placeholder='Şifrə' type='password' />
          </Form.Label>
          <Form.Label>
            <Button type='submit' onClick={(e: any) => onSubmitData(e)}>Daxil ol</Button>
          </Form.Label>
        </Form>
      </div>
    </div>
  )
}
