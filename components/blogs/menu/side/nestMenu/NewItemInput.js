import {useState} from 'react';
import {makeStyles ,FormControl, InputLabel ,Input, InputAdornment, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
const propTypes = {}
const defaultProps = {
    value:'',
    onChange:(e)=>{
    },
    onSubmit:()=>{console.log('submit..')},
    onCancel:()=>{console.log('cancel')},
    error:false,
    helperText:"",
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


const NewItemInput = ({ children,offset,value:val,error, message,
        onChange,onSubmit,onCancel , ...props }) => {
       
            
    const [value, setValue] =useState(val) 
    const { root } = useStyles(offset);       
    const onInputChange= (e)=>{
        onChange&&onChange(e, e.target.value);
       setValue(e.target.value);
    }
    return (
        <FormControl className={root}  autoComplete="off" >
            {
               message &&<InputLabel  className={root} shrink htmlFor="NewItem-Input">
                              {message}
                          </InputLabel>
            }
            <Input id="NewItem-Input" value={value} type='text'   error={error}
                 onChange={onInputChange}
                 autoComplete="off" 
                 placeholder=" 입력해주세요 "
                 inputProps={{
                    'aria-label': 'weight',
                  }}
       
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton size='small' color='primary'
                            onClick={(e)=>onSubmit(e,value)}
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