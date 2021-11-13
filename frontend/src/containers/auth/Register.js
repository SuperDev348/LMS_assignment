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
import { getFilter as getCompanies, create as createCompany } from '../../api/company'
import siteConfig from "../../config/site.config";

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
  const [role, setRole] = useState('owner')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState({})
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [isCompany, setIsCompany] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    if (username === '')
      res = false
    else if (firstName === '')
      res = false
    else if (lastName === '')
      res = false
    else if (email === '' || !isEmail(email))
      res = false
    else if (password === '')
      res = false
    if (role === 'company') {
      if (companyName === '')
        res = false
      else if (subdomain === '')
        res = false
      else if (contactEmail === '')
        res = false
    }
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSignUp = async () => {
    if (!validate())
      return
    let companyId = company._id
    let tmpRole = role
    if (!isCompany) {
      const res = await createCompany({
        name: username,
        subdomain: subdomain,
        email: contactEmail,
        activate: true,
      })
      companyId = res.id
      tmpRole = 'company'
    }
    run(signup({
      name: email,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      avatar: "",
      role: tmpRole,
      helpline: 10,
      companyID: companyId,
      activate: true,
      confirm: false,
    }));
    setAsyncState('signup')
  }

  useEffect(() => {
    const host = window.location.host;
    const subdomain = host.split(".")[0];
    if (subdomain !== siteConfig.domain) {
      run(getCompanies({ subdomain: subdomain }));
      setAsyncState("getCompany");
      setIsCompany(true)
    }
  }, []);
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === "getCompany") {
        if (data.length === 0) {
          NotificationManager.warning("Please input correct domain with company subdomain", "Worning", 3000);
        }
        else {
          const tmp = data[0]
          setCompany(tmp);
        }
      } else if (asyncState === "signup") {
        history.push("/login");
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
                    <Row>
                      {!isCompany ? (
                        <>
                          <Col md="12">Company Info</Col>
                          <Col md="6" xs="12">
                            <p className="form-control">
                              <label htmlFor="registration_company_name">Company Name</label>
                              <input
                                type="text"
                                placeholder="Company name"
                                id="registration_company_name"
                                autoComplete="off"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                              />
                              <span className="registration_input-msg"></span>
                            </p>
                          </Col>
                          <Col md="6" xs="12">
                            <p className="form-control">
                              <label htmlFor="registration_contact_email">Company Contact Email</label>
                              <input
                                type="text"
                                placeholder="Contact email"
                                id="registration_contact_email"
                                autoComplete="off"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                              />
                              <span className="registration_input-msg"></span>
                            </p>
                          </Col>
                          <Col md="6" xs="12">
                            <p className="form-control" style={{position: 'relative'}}>
                              <label htmlFor="registration_subdomain">Subdomin</label>
                              <input
                                type="text"
                                placeholder="Subdomain"
                                id="registration_subdomain"
                                autoComplete="off"
                                value={subdomain}
                                onChange={(e) => setSubdomain(e.target.value)}
                              />
                              <div style={{position: 'absolute', right: 10, top: 40, fontSize: 16}}>.onlmp.com</div>
                            </p>
                          </Col>
                          <Col md="6" xs="12" style={{padding: 40, fontSize: 16}}>.onlmp.com</Col>
                        </>
                      ) : (
                        <>
                          <Col md="6" xs="12">
                            <p className="form-control">
                              <select
                                className={classes.formSelect}
                                id="role"
                                onChange={(event) => setRole(event.target.value)}
                              >
                                <option
                                  className={classes.formOption}
                                  value="owner"
                                  selected={role === "owner"}
                                >
                                  Teacher
                                </option>
                                <option
                                  className={classes.formOption}
                                  value="student"
                                  selected={role === "student"}
                                >
                                  Student
                                </option>
                              </select>
                            </p>
                          </Col>
                          <Col md="6" xs="12"></Col>
                        </>
                      )
                        
                      }
                      <Col md="12">User Info</Col>
                      <Col md="6" xs="12">
                        <p className="form-control">
                          <label htmlFor="registration_first_name">First Name</label>
                          <input
                            type="text"
                            placeholder="First name"
                            id="registration_first_name"
                            autoComplete="off"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <span className="registration_input-msg"></span>
                        </p>
                      </Col>
                      <Col md="6" xs="12">
                        <p className="form-control">
                          <label htmlFor="registration_last_name">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            id="registration_last_name"
                            autoComplete="off"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          <span className="registration_input-msg"></span>
                        </p>
                      </Col>
                      <Col md="6" xs="12">
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
                      </Col>
                      <Col md="6" xs="12">
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
                      </Col>
                    </Row>
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