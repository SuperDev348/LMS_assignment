import React, { useEffect } from 'react'
import Nav from '../components/Nav'
// import CourseFilter from '../components/CourseFilter'
import Content from '../components/Content'
import Features from '../components/Features'
import TestimonialSlider from '../components/TestimonialSlider'
import FaqEvent from '../components/FaqEvent'
import HomeBlog from '../components/HomeBlog'
import NewsletterForm from '../components/NewsletterForm'
import Footer from '../components/Footer'

const Home = () => {

    useEffect(() => {

    },[])
    return (
        <div className="main-wrapper" >

            {/* Nav */}
            < Nav />

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

            {/* Footer */}
            < Footer />

        </div >
    )
}

export default Home
