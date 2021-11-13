import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import { useSetting } from '../../provider/setting'

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
  const [setting] = useSetting()
  const [user, setUser] = useState({})

  const handleLogout = () => {
    history.push('/logout')
  }

  useEffect(() => {
    if (setting?.auth) {
      setUser(setting?.auth)
    }
  }, [setting?.auth])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/company/assignment" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Assignment
              </Button>
            </Link>
            {user?.role === 'company' &&
              <Link to="/company/admin" style={{textDecoration: 'none'}}>
                <Button className={classes.button} color="inherit">
                  Admin
                </Button>
              </Link>
            }
            {/* {user?.role === 'companyAdmin' &&
              <Link to="/company/changePassword" style={{textDecoration: 'none'}}>
                <Button className={classes.button} color="inherit">
                  Change Password
                </Button>
              </Link>
            } */}
            <Link to="/company/subject" style={{textDecoration: 'none'}}>
                <Button className={classes.button} color="inherit">
                  Subject
                </Button>
              </Link>
            <Link to="/company/teacher" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Teacher
              </Button>
            </Link>
            <Link to="/company/student" style={{textDecoration: 'none'}}>
              <Button className={classes.button} color="inherit">
                Student
              </Button>
            </Link>
            <Link to="/company/replit" style={{textDecoration: 'none'}}>
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