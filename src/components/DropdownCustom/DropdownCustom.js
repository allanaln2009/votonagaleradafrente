import React, { useEffect, useState } from 'react';
import { setGlobal, useGlobal } from 'reactn';

import { Dropdown } from 'semantic-ui-react';

import { fetchData } from '../../services/data-provider';

//import styles from './styles';

const DropdownCustom = ({ placeholder, urlLoadData, selectGlobalItem, mapFunction = () => {} }) => {
  const [error, setError] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useGlobal(selectGlobalItem);

  const getData = async () => {
    const data = await fetchData(urlLoadData);
    const mapped = mapFunction(data);

    setItems(mapped);
    setIsLoaded(true);
  };

  const handleChange = (e, { value }) => {
    setSelectedItem(value);
    setError(false);
  };

  useEffect(() => {
    getData();
  }, [urlLoadData]);

  return (
    <Dropdown
      placeholder={placeholder}
      fluid
      search
      selection
      onChange={handleChange}
      options={items}
      loading={!isLoaded}
      error={error}
    />
  );
};

export default DropdownCustom;
