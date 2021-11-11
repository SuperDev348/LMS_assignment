import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import {NotificationManager} from 'react-notifications'

import Header from '../../components/NavTwoStudent'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import { Styles } from './styles/account.js'
import {setCookie} from '../../service/cookie'
import {useSetting} from '../../provider/setting'
import { useAsync } from '../../service/utils'
import {isEmail} from '../../service/string'
import { signin } from '../../api/auth'
import {
  getAll as getCompanies,
} from "../../api/company";
import siteConfig from '../../config/site.config';

const useStyles = makeStyles((theme) => ({
  formSelect: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: 6,
    borderColor: "#dddddd",
    outline: "none",
    cursor: "pointer",
  },
  formOption: {
    fontSize: 18,
  },
}));
function Login() {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const history = useHistory()
  const [, dispatch] = useSetting()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState({})
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (email === '' || !isEmail(email))
      res = false
    else if (password === '')
      res = false
    return res
  }
  const handleSignin = () => {
    if (!validate())
      return
    run(signin({ email, password, companyId: company._id }))
    setAsyncState('signin')
  }

  useEffect(() => {
    run(getCompanies());
    setAsyncState("getCompanies");
  }, []);
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'signin') {
        const { token, user } = data
        if (user.activate) {
          if (user?.role === 'admin') {
            dispatch({ type: 'SET', settingName: 'auth', settingData: user })
            setCookie('auth', JSON.stringify(user), 1)
            setCookie('token', token, 1)
            history.push('/admin/assignment')
          }
          else {
            let url = `${window.location.protocol}//${user?.company?.name}.${siteConfig.domain}/check/${token}`;
            window.location = url;
          }
        }
        else {
          NotificationManager.warning("You are blocked by admin.", "Worning", 3000);
        }
      }
      else if (asyncState === 'getCompanies') {
        setCompanies(data);
        console.log(data)
        if (data.length !== 0)
          setCompany(data[0])
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
      <div className="main-wrapper login-page">

        {/* Header 2 */}
        <Header />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Log In" />

        {/* Login Area */}
        <section className="login-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="login-box">
                  <div className="login-title text-center">
                    <h3>Log In</h3>
                  </div>
                  <div id="form_login" className="form">
                    {companies.length !== 0 &&
                      <p className="form-control">
                        <label htmlFor="company">Company</label>
                        <select className={classes.formSelect} id="company" onChange={(event) => setCompany(companies[event.target.value])}>
                          {companies.map((item, index) => (
                            <option className={classes.formOption} value={index} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </p>
                    }
                    <p className="form-control">
                      <label htmlFor="login_user">Email</label>
                      <input 
                        type="text" 
                        placeholder="Email" 
                        id="login_user" 
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="login_input-msg"></span>
                    </p>
                    <p className="form-control">
                      <label htmlFor="login_password">Password</label>
                      <input 
                        type="password" 
                        placeholder="*******" 
                        id="login_password" 
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="login_input-msg"></span>
                    </p>
                    <button onClick={handleSignin}>Log In</button>
                    <div className="save-forget-password d-flex justify-content-between">
                      <div className="save-passowrd">
                        <label htmlFor="save_password"><input type="checkbox" id="save_password" className="check-box" />Save Password</label>
                      </div>
                      <div className="forget-password">
                        <Link to={process.env.PUBLIC_URL + "/"}>Forget Password?</Link>
                      </div>
                    </div>
                    <div className="not_account-btn text-center">
                      <p>Haven't Any Account Yet? <Link to={process.env.PUBLIC_URL + "/register"}>Click Here</Link></p>
                    </div>
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
  )
}

export default Login