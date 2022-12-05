import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type Props = {
    onMeasureSystemChange: (measureSystem: string) => void,
}

export default function MeasureSystemSelect(props: Props) {
    const [system, setSystem] = React.useState('metric');

    const handleChange = (event: SelectChangeEvent) => {
        let lang = event.target.value as string;
        setSystem(lang);
        props.onMeasureSystemChange(lang);
    };

    return (
        <Box sx={{minWidth: 120}}>
    <FormControl >
    <InputLabel id="demo-simple-select-label">Measure System</InputLabel>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={system}
    label="System"
    onChange={handleChange}>

    <MenuItem value={'metric'}>Metric</MenuItem>
        <MenuItem value={'imperial'}>Imperial</MenuItem>
        </Select>
        </FormControl>
        </Box>
);
}
