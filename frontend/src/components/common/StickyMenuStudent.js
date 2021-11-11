import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/stickyMenu.js";
import {useSetting} from '../../provider/setting'

function StickyMenu(props) {
    const {commonSetting} = props
    const [setting] = useSetting()
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const stickyMenu = document.querySelector(".sticky-menu");
            if (stickyMenu) {
                if (window.scrollY > 160) {
                    stickyMenu.classList.add("sticky");
                } else {
                    stickyMenu.classList.remove("sticky");
                }
            }
        });
    });

    return (
        <Styles>
            {/* Sticky Menu */}
            <section className="sticky-menu">
                <Container>
                    <Row>
                        <Col md="3">
                            <div className="logo">
                                <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" style={{width: 170}} /></Link>
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="menu-box d-flex justify-content-end">
                                <ul className="nav menu-nav">
                                    <li className="nav-item dropdown active">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Home</Link>
                                    </li>
                                    <li className="nav-item dropdown active">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/course"} data-toggle="dropdown">Course</Link>
                                    </li>
                                </ul>
                                <div className="apply-btn">
                                    {!setting.auth &&
                                        <Link to={process.env.PUBLIC_URL + "/register"}><i className="las la-clipboard-list"></i>Apply Now</Link>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Styles>
    )
}

export default StickyMenu