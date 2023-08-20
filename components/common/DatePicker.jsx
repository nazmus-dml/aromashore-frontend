import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MuixDatePicker({ inputFormat = 'MM/dd/yyyy', manualEntry = false, maxDate = '', minDate = '', value, setValue, label = 'Date Picker' }) {

    const onKeyDownHandler = (e) => {
        if (!manualEntry) {
            e.preventDefault();
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                inputFormat={inputFormat}
                label={label}
                value={value}
                maxDate={maxDate}
                minDate={minDate}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField fullWidth variant='filled' onKeyDown={onKeyDownHandler} {...params} />}
            />
        </LocalizationProvider>
    );
}
