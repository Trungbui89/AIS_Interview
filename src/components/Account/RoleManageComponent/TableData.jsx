import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    Typography,
} from '@mui/material';
import { styles } from './styles';
import Column from './Column';
import Rows from './Rows';

export function TableData(props) {
    const { roleDetail, postAddPerToRole } = props;
    const createData = (name, create, read, update) => {
        return { name, create, read, update };
    };
    const rows = roleDetail?.map((per) =>
        createData(per.name, per.canCreate, per.canRead, per.canUpdate),
    );
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={styles.tableTitle}>
                        <Column />
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Rows roleDetail={roleDetail} postAddPerToRole={postAddPerToRole}/>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function BoxRole(props) {
    const { roles, setRoleDetailId, roleDetailId, toggleAddRoleModal } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="custom pagination table">
                <TableBody>
                    {roles?.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell
                                onClick={() => setRoleDetailId(role.id)}
                                sx={
                                    roleDetailId === role?.id
                                        ? styles.roleFocus
                                        : {}
                                }
                            >
                                {role.name}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell
                            align="center"
                        >
                            <IconButton onClick={toggleAddRoleModal}>
                                <Typography sx={{ color: 'blue', fontFamily: 'Quicksand'}}>
                                    + Add more role
                                </Typography>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export function BoxPermission (props) {
    const {permissions} = props
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="custom pagination table">
                <TableBody>
                    {permissions?.map((per) => (
                        <TableRow>
                            <TableCell>
                                {per.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}