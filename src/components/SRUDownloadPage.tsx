import React, { ReactElement, useContext } from 'react';
import { TradeType } from '../types/trade';
import { TradesContext } from '../contexts/TradesContext';
import { SRUFile } from '../sru/sru-file';
import { Box, Button, TextField } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//     root: {

//     },
//     form: {
//         margin: theme.spacing(0, 2, 0, 2),
//     },
//     data: {
//         height: 400
//     }
//   }));

const SRUDownload = (): ReactElement => {
    // const classes = useStyles();
    const ctx = useContext(TradesContext);
    const [formData, setFormData] = React.useState({
        name: '',
        surname: '',
        id: '',
        code: '',
        city: '',
        mail: '',
    });

    const handleFormChange = (e: any): void => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = () => {
        console.log(formData);

        if (ctx?.conversionRates && ctx?.filteredTrades) {
            const sruFiles = new SRUFile(ctx.conversionRates, ctx.filteredTrades, {
                name: 'X',
                surname: 'X',
                id: '123',
                code: '123',
                city: 'X',
                mail: 'email',
            });
        }
    };

    return (
        <>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <form noValidate autoComplete="off">
                    <div>
                        <TextField id="name" label="Name" onChange={handleFormChange} />
                    </div>
                    <div>
                        <TextField id="surname" label="Surname" onChange={handleFormChange} />
                    </div>
                    <div>
                        <TextField id="id" label="ID" onChange={handleFormChange} />
                    </div>
                    <div>
                        <TextField id="code" label="Area Code" onChange={handleFormChange} />
                    </div>
                    <div>
                        <TextField id="city" label="City" onChange={handleFormChange} />
                    </div>
                    <div>
                        <TextField id="mail" label="E-Mail" onChange={handleFormChange} />
                    </div>
                    <div>
                        <Button className="buttonChoose" variant="contained" component="span" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
                <Box>
                    Fill in personal data and download zip file. Rename each blanketter1.sru, blanketter2.sru, etc. to
                    blanketter.sru and transfer with info.sru
                </Box>
            </Box>
            <Box display="flex" flexDirection="row">
                Datagrid with statements: 0
            </Box>
        </>
    );
};

export default SRUDownload;
