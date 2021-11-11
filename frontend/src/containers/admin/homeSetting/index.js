import React from 'react'
import {Container} from '@material-ui/core'

import Nav from '../../layout/nav_admin'
import IconBox from './iconBox'
import Common from './common'
import Slider from './slider/index'
import Aboutus from './aboutus'
import Testimonial from './testimonial/index'
import Question from './question/index'
import Event from './event/index'
import Helper from './helper/index'
import Blog from './blog/index'
import Campus from './campus/index'

const HomeSetting = () => {

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <h2 style={{textAlign: 'center', padding: 50}}>Home Setting</h2>
        <IconBox />
        <Common />
        <Slider />
        <Aboutus />
        <Testimonial />
        <Question />
        <Event />
        <Helper />
        <Blog />
        <Campus />
      </Container>
    </div>
  )
}

export default HomeSetting