import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';

import TableCandidates from '../TableCandidates';

import URLConfig from '../../config/config';
import { fetchData } from '../../services/data-provider';

//import styles from './styles';

const Candidates = ({ placeholder, selectGlobalItem, mapFunction = () => {} }) => {
  const [state] = useGlobal('selectedState');
  const [city] = useGlobal('selectedCity');
  const [positions, setPositions] = useGlobal('positions');
  const [candidates, setCandidates] = useGlobal('candidates');
  const [ready, setReady] = useGlobal('readyToLoadCandidates');
  //const [candidates, setCandidates] = useState([]);
  //const [loading, setLoading] = useState(false);
  //const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (city !== null) {
      loadPositions();
    }
  }, [city]);

  useEffect(() => {
    console.log('ready:', ready, 'city:', city, 'state:', state);
    if (ready) {
      console.log('get data!');
      getData();
    }
  }, [ready]);

  const loadPositions = async () => {
    const url = URLConfig.getPositions();
    if (url === null) return;
    const data = await fetchData(url);

    const mapped = [];
    for (const i in data?.cargos) {
      const item = data?.cargos[i];
      if (item.codigo !== 12) {
        mapped.push({
          id: item.codigo,
          name: item.nome,
        });
      }
    }
    setPositions(mapped);
    if (mapped.length > 0) {
      setReady(true);
    }
  };

  const loadCandidates = async () => {
    const urls = URLConfig.getCandidates();

    let candidatesData = [];
    for (const i in urls) {
      const url = urls[i];
      const data = await fetchData(url);
      //console.log(data);
      for (const x in data?.candidatos) {
        if (x > 2) {
          //break;
        }
        const candidate = data?.candidatos[x];
        const newCandidate = {
          id: candidate.id,
          position: candidate?.cargo?.codigo,
          number: candidate.numero,
          name: candidate.nomeUrna,
          fullName: candidate.nomeCompleto,
          team: candidate.nomeColigacao,
        };
        candidatesData.push(newCandidate);
      }
    }
    setCandidates(candidatesData);
    return candidatesData;
  };

  const loadCandidatesInfo = async (candidatesData) => {
    let candidate, url, data, i;

    for (i in candidatesData) {
      candidate = candidatesData[i];
      url = URLConfig.getCandidatePersonalInfo(candidate.id, candidate.number, candidate.position);
      data = await fetchData(url);
      candidate.totalReceived = data?.dadosConsolidados?.totalRecebido || 0;
      candidate.totalTeam = data?.dadosConsolidados?.totalPartidos || 0;
      candidate.percentualTeam = data?.dadosConsolidados?.percentualPartidos || 0;
      candidatesData[i] = candidate;
    }
    setCandidates(candidatesData);
    return candidatesData;
  };

  const getData = async () => {
    const basicData = await loadCandidates();
    // console.log('basicData', basicData);
    // console.log('candidates', candidates);
    const completeData = await loadCandidatesInfo(basicData);
    //console.log('completeData', completeData);
    setCandidates(completeData);
    //setLoading(false);
  };

  return (
    <>
      <TableCandidates />
    </>
  );
};

export default Candidates;
