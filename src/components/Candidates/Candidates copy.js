import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';

import TableCandidates from '../TableCandidates';

import URLConfig from '../../config/config';
import { fetchData } from '../../services/data-provider';

//import styles from './styles';

const Candidates = ({ placeholder, selectGlobalItem, mapFunction = () => {} }) => {
  const [state] = useGlobal('selectedState');
  const [city] = useGlobal('selectedCity');
  const [positions, setPositions] = useGlobal('positions');
  //const [candidates, setCandidates] = useGlobal('candidates');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [positions, setPositions] = useState([]);

  useEffect(() => {
    console.log(' trying candidates', state, city);
    console.log(' positions', positions.length, positions, loading);
    if (state !== null && city !== null && positions.length > 0) {
      console.log(' getting candidates');
      setLoading(true);
      getData();
    }
  }, [state, city, positions]);

  useEffect(() => {
    const fetchPositions = async () => {
      const url = URLConfig.getPositions();
      const data = await fetchData(url);

      const mapped = [];
      await data?.cargos.forEach((item) => {
        if (item.codigo !== 12) {
          mapped.push({
            id: item.codigo,
            name: item.nome,
          });
        }
      });

      setPositions(mapped);
    };

    fetchPositions();
    console.log('pos useEffect', positions);
  }, []);

  const getData = async () => {
    console.log('Get data');
    //const filteredPositions = await getPositions();
    //setPositions(filteredPositions);
    const filteredCandData = await getCandidates();
    //setCandidates(filteredCandData);
    await getCandidatesInfo(filteredCandData);
    setLoading(false);
  };

  const loadPositions = async () => {
    const url = URLConfig.getPositions();
    const data = await fetchData(url);
    //console.log('pos: ', data);

    const mapped = [];
    await data?.cargos.forEach((item) => {
      if (item.codigo !== 12) {
        mapped.push({
          id: item.codigo,
          name: item.nome,
        });
      }
    });

    //console.log('pos: ', mapped);
    return mapped;
    setPositions(mapped);
    console.log('data setted positions', positions);
  };

  const getCandidates = async () => {
    const urls = URLConfig.getCandidates();

    const candidatesData = [];
    console.log(' ---- candidatesData 1: ', candidatesData.length);
    for (const i in urls) {
      let x = 0;
      const data = await fetchData(urls[i]);
      for (const item in data) {
        if (x > 2) {
          break;
        }
        const cand = {
          id: item.id,
          position: item?.cargo?.codigo,
          number: item.numero,
          name: item.nomeUrna,
          fullName: item.nomeCompleto,
          team: item.nomeColigacao,
        };
        candidatesData.push(cand);
        x++;
      }
    }
    console.log(' ---- candidatesData 2: ', candidatesData.length);
    /* url.forEach(async (item) => {
      let x = 0;
      const data = await fetchData(item);
      data?.candidatos.forEach((item) => {
        if (x > 2) {
          return;
        }
        const cand = {
          id: item.id,
          position: item?.cargo?.codigo,
          number: item.numero,
          name: item.nomeUrna,
          fullName: item.nomeCompleto,
          team: item.nomeColigacao,
        };
        candidatesData.push(cand);
        x++;
      });
    }); */

    //console.log(typeof candidatesData, candidatesData);
    return candidatesData;
    //console.log('data candidate getCandidates', candidatesData);
    //setCandidates(candidatesData);
    //console.log('data setted candidate getCandidates', candidates);
  };

  const getCandidatesInfo = async (data) => {
    //console.log('data candidate getCandidatesInfo', candidates);
    //console.log('::: getCandidatesInfo data', data);
    //console.log('::: getCandidatesInfo data length', data.length, typeof data);

    console.log('::::: ::: :: : getCandidatesInfo');
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      //console.log('test', element);
    }

    // const dataUpdated = data.map(async (item) => {
    //   console.log('passo 1');
    //   const url = URLConfig.getCandidatePersonalInfo(item.id, item.number, item.position);
    //   console.log('url candidate', url);
    //   const data = await fetchData(url);
    //   //console.log('data candidate', data);

    //   item.totalReceived = data?.dadosConsolidados?.totalRecebido || 0;
    //   item.totalTeam = data?.dadosConsolidados?.totalPartidos || 0;
    //   item.percentualTeam = data?.dadosConsolidados?.percentualPartidos || 0;

    //   return item;
    // });

    //console.log(':::: getCandidatesInfo data:', data);
    //console.log(':::: getCandidatesInfo dataUpdated:', dataUpdated);

    //setCandidates(candidates);
  };

  return (
    <>
      <TableCandidates data={candidates} />
    </>
  );
};

export default Candidates;
