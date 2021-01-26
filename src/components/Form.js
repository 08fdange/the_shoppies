import React from 'react';
import { FormControl, TextField, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    input: {
        color: '#fff'
    }
}))

const Form = (props) => {
    const classes = useStyles();
    return(
    <div width='400px'>
        <FormControl>
            <ButtonGroup>
                <TextField
                    className={classes.textField}
                    label="Search Movies"
                    style={{ margin: 8 }}
                    placeholder="Search By Title"
                    margin="normal"
                    variant='outlined'
                    InputProps={{
                        className: classes.input
                    }}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    defaultValue={props.query}
                    onChange={props.handleChange()}
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={props.handleClick}
                >
                    <SearchIcon />
                </Button>
            </ButtonGroup>
        </FormControl>
    </div>)
}

export default Form;