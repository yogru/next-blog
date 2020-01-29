import {useState} from 'react';
import {makeStyles ,FormControl, Input, InputAdornment, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
const propTypes = {}
const defaultProps = {
    value:'test',
    onChange:(e)=>{
    },
    onSubmit:()=>{console.log('submit..')},
    onCancel:()=>{console.log('cancel')}
}

const useStyles = makeStyles(theme => ({
    root: offset => {
        offset = offset || 0.5;
        return {
            paddingLeft: `${offset+1}rem`,
            maxWidth: 240,
        }
    }
}));



const NewItemInput = ({ children,offset,value:val,onChange,onSubmit,onCancel , ...props }) => {
    //className={clsx(classes.margin, classes.textField)
    const [value, setValue] =useState(val) 
    const {root} = useStyles(offset);       
    const onInputChange= (e)=>{
        onChange&&onChange(e, e.target.value);
       setValue(e.target.value);
    }
    return (
        <FormControl className={root} >
            <Input id="NewItem-Input" value={value} type='text'
                 onChange={onInputChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton size='small' color='primary'
                            onClick={onSubmit}
                        >
                            <CheckIcon />
                        </IconButton>
                        <IconButton size='small' color='secondary'
                            onClick={onCancel}
                        >
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

NewItemInput.propTypes = propTypes
NewItemInput.defaultProps = defaultProps;
export default NewItemInput;