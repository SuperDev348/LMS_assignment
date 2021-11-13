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
import { getCountryList } from '../../service/string';

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
    fontSize: 15,
  },
  role: {
    border: "solid 1px black",
    borderRadius: 5,
    cursor: "pointer",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    margin: "10px 0px",
  },
  activeRole: {
    borderRadius: 5,
    cursor: "pointer",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    margin: "10px 0px",
    background: "linear-gradient(90deg,#31393c 0%,#0d1c2f 100%)",
    color: "#fff",
  },
}));
function Register() {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const history = useHistory()
  const countryList = getCountryList()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('owner')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState(countryList[0])
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState({})
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [isCompany, setIsCompany] = useState(false)
  const [policy, setPolicy] = useState(false)
  const [condition, setCondition] = useState(false)
  const [asyncState, setAsyncState] = useState('')

  const validate = () => {
    let res = true
    let message = ""
    if (firstName === '') {
      message = "firstName is required fields";
      res = false
    }
    else if (lastName === '') {
      message = "lastName is required fields";
      res = false
    }
    else if (email === '' || !isEmail(email)) {
      message = "email is required fields";
      res = false
    }
    else if (password === '') {
      message = "password is required fields";
      res = false
    }
    else if (phone === '') {
      message = "phone is required fields";
      res = false
    }
    else if (!policy) {
      message = "Please accept policy.";
      res = false
    }
    else if (!condition) {
      message = "Please accept condition";
      res = false
    }
    if (role === 'company') {
      if (companyName === '') {
        message = "companyName is required fields";
        res = false
      }
      else if (subdomain === '') {
        message = "subdomain is required fields";
        res = false
      }
      else if (contactEmail === '') {
        message = "contactEmail is required fields";
        res = false
      }
    }
    if (!res)
      NotificationManager.warning(message, 'Worning', 3000);
    return res
  }
  const handleSignUp = async () => {
    if (!validate())
      return
    let companyId = company._id
    let tmpRole = role
    if (!isCompany) {
      const res = await createCompany({
        name: companyName,
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
      phone: phone,
      country: country,
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
    if (subdomain !== siteConfig.domain.split(".")[0]) {
      run(getCompanies({ subdomain: subdomain }));
      setAsyncState("getCompany");
      setIsCompany(true);
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
                            <div
                              className={role === 'owner' ? classes.activeRole : classes.role}
                              onClick={() => setRole('owner')}
                            >
                              Teacher
                            </div>
                          </Col>
                          <Col md="6" xs="12">
                            <div
                              className={role === 'student' ? classes.activeRole : classes.role}
                              onClick={() => setRole('student')}
                            >
                              Student
                            </div>
                          </Col>
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
                      <Col md="6" xs="12">
                        <p className="form-control">
                          <label htmlFor="registration_country">Country</label>
                          <select
                            className={classes.formSelect}
                            id="registration_country"
                            onChange={(event) => setCountry(event.target.value)}
                          >
                            {countryList.map((item, index) => (
                              <option
                                className={classes.formOption}
                                value={item}
                                key={index}
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                          <span className="registration_input-msg"></span>
                        </p>
                      </Col>
                      <Col md="6" xs="12">
                        <p className="form-control">
                          <label htmlFor="registration_phone">Phone</label>
                          <input
                            type="text"
                            id="registration_phone"
                            autoComplete="off"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <span className="registration_input-msg"></span>
                        </p>
                      </Col>
                      <Col md="12" className="check-btn">
                        <label htmlFor="policy"><input type="checkbox" id="policy" className="check-box" checked={policy} onChange={(e) => setPolicy(e.target.checked)} />
                          Would you like to receive additional information on Callidus Software Inc. producs and
                          services along with information related to this inquiry? By checking this box, you agree that
                          your contact details will be used by Callidus Software Inc. in accordance with the Callidus Software Inc.
                        </label>
                      </Col>
                      <Col md="12" className="check-btn">
                        <label htmlFor="condition"><input type="checkbox" id="condition" className="check-box" checked={condition} onChange={(e) => setCondition(e.target.checked)} />
                          I have read and uderstood the Terms and Conditions of Callidus Software Inc.
                        </label>
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