import React, { useEffect, useState } from 'react';
import { setGlobal, useGlobal } from 'reactn';

import { Dropdown } from 'semantic-ui-react';
import DropdownCustom from '../DropdownCustom';

import URLConfig from '../../config/config';
import { mapCities } from '../../lib/mappers';

//import styles from './styles';

const DropdownCities = ({ placeholder, selectGlobalItem, mapFunction = () => {} }) => {
  const [error, setError] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedState, setSelectedState] = useGlobal('selectedState');
  const [urlLoadCities, setUrlLoadCities] = useState('');

  useEffect(() => {
    console.log('ok ok men - cities', selectedState);
    setUrlLoadCities(URLConfig.getCities());
  }, [selectedState]);

  return (
    <DropdownCustom
      placeholder="Selecione sua cidade"
      mapFunction={mapCities}
      urlLoadData={urlLoadCities}
      selectGlobalItem="selectedCity"
    />
  );
};

export default DropdownCities;
