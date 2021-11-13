import React, {useState, useEffect} from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {NotificationManager} from 'react-notifications'

import {useAsync} from '../../../service/utils'
import { signup } from "../../../api/auth";
import { isEmail } from '../../../service/string'
import siteConfig from '../../../config/site.config'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    textTransform: 'none',
    fontSize: 15,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
const CreateDialog = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {refresh, companyId} = props
  const [modalActive, setModalActive] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmUrl, setConfirmUrl] = useState('')
  const [pending, setPending] = useState(false)

  const handleClickOpen = () => {
    setName('')
    setEmail('')
    setConfirmUrl('')
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const validate = () => {
    let res = true
    if (name === '')
      res = false
    if (email === '' || !isEmail(email))
      res = false
    if (!res)
      NotificationManager.warning('Please input required fields', 'Worning', 3000);
    return res
  }
  const handleSave = () => {
    if (!validate())
      return
    run(signup({
      name: name,
      email: email,
      password: '12345678',
      avatar: "",
      role: "companyAdmin",
      helpline: 10,
      companyID: companyId,
      firstName: name,
      lastName: name,
      activate: true,
      confirm: false,
      isInvite: true,
    }))
    setPending(true)
  }

  useEffect(() => {
    if (status === 'resolved') {
      setPending(false)
      setConfirmUrl(`${siteConfig.domain}/confirmInvite/${data?.mailCode}`)
      refresh()
    }
    else if (status === 'rejected') {
      console.log(error)
      NotificationManager.warning(error.message, 'Worning', 3000);
      setPending(false)
    }
  }, [run, status, data, error])
  return (
    <>
      <Button className={classes.button} style={{marginBottom: 10, float: 'right'}} variant="outlined" onClick={handleClickOpen}>Add Admin</Button>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Add Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please input data
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Full Name"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{marginTop: 20, marginBottom: 20}}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{marginTop: 20, marginBottom: 20}}
          />
          {confirmUrl !== '' &&
          <TextField
            margin="dense"
            id="confirmUrl"
            label="Confirm Link"
            inputProps={{min: 0, style: { fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={confirmUrl}
            onChange={(e) => setConfirmUrl(confirmUrl)}
            style={{marginTop: 20, marginBottom: 20}}
          />
          }
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.button} onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default CreateDialog
