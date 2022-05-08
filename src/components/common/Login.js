import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validations } from '../../utils/validations';
import UserContext from '../../context/UserContext';
import { LOCAL_STORAGE_KEY } from '../../utils/constants';
import { USER } from '../../utils/constants';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const info = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    if (password === USER.password && email === USER.email) {
      info.setUser(USER);
      info.setIsLoggedIn(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, USER.email);
      navigate(`/hotels`);
    } else {
      toast.error('wrong credential');
    }
  };

  const handleErrors = ({ target }) => {
    let { name, value } = target;
    let errorsClone = { ...errors };
    validations(errorsClone, name, value);
    setErrors(errorsClone);
  };

  return (
    <main className=" pt-20">
      <section className="py-20">
        <form
          onSubmit={handleSubmit}
          className="w-1/3 mx-auto border bg-white  p-6 rounded-md shadow-md"
        >
          <div className="text-center">
            <legend className="text-2xl font-bold">Sign In</legend>
            <Link to="/register">
              <span className="text-gray-700 text-lg text-center">
                {' '}
                New here?{' '}
              </span>
            </Link>
          </div>
          <fieldset className="my-3">
            <TextField
              fullWidth
              label="Enter Email"
              value={email}
              name="email"
              error={errors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleErrors(e);
              }}
            />
            <span className="text-red-500 text-sm">{errors.email}</span>
          </fieldset>
          <fieldset className="my-3">
            <TextField
              fullWidth
              label="Enter PassWord"
              value={password}
              name="password"
              error={errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleErrors(e);
              }}
            />
            <span className="text-red-500 text-sm">{errors.password}</span>
          </fieldset>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              variant="contained"
              disabled={errors.password || errors.email}
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
