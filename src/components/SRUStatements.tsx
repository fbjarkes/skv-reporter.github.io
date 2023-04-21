import React, { FC, useContext, useState } from 'react';
import { TradesContext } from '../contexts/TradesContext';
import { Box, Button, Grid, Paper, TextField, Theme, Typography, styled, useTheme } from '@mui/material';
import { StatementsTable } from './StatementsTable';
import { SRUFile } from '../sru/sru-file';
import makeStyles from '@mui/styles/makeStyles';

type PersonalInfoType = {
    id?: string;
    name?: string;
    surname?: string;
    mail?: string;
    code?: string;
    city?: string;
    taxYear?: number;
};

type PersonalInfoFormProps = {
    data: PersonalInfoType;
    onSubmit: (data: PersonalInfoType) => void;
    onCancel: () => void;
};

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#333',
    borderRadius: '0.5rem',
});

const TextFieldWrapper = styled('div')({
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
});

const PersonalInfoForm: FC<PersonalInfoFormProps> = (data: any) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const personalData: PersonalInfoType = {
            name: formData.get('name') as string,
            surname: formData.get('surname') as string,
            mail: formData.get('mail') as string,
            code: formData.get('code') as string,
            city: formData.get('city') as string,
            taxYear: parseInt(formData.get('taxYear') as string),
        };
        //onSubmit(personalData);
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <TextFieldWrapper>
                <TextField label="Name" name="name" sx={{ flexGrow: 1 }} />
                <TextField label="Surname" name="surname" sx={{ flexGrow: 1 }} />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <TextField label="Mail" name="mail" sx={{ flexGrow: 1 }} />
                <TextField label="Code" name="code" sx={{ flexGrow: 1 }} />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <TextField label="City" name="city" sx={{ flexGrow: 1 }} />
                <TextField label="Tax Year" name="taxYear" type="number" sx={{ flexGrow: 1 }} />
            </TextFieldWrapper>
            <Button variant="contained" type="submit" sx={{ margin: '1rem auto 0 auto', display: 'block' }}>
                Submit
            </Button>
        </FormContainer>
    );
};
// ====

// const PersonalInfoForm: React.FC = () => {
//     const { state } = useContext(TradesContext);
//     const [personalInfo, setPersonalInfo] = React.useState<PersonalInfoType>({});
//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setPersonalInfo({ ...personalInfo, [name]: value });
//     };

//     const generateZipFile = (): void => {
//         const trades = state.filteredTrades ?? [];
//         const rates: Map<string, Map<string, number>> = new Map();
//         console.log("DOWNLOAD zip", personalInfo);
//         // const zip = new JSZip();
//         // const sru = new SRUFile(rates, trades, info);
//         // zip.file('info.sru', info); // file content as string
//         // // TODO add each blanketter.sru file

//         // // Generate a Blob for the zip file and create a download link
//         // zip.generateAsync({ type: 'blob' }).then((zipBlob: any) => {
//         //     const downloadLink = document.createElement('a');
//         //     downloadLink.download = 'sru-statements.zip';
//         //     downloadLink.href = URL.createObjectURL(zipBlob);
//         //     downloadLink.click();
//         // });
// };

// return (
//     <div>
//     <TextField label="Name" name="name" onChange={handleInputChange} />
//     <TextField label="Surname" name="surname" onChange={handleInputChange} />
//     <TextField label="ID" name="id" onChange={handleInputChange} />
//     <TextField label="City" name="city" onChange={handleInputChange} />
//     <TextField label="Code" name="code" onChange={handleInputChange} type="number" />
//     <TextField label="Email" name="email" onChange={handleInputChange} />
//     <TextField label="Tax Year" name="taxYear" onChange={handleInputChange} type="number" />
//     <Button variant="contained" color="primary" onClick={generateZipFile}>
//         Download
//     </Button>
//     </div>
// );
// };

const SRUDownload: React.VFC = () => {
    const theme = useTheme();
    const { state } = useContext(TradesContext);

    return (
        <>
            <Grid>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Box>SRU Statements</Box>
                    <PersonalInfoForm />
                </Box>
            </Grid>
            <Grid item xs={12} style={{ margin: theme.spacing(2, 0, 5, 2) }}>
                <StatementsTable statements={state.statements ?? []}></StatementsTable>
            </Grid>
            <Grid item xs={12} style={{ margin: theme.spacing(2, 0, 3, 2) }}></Grid>
        </>
    );
};

export default SRUDownload;
