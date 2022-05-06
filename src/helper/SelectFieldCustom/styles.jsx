import { makeStyles } from '@material-ui/styles';
import { colors } from '../../constants/colors';

export default makeStyles((theme) => ({
    formControl: {
        '& .MuiFormControl-marginNormal': {
            marginTop: 0,
            marginBottom: 0,
        },
        minHeight: 40,
        width: '15%',
    },
    selectField: {
        display: 'flex', height: 40,
        textAlign: 'center', justifyItems: 'center',
        borderRadius: 7, borderColor: colors?.mediumGray,
        '& .MuiSelect-select:focus': {
            backgroundColor: 'white',
        },
    },
    titleVertical:{
        paddingBottom:10,
        fontFamily: 'Quicksand'
    }
}));
