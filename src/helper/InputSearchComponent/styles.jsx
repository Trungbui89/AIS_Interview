import {makeStyles } from '@material-ui/styles';

//input search
export default makeStyles((theme) => ({
    search: {
        display: 'flex',
        height: '32px !important',
        width: '100%',
        alignItems: 'center',
        fontSize: 14, fontWeight: '400',
        borderWidth: 0,
        borderColor: '#cccccc', borderStyle: 'solid', borderRadius: '5px',
        '& focus': {
            borderColor: '#75A7FB',
        },
        '& hover': {
            borderColor: '#75A7FB',
        },
    },
    container: {
        width: '100%',
        height:32,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0,
    },
    iconLeft: {
        width:32,height:32,
        display:'flex',justifyContent:'center',
        alignItems:'center',
        borderWidth:0,
        '&:hover': {
            backgroundColor:'#F5F5F5'
        },
    },
    searchIcon: {
        width: 16, height: 16,
    }
}));