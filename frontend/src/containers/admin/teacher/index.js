import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Container,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {RemoveRedEye, Favorite, Refresh} from '@material-ui/icons'
import {Link} from 'react-router-dom'

import Nav from '../../layout/nav_admin'
import {getTeachers, update} from '../../../api/user'
import {useAsync} from '../../../service/utils'

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "assignmentNumber", label: "Assignment", minWidth: 100 },
  { id: "activate", label: "Active", minWidth: 50 },
  // {
  //   id: 'action',
  //   label: 'Action',
  //   minWidth: 170,
  //   align: 'center',
  // },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    textTransform: 'none',
  },
  refresh: {
    float: 'right',
    marginRight: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
const Teacher = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [teachers, setTeachers] = useState([])
  const [asyncState, setAsyncState] = useState('')
  const [pending, setPending] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const refresh = () => {
    run(getTeachers())
    setAsyncState('getTeachers')
    setPending(true)
  }
  const handleActivate = (teacher, activate) => {
    let tmp = {}
    tmp._id = teacher._id
    tmp.activate = activate
    run(update(tmp))
    setAsyncState('update')
    setPending(true)
  }
  
  useEffect(() => {
    run(getTeachers())
    setAsyncState('getTeachers')
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getTeachers') {
        let teachers = data.map((item) => {
          let res = item
          res.assignmentNumber = item?.assignments?.length
          return res
        })
        setTeachers(teachers)
        setPending(false)
      }
      else if (asyncState === 'update') {
        run(getTeachers())
        setAsyncState('getTeachers')
        setPending(true)
      }
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <>
      <Nav />
      <Backdrop className={classes.backdrop} open={pending}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Container maxWidth="lg">
        <h2 style={{textAlign: 'center', padding: 50}}>Teacher Manage</h2>
        <IconButton className={classes.refresh} aria-label="detail" onClick={refresh}>
          <Refresh />
        </IconButton>
        <Paper className={classes.root}>
          <TableContainer className={classes.container} style={{fontSize: 15}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontSize: 15 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{fontSize: 14}}>
                            {column.id === 'activate'?
                              (row.activate?
                                (
                                  <IconButton aria-label="detail" onClick={(e) => handleActivate(row, false)}>
                                    <Favorite color={'primary'} />
                                  </IconButton>
                                ):
                                (
                                  <IconButton aria-label="detail" onClick={(e) => handleActivate(row, true)}>
                                    <Favorite />
                                  </IconButton>
                                )
                              ):
                              value
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={teachers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  )
}

export default Teacher
