//import './App.css';

import 'fomantic-ui-css/semantic.css';
import { Container, Header } from 'semantic-ui-react';

import React, { useEffect, useState } from 'react';
import { setGlobal, useGlobal } from 'reactn';
//import { Dropdown } from 'semantic-ui-react';

import DropdownCustom from './components/DropdownCustom';
import DropdownCities from './components/DropdownCities';

import { mapStates } from './lib/mappers';
import URLConfig from './config/config';

/* const fetchData = async (url) => {
  const response = await fetch(url);
  let json;

  if (response.ok) {
    json = await response.json();
  }

  //console.log('json', json);
  return json;
}; */

/* const DropdownStates = () => {
  const [error, setError] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedState, setSelectedState] = useGlobal('selectedState');

  const getStates = async () => {
    const data = await fetchData(urls.getStates);

    const mapped = data.map((item) => {
      return {
        key: `${item.sigla}`,
        value: `${item.sigla}`,
        text: `${item.sigla} - ${item.nome}`,
        //flag: 'br',
        image: `https://divulgacandcontas.tse.jus.br/divulga/images/${item.sigla}.png`,
      };
    });

    setItems(mapped);
    setIsLoaded(true);
  };

  const handleChange = (e, { value }) => {
    setSelectedState(value);
    setError(false);
  };

  useEffect(() => {
    getStates();
  }, []);

  return (
    <Dropdown
      placeholder="Selecione seu estado"
      fluid
      search
      selection
      onChange={handleChange}
      options={items}
      loading={!isLoaded}
      error={error}
    />
  );
}; */

function App() {
  setGlobal({
    selectedState: null,
    selectedCity: null,
  });

  return (
    <Container>
      <Header>Consulta candidato e uso de fundo partidário</Header>
      {/* <DropdownStates /> */}
      <DropdownCustom
        placeholder="Selecione seu estado"
        mapFunction={mapStates}
        urlLoadData={URLConfig.getStates()}
        selectGlobalItem="selectedState"
      />
      {/* <DropdownCities placeholder="Selecione sua cidade" urlLoadData selectGlobalItem="selectedCity" /> */}
      <DropdownCities />
    </Container>
  );
}

export default App;
