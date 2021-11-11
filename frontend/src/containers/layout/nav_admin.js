import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'none',
    marginRight: 15,
    color: 'white',
    fontSize: 15,
  }
}));

export default function Nav() {
  const history = useHistory()
  const classes = useStyles()
  const [comment, setComment] = useState(null);

  const handleLogout = () => {
    history.push('/logout')
  }
  const handleClick = (event) => {
    setComment(event.currentTarget);
  }
  const handleClose = () => {
    setComment(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/admin/assignment" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Assignment
              </Button>
            </Link>
            <Link to="/admin/subject" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Subject
              </Button>
            </Link>
            <Link to="/admin/teacher" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Teacher
              </Button>
            </Link>
            <Link to="/admin/student" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Student
              </Button>
            </Link>
            <Link to="/admin/home-setting" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Home Setting
              </Button>
            </Link>
            <Link to="/admin/replit" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Replit
              </Button>
            </Link>
          </Typography>
          <Button className={classes.button} color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}