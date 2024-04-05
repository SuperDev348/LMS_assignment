import React, {useEffect, useState} from 'react'
import {
  Paper,
  Grid,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Refresh} from '@material-ui/icons'

import {useAsync} from '../../../../service/utils'
import {getAll} from '../../../../api/settingBlog'
import Create from './create'
import Edit from './edit'
import Delete from './delete'

const columns = [
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'authorName', label: 'Author Name', minWidth: 100 },
  { id: 'commentNumber', label: 'Comment Number', minWidth: 100 },
  { id: 'thumbNumber', label: 'Thumb Number', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'image', label: 'Image', minWidth: 100 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
]
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: '18px',
    paddingBottom: 30
  },
  button: {
    textTransform: 'none',
    fontSize: 15,
  },
  refresh: {
    marginLeft: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
const Blog = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [blogs, setBlog] = useState([])
  const [pending, setPending] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const refresh = () => {
    run(getAll())
    setPending(true)
  }

  useEffect(() => {
    run(getAll())
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      let tmp = data.map((item) => {
        let res = item
        res.date = `${item.month}/${item.day}`
        return res
      })
      setBlog(tmp)
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
    }
  }, [status])
  return (
    <Paper className={classes.root}>
      <Backdrop className={classes.backdrop} open={pending}>
        <CircularProgress color="primary" />
      </Backdrop>
      <div className={classes.title}>Blog Setting</div>
      <Grid container spacing={3}>
        <Create refresh={refresh} />
        <IconButton className={classes.refresh} aria-label="detail" onClick={refresh}>
          <Refresh />
        </IconButton>
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
              {blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize: 14}}>
                          {column.id === 'action'?
                            (
                              <>
                                <Edit item={row} refresh={refresh} />
                                <Delete item={row} refresh={refresh} />
                              </>
                            ):
                            column.id === 'image'?
                            <img src={row.image} style={{height: 60}} />:
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
          count={blogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Paper>
  )
}

export default Blog