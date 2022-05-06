import {
    Box,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CardHeader from './CardHeader';
import Paper from '@mui/material/Paper';
import Column from './Column';
import Rows from './Rows';

export default function UserRole(props) {
    const {
        staffInfo,
        roles,
        roleInUser,
        postAddRoleToUser,
        deleteUserRole,
        perInUser,
        postAddPerToUser
    } = props;
    const [userInfor, setUserInfor] = useState({});
    useEffect(() => {
        if (staffInfo) {
            setUserInfor(staffInfo);
        }
    }, [staffInfo]);

    const rows = roles?.map((role) => ({ id: role?.id, name: role?.name }));

    const checkRoleInUser = (name) => {
        const roleInUserArr = roleInUser?.map((role) => role.name);
        const check = roleInUserArr.includes(name);
        return check;
    };

    const handleUpdateRole = (id) => {
        const roleInUserArr = roleInUser?.map((role) => role.id);
        const check = roleInUserArr.includes(id);
        if (check === true) {
            deleteUserRole(id);
        } else {
            postAddRoleToUser(id);
        }
    };

    return (
        <>
            <CardHeader icon="/icon/User-role.svg" title="Quản lý quyền" />
            <Box sx={{ paddingTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={styles.titleRole}>
                            Phân quyền
                        </Typography>
                        <TableContainer
                            component={Paper}
                            sx={{ width: '90%', margin: 'auto' }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align="center"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Role
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={() =>
                                                        handleUpdateRole(row.id)
                                                    }
                                                >
                                                    {checkRoleInUser(
                                                        row.name,
                                                    ) === true ? (
                                                        <img
                                                            src="/icon/Unassign.svg"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/icon/Assign.svg"
                                                            alt=""
                                                        />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={styles.titleRole}>Chức năng</Typography>
                        <TableContainer
                            component={Paper}
                            sx={{ width: '90%', margin: 'auto' }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <Column />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Rows roleDetail={perInUser} postAddPerToUser={postAddPerToUser} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

const styles = {
    titleRole: {
        fontFamily: 'Quicksand',
        fontSize: '18px',
        fontWeight: 'bold',
        paddingBottom: '10px',
    },
};
