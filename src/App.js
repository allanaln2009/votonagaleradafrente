import 'fomantic-ui-css/semantic.css';
import { Container, Header } from 'semantic-ui-react';

import React, { useEffect, useState } from 'react';
import { setGlobal, useGlobal } from 'reactn';

import DropdownCustom from './components/DropdownCustom';
import DropdownCities from './components/DropdownCities';
import Candidates from './components/Candidates';

import { mapStates } from './lib/mappers';
import URLConfig from './config/config';

function App() {
  setGlobal({
    selectedState: null,
    selectedCity: null,
    positions: [],
    candidates: [],
    readyToLoadCandidates: false,
  });

  return (
    <Container>
      <Header>Consulta candidato e uso de fundo partidário</Header>
      <DropdownCustom
        placeholder="Selecione seu estado"
        mapFunction={mapStates}
        urlLoadData={URLConfig.getStates()}
        selectGlobalItem="selectedState"
      />
      <DropdownCities />
      <Candidates />
      <Comp />
    </Container>
  );
}

const Comp = () => {
  const [state, setState] = useGlobal('selectedState');
  const [city, setCity] = useGlobal('selectedCity');
  const [positions, setPositions] = useGlobal('positions');
  const [candidates, setCandidates] = useGlobal('candidates');
  const [ready, setReady] = useGlobal('readyToLoadCandidates');

  /* useEffect(() => {
    console.log();
  }, [positions]); */

  useEffect(() => {
    console.log('state:', state, 'city:', city, 'ready:', ready);
    setCity(null);
    setReady(false);
  }, [state]);

  useEffect(() => {
    console.log('city:', city, 'state:', state, 'ready:', ready);
    if (city === null) {
      setReady(false);
    }
    setCandidates([]);
  }, [city]);

  useEffect(() => {
    console.log('candidates:', candidates, 'ready:', ready);
  }, [candidates]);

  return <></>;
};

export default App;
