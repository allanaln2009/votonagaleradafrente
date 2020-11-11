import { getGlobal } from 'reactn';

const ibgeDomain = 'https://servicodados.ibge.gov.br/api/v1';
const tseDomain = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1';

const fixedValueYear = '2030402020';
const fixedYear = 2020;

const urls = {
  getStates: `${ibgeDomain}/localidades/estados`,
};

class URLConfig {
  constructor() {
    if (URLConfig.instance) {
      return URLConfig.instance;
    }

    URLConfig.instance = this;
  }

  getStates() {
    return `${ibgeDomain}/localidades/estados`;
  }

  getCities() {
    const selectedState = getGlobal().selectedState;
    if (selectedState !== null) {
      return `${tseDomain}/eleicao/buscar/${selectedState}/${fixedValueYear}/municipios`;
    }
    return null;
  }

  getPositions() {
    const selectedCity = getGlobal().selectedCity;
    if (selectedCity !== null) {
      return `${tseDomain}/eleicao/listar/municipios/${fixedValueYear}/${selectedCity}/cargos`;
    }
    return null;
  }

  getCandidates() {
    const positions = getGlobal().positions;
    const selectedCity = getGlobal().selectedCity;

    if (positions.length > 0 && selectedCity !== null) {
      const urls = positions.map((item) => {
        return `${tseDomain}/candidatura/listar/${fixedYear}/${selectedCity}/${fixedValueYear}/${item.id}/candidatos`;
      });
      return urls;
    }
    return [];
  }

  getCandidatePersonalInfo(candidateId, candidateNr, positionId) {
    const selectedCity = getGlobal().selectedCity;
    if (candidateId && selectedCity !== null) {
      return `${tseDomain}/prestador/consulta/${fixedValueYear}/${fixedYear}/${selectedCity}/${positionId}/${candidateNr}/${candidateNr}/${candidateId}`;
    }
    return null;
  }

  getCandidateInfo(candidateId) {
    const selectedCity = getGlobal().selectedCity;
    if (candidateId && selectedCity !== null) {
      return `${tseDomain}/candidatura/buscar/${fixedYear}/${selectedCity}/${fixedValueYear}/candidato/${candidateId}`;
    }
    return null;
  }
}

export default new URLConfig();
