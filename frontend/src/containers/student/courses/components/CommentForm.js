import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import {Refresh} from '@material-ui/icons'
import { Styles } from '../styles/commentForm.js'
import {create} from '../../../../api/comment'
import {useAsync} from '../../../../service/utils'
import CommentFileAttach from './CommentFileAttach'
import { useSetting } from '../../../../provider/setting'
import { getFilter as getCompany } from "../../../../api/company";

function CommentForm(props) {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const { refresh, ownerId, levelId } = props
  const [setting] = useSetting()
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState({})
  const [filenames, setFilenames] = useState([])
  const [fileState, setFileState] = useState(-1)
  const [asyncState, setAsyncState] = useState('')

  const handleSubmit = () => {
    if (description !== '') {
      run(create({
        description: description,
        userID: setting?.auth?._id,
        ownerID: ownerId,
        levelID: levelId,
        isOwner: false,
        isFile: false,
        companyID: company._id
      }))
      setAsyncState('create')
    }
  }
  const handleUpload = (filenames) => {
    setFilenames(filenames)
    run(create({
      description: filenames[0].name,
      fileUrl: filenames[0].url,
      userID: setting?.auth?._id,
      ownerID: ownerId,
      levelID: levelId,
      isOwner: false,
      isFile: true,
      companyID: company._id
    }))
    setFileState(1)
    setAsyncState('file')
  }
  const fileAttach = () => {
    if (fileState >= filenames.length)
      return
    run(create({
      description: filenames[fileState].name,
      fileUrl: filenames[fileState].url,
      userID: setting?.auth?._id,
      ownerID: ownerId,
      levelID: levelId,
      isOwner: false,
      isFile: true,
      companyID: company._id
    }))
    setFileState(fileState + 1)
  }

  useEffect(() => {
    (async () => {
      const host = window.location.host;
      const subdomain = host.split(".")[0];
      let res = await getCompany({ name: subdomain });
      if (res.length !== 0) {
        setCompany(res[0]);
      }
    })();
  }, []);
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'create') {
        refresh()
        setDescription('')
        setAsyncState('')
      }
      else if (asyncState === 'file') {
        if (fileState < filenames.length) {
          fileAttach()
          console.log(fileState)
        }
        else if (fileState === filenames.length) {
          refresh()
          setFilenames([])
          setFileState(-1)
          setAsyncState('')
        }
      }
    }
    else if (status === 'rejected') {
        console.log(error)
    }
  }, [status, run])
  return (
    <Styles>
      <div id="form6" className="form review-comment-form">
        <Row>
          <Col md="12">
            <p className="form-control">
              <textarea id="desc6" placeholder="Enter your comment" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
              <span className="input-msg6"></span>
            </p>
          </Col>
          <Col md="12">
            <div style={{display: 'flex', alignItems: 'center'}}>
              <button onClick={handleSubmit}>Submit Comment</button>
              <CommentFileAttach callback={handleUpload} style={{paddingTop: 10}} />
              <Refresh style={{cursor: 'pointer', fontSize: 25, paddingTop: 3}} onClick={(e) => refresh()} />
            </div>
          </Col>
        </Row>
      </div>
    </Styles>
  )
}

export default CommentForm