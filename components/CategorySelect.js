import { useState } from 'react';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
   onChange: PropTypes.func,
   list: PropTypes.array.isRequired,
}
const defaultProps = {}

const CategorySelect = ({ children, list, ...props }) => {
   const [menu, setMenu] = useState('None');
   const MenuItems = createMenuItem(list);
   function onChange(e) {
      props.onChange&&props.onChange(e, e.target.value.split(','))
      setMenu(e.target.value);
      e.stopPropagation();
   }
   return (
      <Con>
         <FormCon >
            <InputLabel id="SLABEL">카테고리</InputLabel>
            <Select
               labelId="SLABEL"
               id="SEL_"
               value={menu}
               onChange={onChange}
            >
               <MenuItem value='None'> <em>None</em></MenuItem>
               {MenuItems}
            </Select>
         </FormCon>
      </Con>
   );
}

CategorySelect.propTypes = propTypes
CategorySelect.defaultProps = defaultProps;
export default CategorySelect;

const FormCon = styled(FormControl)`
        width:12rem;
      `
const Con = styled.div`
        margin-bottom:1.5rem;
      `

function createMenuItem(list, parent = [], cursor = [], depth = 0) {
   if (list.length <= 0) return cursor;
   const vacant = Array(depth).fill(true).reduce((acc) => acc += '  ', '')
   const parentString = parent.reduce((acc, item) => acc += `${item},`, '');

   for (let obj of list) {
      const { subCategory, category } = obj;
      cursor.push(
         <MenuItem key={`${parentString}${category}`}
            value={`${parentString}${category}`}>{vacant.replace(/ /g, "\u00a0")}{category}</MenuItem>
      )
      createMenuItem(subCategory, [...parent, category], cursor, depth + 1);
   }
   return cursor;
}