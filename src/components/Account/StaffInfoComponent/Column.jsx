import { TableCell } from '@mui/material';
import React from 'react';

function Column() {
  return (
    <>
        <TableCell>Function</TableCell>
        <TableCell align="center">Create</TableCell>
        <TableCell align="center">Read</TableCell>
        <TableCell align="center">Update</TableCell>
    </>
  )
}

export default Column;