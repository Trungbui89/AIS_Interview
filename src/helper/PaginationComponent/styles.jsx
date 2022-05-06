import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        minHeight: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingTop:10,
        marginTop:-12
    },
    txtCurrentPage: {
        fontSize: 14, 
        fontWeight: 400,
        color: '#000',
    },
    txtOverDate: {
        fontSize: 14, 
        fontWeight: 400,
        color: '#FF0000',
    },
    paginationList: {
    },
    viewRight: {
        width:'15%'
    },
    ul: {
        '& .MuiPaginationItem-root': {
            color: '#333333',
            // backgroundColor:colors?.lightYellow,
            borderColor:'#F7C245'
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#F7C245',
            color:'#fff'
        }
    },
    '@media (max-width: 1115px)': {
        txtCurrentPage: {
            textAlign: 'center'
        },
        txtOverDate: {
            textAlign: 'center'
        },
    },
    '@media (max-width: 836px)': {
        rowExportExcel: {
            justifyContent: 'center !important',
            marginTop: 15
        },
    }
    
}));