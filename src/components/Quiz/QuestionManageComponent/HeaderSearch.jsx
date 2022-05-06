import { Box, Grid } from '@mui/material';
import React from 'react';
import SelectFieldCustom from '../../../helper/SelectFieldCustom';

function HeaderSearch(props) {
    const { categories, setFilterListQuesion, filterListQuesion, quesTypes } = props;
    const dataCategory = categories?.map((cate) => ({
        label: cate.name,
        value: cate.id,
    }));
    const dataQuestionType = quesTypes?.map((cate) => ({
        label: cate.name,
        value: cate.id,
    }));

    const handleChangeFilterQuestion = (key, value) => {
        if(key === 'cate') {
            setFilterListQuesion({
                ...filterListQuesion,
                cateId: value?.value
            })
        }
        if(key === 'type'){
            setFilterListQuesion({
                ...filterListQuesion,
                typeId: value?.value
            })
        }
    }
    console.log(filterListQuesion, 'filterListQuesion')
    return (
        <div style={{ marginTop: 20, textAlign: 'left' }}>
            <Grid container>
                <Grid item xs={2}>
                    <Box style={{ width: '90%' }}>
                        <SelectFieldCustom
                            title="Category"
                            data={dataCategory}
                            handleOnChange={handleChangeFilterQuestion}
                            defaultValue={filterListQuesion.cateId || ''}
                            name='cate'
                        />
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box style={{ width: '90%' }}>
                        <SelectFieldCustom
                            title="Loại câu hỏi"
                            data={dataQuestionType}
                            handleOnChange={handleChangeFilterQuestion}
                            defaultValue={filterListQuesion.typeId || ''}
                            name='type'
                        />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default HeaderSearch;
