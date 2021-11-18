import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
// import CourseFilter from '../components/CourseFilter'
import Content from '../components/Content'
import Features from '../components/Features'
import TestimonialSlider from '../components/TestimonialSlider'
import FaqEvent from '../components/FaqEvent'
import HomeBlog from '../components/HomeBlog'
import NewsletterForm from '../components/NewsletterForm'
import Footer from '../components/Footer'
import siteConfig from '../config/site.config'
import LoginForm from './auth/LoginForm'

const Home = () => {
    const [subdomain, setSubdomain] = useState('')

    useEffect(() => {
        const host = window.location.host;
        const subd = host.split(".")[0];
        if (subd !== siteConfig.domain.split(".")[0]) {
          setSubdomain(subd)
        }
    },[])
    return (
        <div className="main-wrapper" >

            {/* Nav */}
            < Nav />
            {subdomain === '' ? 
                (
                    <>
                        <Content />
            
                        <Features />
                        {/* Course Filter */}
                        {/* < CourseFilter /> */}
            
                        {/* Testimonial Slider */}
                        < TestimonialSlider />
            
                        {/* Faq & Event Area */}
                        < FaqEvent />
            
                        {/* Blog Area */}
                        < HomeBlog />
            
                        {/* Newsletter Form */}
                        < NewsletterForm />
                    </>
                ): (
                    <LoginForm />
                )
            }

            {/* Footer */}
            < Footer />

        </div >
    )
}

export default Home
