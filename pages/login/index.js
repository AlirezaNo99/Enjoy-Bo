import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Routes } from '../../api/api';
import axios from 'axios';
// import BouncingBalls from 'react-cssfx-loading/lib/BouncingBalls';

function Login(props) {
  //   useEffect(() => {
  //     document.querySelector("body").classList.add("loaded");
  //     localStorage.removeItem("token")
  //     localStorage.removeItem("refreshToken")
  //   }, []);

  function signUp(e) {
    e.preventDefault();
    props.history.push(`/`);
  }

  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [Loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const Loginer = () => {
    setLoading(true);
    axios
      .post(Routes.Login, {
        userName: UserName,
        password: Password,
        rememberMe: remember
      })
      .then((res) => {
        if (res.data.responseCode === 200) {
          localStorage.setItem('token', res.data.value.response.token);
          var firstName = res.data.value.response.firstName;
          var lastName = res.data.value.response.lastName;
          localStorage.setItem('fullName', firstName + ' ' + lastName);
          localStorage.setItem('userName', res.data.value.response.userName);
          localStorage.setItem(
            'refreshToken',
            res.data.value.response.refreshToken
          );
          props.history.push(`/`);
          window.location.reload();
        } else if (res.data.responseCode === 500) {
          setError(res.data.message);
        } else {
          setError('نام کاربری یا رمز عبور اشتباه است');
        }
        setLoading(false);
      })
      .catch((err) => {});
  };
  //===============================================================
  useEffect(() => {
    var input = document.getElementById('pass');
    if (input) {
      input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          document.getElementById('signIn').click();
        }
      });
    }
  }, []);

  var md5 = require('md5');
  var str = md5(Password);
  var res = str.toUpperCase();
  return (
    <section
      className="body-sign min-height-100vh"
      style={{ backgroundImage: "url('/images/login-back.jpg')" }}
    >
      <div className="container col-12" style={{ marginTop: '10%' }}>
        <div className="center-sign">
          <Card
            className="card-sign"
            style={{ maxWidth: '500px', margin: 'auto' }}
          >
            <Card.Body style={{ direction: 'rtl', textAlign: 'right' }}>
              <div style={{ textAlign: 'center', margin: '10px 0px' }}>
                {/* <img
                  style={{ width: '200px', height: 'auto' }}
                  src={`/assets/images/Logo.png`}
                /> */}
              </div>
              <h4 className="text-center font-size-20">پنل مدیریت محتوا</h4>
              <Form onSubmit={signUp}>
                <Form.Group className="form-custom-group mb-3">
                  <Form.Label>نام کاربری</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setError('');
                    }}
                    type="text"
                    required
                  />
                </Form.Group>

                {/* <Form.Group className="form-custom-group mb-3">
                <Form.Label>E-mail Address</Form.Label>
                <Form.Control type="email" required />
              </Form.Group> */}

                <Form.Group className="form-custom-group mb-3">
                  <Form.Label>رمز عبور</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    type="password"
                    required
                    id="pass"
                  />
                </Form.Group>
                <Form.Group className="form-custom-group mb-3">
                  <input
                    onChange={(e) => setRemember(e.target.checked)}
                    type="checkbox"
                    style={{ margin: ' 0 5px' }}
                  />
                  <Form.Label>مرا به خاطر بسپار</Form.Label>
                </Form.Group>
                {error ? (
                  <div style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                  </div>
                ) : null}

                <Button
                  onClick={() => Loginer()}
                  // type="submit"
                  style={{
                    width: '100%',
                    height: '50px',
                    fontFamily: 'DIROOZ-FD',
                    textAlign: '-webkit-center',
                    backgroundColor: '#003566'
                  }}
                  id="signIn"
                  disabled={!UserName || !Password || Loading === true}
                >
                  {Loading === true
                    ? //   <BouncingBalls style={{ width: '15%' }} color="white" />
                      '...'
                    : 'ورود'}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>

          {/* <p className="text-center text-muted my-3">
          &copy; Copyright 2021. All Rights Reserved.
        </p> */}
        </div>
      </div>
    </section>
  );
}

export default Login;
