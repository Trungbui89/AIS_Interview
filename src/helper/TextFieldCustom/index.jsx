import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import useStyles from './styles';
import { Box, Grid, Typography } from '@mui/material';

const TextFieldCustom = (props) => {
    const {
        type,
        fullWidth,
        required,
        disabled,
        defaultValue,
        value,
        placeholder,
        title,
        onChange
    } = props;
    const classes = useStyles();

    return (
        <Box sx={styles.boxInputText}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography sx={styles.title}>{title}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        type={type}
                        fullWidth={fullWidth}
                        required={required}
                        disabled={disabled}
                        className={classes.contentInput}
                        defaultValue={defaultValue}
                        value={value}
                        placeholder={placeholder}
                        variant="outlined"
                        onChange={onChange}
                    />
                    <FormHelperText
                        className={classes.textErrorForm}
                    ></FormHelperText>
                </Grid>
            </Grid>
        </Box>
    );
};

const styles = {
    boxInputText: {
        flexGrow: 1,
        paddingTop:'15px',
        width: '95%',
        margin: 'auto'
    },
    title: {
        fontFamily: 'Quicksand',
        fontSize: '16px',
        paddingTop: '10px',
        fontWeight: 'bold',
        textAlign: 'right'
    },
};

export default TextFieldCustom;
