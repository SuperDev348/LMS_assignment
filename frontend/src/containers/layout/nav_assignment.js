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
            <Link to="/teacher/assignment" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Assignment
              </Button>
            </Link>
            <Link to="/teacher/student" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Student
              </Button>
            </Link>
            <Button className={classes.button} color="inherit" onClick={handleClick}>
              Comment
            </Button>
            <Menu
              anchorEl={comment}
              keepMounted
              open={Boolean(comment)}
              onClose={handleClose}
            >
              <Link to="/teacher/comment" style={{textDecoration: 'none'}}>
                <MenuItem onClick={handleClose}>New Comment</MenuItem>
              </Link>
              <Link to="/teacher/comment/all" style={{textDecoration: 'none'}}>
                <MenuItem onClick={handleClose}>All Comments</MenuItem>
              </Link>
            </Menu>
            <Link to="/teacher/notification" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Notification
              </Button>
            </Link>
            <Link to="/teacher/exampool" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                ExamPool
              </Button>
            </Link>
            <Link to="/teacher/newsletter" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                NewsLetter
              </Button>
            </Link>
            <Link to="/teacher/payment" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Payment
              </Button>
            </Link>
          </Typography>
          <Button className={classes.button} color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}