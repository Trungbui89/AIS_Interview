import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, Button, Typography } from '@material-ui/core';
import useStyle from './styles';

const InputSearchComponent = (props) => {
    const { handleSearch, length, placeholder, onChangeSearch, setWordSearch, handleChangeText, isSetOutSite ,onBlur, defaultValue, value } = props;
    
    const [textSearch, setTextSearch] = useState('');
    const classes = useStyle();

    useEffect(() => {
        if(value){
            setTextSearch(value);
        }

    },[value] )

    const onChangeText = (event) => {
        onChangeSearch && onChangeSearch(event?.target?.value);
        setTextSearch(event?.target?.value);
    };

    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            return handleSearch('key_word', textSearch);
        }
        return null;
    };


    return (
        <Grid style={{ display: 'flex' }} className={classes.container}>
            <TextField
                onBlur={(val) => { onBlur && onBlur(val) }}
                variant='outlined'
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={classes.container}
                onChange={isSetOutSite ? handleChangeText : onChangeText}
                value={textSearch}
                onKeyPress={handlePressKey}
                InputProps={{
                    className: classes.search,
                }} />
        </Grid >
    );
};

export default InputSearchComponent;
