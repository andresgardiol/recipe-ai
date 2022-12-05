import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type Props = {
    onLanguageChange: (measureSystem: string) => void,
}

export default function LanguageMenu(props: Props) {
    const [lang, setLang] = React.useState('english');

    const handleChange = (event: SelectChangeEvent) => {
        let lang = event.target.value as string;
        setLang(lang);
        props.onLanguageChange(lang);
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lang}
                    label="Language"
                    onChange={handleChange}>

                    <MenuItem value={'english'}>English</MenuItem>
                    <MenuItem value={'spanish'}>Spanish</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
