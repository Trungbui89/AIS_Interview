import React ,{useState,useEffect} from 'react';
// import Pagination from '@material-ui/lab/Pagination';
import Pagination from '@mui/material/Pagination';
import { Grid ,Button,Typography} from '@material-ui/core';
import useStyles from './styles';

const PaginationComponent = (props) => {
    const classes = useStyles();
    const { isShowPaginate,
        addWorkOptions, handleChangePage, showActionsPaginate, filterStaff,
        handleChangePagination,pagination,showExportActions,showOverDue,
        hiddenDivider,childrenExport,
    } = props;
    const [paginationPage,setPagination] = useState(false);
    
    useEffect(() => {
        if(pagination?.total){
            handlePagination();
        }
    }, [pagination]);

    async function handlePagination(){
        let paginationNew= {};
        const fromRecord = Math.floor(1 + (pagination?.page - 1) * pagination?.limit);
        const toRecord = Math.floor(pagination?.page*pagination?.limit);
        let newTotalPage = Math.floor(pagination?.total/pagination?.limit);
        if(Math.floor(pagination?.total%pagination?.limit) >0 ){
            newTotalPage+=1;
        }
        paginationNew={
            limit:pagination?.limit,
            currentPage:pagination?.page,
            from:fromRecord,
            to:toRecord > pagination?.total ? pagination?.total : toRecord  ,
            total:pagination?.total,
            totalPage:newTotalPage,
        };
        setPagination(paginationNew);
    };
    return (
        <Grid container className={classes.container}
            style={{borderWidth:0,borderTopWidth:isShowPaginate&&!hiddenDivider ? 1 : 0,
                marginTop:hiddenDivider ? 10 : 0,
                borderColor:'#8A8A8A',
                borderStyle:'solid',}}
        >
            {
                isShowPaginate &&
                <Grid item xs={12} md={3}>
                    <p className={classes.txtCurrentPage}>
                        Hiển thị {paginationPage?.from}-{paginationPage?.to} trong {paginationPage?.total} bản ghi
                    </p>
                </Grid>
            }
            {
                isShowPaginate &&
                <Grid item xs={12} md={5} style={{display:'flex',justifyContent:'center'}}>
                    <Pagination className={classes.paginationList}
                        classes={{
                            ul: classes?.ul
                        }}
                        onChange={(event,value)=>handleChangePagination({...filterStaff, page: value})}
                        page={pagination?.page}
                        size='small'
                        variant="outlined" shape="rounded"
                        count={paginationPage?.totalPage}
                        color="warning"
                        // defaultPage={1}
                    />
                </Grid>
            }
            {
                !isShowPaginate &&
                <div style={{width:10,height:10}}/>
            }
            {/* {
                showActionsPaginate &&
            <Grid item xs={3} md={3} style={{display:'flex',justifyContent:'flex-end'}}>
                <AddWorkPopover
                    dataOptions={addWorkOptions}
                    handleChangePage={handleChangePage}
                />
            </Grid>
            } */}
            {
                showExportActions&&
                <Grid item xs={12} md={3} 
                    direction='row' justifyContent='flex-end' alignItems='center'
                    className={classes.rowExportExcel}
                    style={{display:'flex',justifyContent:'flex-end'}}>
                    {childrenExport}
                </Grid>                
            }
            {
                (showOverDue && showOverDue !== 'undefined' && showOverDue > 0) ?
                    <Grid item xs={12} md={3}>
                        <p className={classes.txtOverDate}>Tổng số {showOverDue} công việc quá hạn</p>
                    </Grid>
                    : ''                
            }
            {
                !showOverDue &&!showExportActions&&
                !showActionsPaginate &&
                <Grid item xs={12} md={3}>
                </Grid>
            }
        </Grid>
    );
};
export default React.memo(PaginationComponent);

