import React from 'react';
import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react';
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = ({ value, onChange }) => {
  return (
    <CInputGroup className="mb-3">
      <CInputGroupText>
      <SearchIcon/>
    
      </CInputGroupText>
      <CFormInput
        placeholder="Search"
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </CInputGroup>
  );
};

export default SearchBar;
