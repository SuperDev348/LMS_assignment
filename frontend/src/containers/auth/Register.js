import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

import Header from '../../components/NavTwoStudent'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import { Styles } from './styles/account.js'
import {useAsync} from '../../service/utils'
import {isEmail} from '../../service/string'
import { signup } from '../../api/auth'
import {getAll as getCompanies, create as createCompany} from '../../api/company'

const useStyles = makeStyles((theme) => ({
  formSelect: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: 6,
    borderColor: "#dddddd",
    outline: "none",
    cursor: 'pointer'
  },
  formOption: {
    fontSize: 15,
  }
}));
function Register() {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('student')
  const [password, setPassword] = useState('')
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState(-1)
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (username === '')
      res = false
    else if (email === '' || !isEmail(email))
      res = false
    else if (password === '')
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSignUp = async () => {
    if (!validate())
      return
    let companyId = company
    if (role === 'company') {
      const res = await createCompany({
        name: username,
        firstName: username,
        lastName: username,
        email: email,
      })
      companyId = res.id
    }
    run(signup({
      name: username,
      email: email,
      password: password,
      avatar: "",
      role: role,
      helpline: 10,
      companyID: companyId,
      activate: true,
      confirm: false,
    }));
    setAsyncState('signup')
  }

  useEffect(() => {
    run(getCompanies())
    setAsyncState('getCompanies')
  }, [])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getCompanies') {
        setCompanies(data)
        if (data.length === 0) {
          setRole('company')
        }
        else {
          setCompany(data[0]._id)
        }
      }
      else if (asyncState === 'signup') {
        history.push('/login')
      }
    }
    else if (status === 'rejected') {
      NotificationManager.warning(error?.message, 'Worning', 3000);
      console.log(error)
    }
  }, [status])

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <Header />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Registration" />

        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="registration-box">
                  <div className="registration-title text-center">
                    <h3>Registration</h3>
                  </div>
                  <div id="form_registration" className="form">
                    <p className="form-control">
                      <label htmlFor="role">Role</label>
                      <select className={classes.formSelect} id="role" onChange={(event) => setRole(event.target.value)}>
                        {companies.length !== 0 &&
                        <>
                          <option className={classes.formOption} value="student" selected={role==='student'}>
                            Student
                          </option>
                          <option className={classes.formOption} value="owner" selected={role==='owner'}>
                            Teacher
                          </option>
                        </>
                        }
                          <option className={classes.formOption} value="company" selected={role==='company'}>
                            Company
                          </option>
                      </select>
                    </p>
                    {companies.length !== 0 && (role === 'student' || role === 'owner') &&
                      <p className="form-control">
                        <label htmlFor="company">Company</label>
                        <select className={classes.formSelect} id="company" onChange={(event) => setCompany(event.target.value)}>
                          {companies.map((item, index) => (
                            <option className={classes.formOption} value={item._id} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </p>
                    }
                    <p className="form-control">
                      <label htmlFor="registration_email">Email Address</label>
                      <input
                        type="email"
                        placeholder="Email address"
                        id="registration_email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="registration_input-msg"></span>
                    </p>
                    <p className="form-control">
                      <label htmlFor="registration_user">User Name</label>
                      <input
                        type="text"
                        placeholder="Username"
                        id="registration_user"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <span className="registration_input-msg"></span>
                    </p>
                    <p className="form-control">
                      <label htmlFor="registration_password">Password</label>
                      <input
                        type="password"
                        placeholder="*******"
                        id="registration_password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="registration_input-msg"></span>
                    </p>
                    <button onClick={handleSignUp}>Register Now</button>
                  </div>
                  <div className="have_account-btn text-center">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login">Login Here</Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
}

export default Register