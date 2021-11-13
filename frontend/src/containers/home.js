import React, { useEffect } from 'react'
import Nav from '../components/NavStudent'
import HeroSlider from '../components/HeroSlider'
import IconBox from '../components/IconBox'
import AboutUs from '../components/AboutUs'
import CourseFilter from '../components/CourseFilter'
import TestimonialSlider from '../components/TestimonialSlider'
import FaqEvent from '../components/FaqEvent'
import TeamSlider from '../components/TeamSlider'
import HelpArea from '../components/HelpArea'
import HomeBlog from '../components/HomeBlog'
import CampusTour from '../components/CampusTour'
import NewsletterForm from '../components/NewsletterForm'
import Footer from '../components/Footer'

const Home = () => {

    useEffect(() => {

    },[])
    return (
        <div className="main-wrapper" >

            {/* Nav */}
            < Nav />

            {/* Hero Slider */}
            < HeroSlider />
            {/* Icon Box */}
            < IconBox />

            {/* About Area */}
            < AboutUs />

            {/* Course Filter */}
            {/* < CourseFilter /> */}

            {/* Testimonial Slider */}
            < TestimonialSlider />

            {/* Faq & Event Area */}
            < FaqEvent />

            {/* Team Slider */}
            < TeamSlider />

            {/* Help Area */}
            {/* < HelpArea /> */}

            {/* Blog Area */}
            < HomeBlog />

            {/* Campus Tour */}
            {/* < CampusTour /> */}

            {/* Newsletter Form */}
            < NewsletterForm />

            {/* Footer */}
            < Footer />

        </div >
    )
}

export default Home
