import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    convertDateToApi,
    convertDateToLocal,
} from '../../../constants/shared';
import TextFieldCustom from '../../../helper/TextFieldCustom';
import CardHeader from './CardHeader';

export default function UserInformation(props) {
    const { staffInfo } = props;
    const [userInfor, setUserInfor] = useState({});
    const [isEdit, setIsEdit] = useState(true);
    useEffect(() => {
        if (staffInfo) {
            setUserInfor(staffInfo);
        }
    }, [staffInfo]);
    return (
        <>
            <CardHeader
                icon="/icon/User-profile.svg"
                title="Thông tin người dùng"
            />
            <Box sx={{ paddingTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextFieldCustom
                            disabled={isEdit}
                            type="text"
                            title="Họ và tên"
                            defaultValue={staffInfo?.fullName}
                            value={userInfor.fullName || ''}
                            onChange={(e) =>
                                setUserInfor({
                                    ...userInfor,
                                    fullName: e.target.value,
                                })
                            }
                        />
                        <TextFieldCustom
                            type={isEdit === true ? "text" : "date"}
                            disabled={isEdit}
                            title="Ngày sinh"
                            defaultValue={staffInfo?.birthDay}
                            value={convertDateToLocal(userInfor.birthDay) || ''}
                            onChange={(e) =>
                                setUserInfor({
                                    ...userInfor,
                                    birthDay: convertDateToApi(e.target.value),
                                })
                            }
                        />
                        <TextFieldCustom
                            disabled={isEdit}
                            title="Email"
                            defaultValue={staffInfo?.email}
                            value={userInfor.email || ''}
                            onChange={(e) =>
                                setUserInfor({
                                    ...userInfor,
                                    email: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldCustom
                            disabled={isEdit}
                            title="Tên đăng nhập"
                            defaultValue={staffInfo?.username}
                            value={userInfor.username || ''}
                            onChange={(e) =>
                                setUserInfor({
                                    ...userInfor,
                                    username: e.target.value,
                                })
                            }
                        />
                        <TextFieldCustom
                            disabled={isEdit}
                            title="Địa chỉ"
                            defaultValue={staffInfo?.address}
                            value={userInfor.address || ''}
                            onChange={(e) =>
                                setUserInfor({
                                    ...userInfor,
                                    address: e.target.value,
                                })
                            }
                        />
                        <TextFieldCustom
                            type={isEdit === true ? "text" : "date"}
                            disabled={isEdit}
                            title="Ngày chính thức"
                            defaultValue={staffInfo?.startDay}
                            value={userInfor?.startDay !== null ? convertDateToLocal(userInfor.startDay) : "(chưa có)"}
                            onChange={(e) =>
                                setUserInfor({
                                    ...userInfor,
                                    startDay: convertDateToApi(e.target.value),
                                })
                            }
                        />
                    </Grid>
                </Grid>
                {isEdit && isEdit === true ? 
                (<Button variant="outlined" sx={{marginTop: 10}} onClick={()=> setIsEdit(false)} >
                    Chỉnh sửa
                </Button>) : 
                (<Button variant="outlined" color='warning' sx={{marginTop: 10}} onClick={()=> setIsEdit(true)} >
                    lưu
                </Button>)}
            </Box>
        </>
    );
}
