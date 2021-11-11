import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import Header from '../../../components/NavTwoStudent'
import { BreadcrumbBox } from '../../../components/common/Breadcrumb'
import BlogSidebar from './components/BlogSidebar'
import FooterTwo from '../../../components/FooterTwo'
import { Styles } from './styles/blogDetails.js'
import {get} from '../../../api/settingBlog'
import {useAsync} from '../../../service/utils'
import AmplifyImage from '../../../components/amplifyImage'
import {getMonth} from '../../../service/string'

const BlogDetails = () => {
    const {data, status, error, run} = useAsync({
        status: 'idle',
    })
    const {id} = useParams()
    const [blog, setBlog] = useState({})

    useEffect(() => {
        run(get(id))
    }, [run])
    useEffect(() => {
        if (status === 'resolved') {
            setBlog(data)
        }
        else if (status === 'rejected') {
            console.log(error)
        }
    }, [status, run])
    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper blog-details-page">

                {/* Header 2 */}
                <Header />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Blog Details" />

                {/* Blog Details */}
                <section className="blog-details-area">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <div className="blog-details-box">
                                    <div className="blog-details-banner">
                                        <img src={blog.image} className="img-fluid" style={{width: '100%'}} />
                                    </div>
                                    <div className="heading">
                                        <h4>{blog.title}</h4>
                                    </div>
                                    <div className="blog-auth_date d-flex">
                                        <div className="author-img d-flex">
                                            <p><Link to={process.env.PUBLIC_URL + "/"}>{blog.authorName}</Link></p>
                                        </div>
                                        <div className="post-date">
                                            <p><i className="las la-calendar"></i>{`${blog.day} ${getMonth(blog.month)}`}</p>
                                        </div>
                                        <div className="post-comment">
                                            <p><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-comment"></i> ({blog.commentNumber})</Link></p>
                                        </div>
                                    </div>
                                    {blog.description&&
                                        <SunEditor
                                            defaultValue={blog.description}
                                            disable={true}
                                            showToolbar={false}
                                            setDefaultStyle="height: auto"
                                        />
                                    }
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

export default BlogDetails