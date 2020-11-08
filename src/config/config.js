import { getGlobal } from 'reactn';

const ibgeDomain = 'https://servicodados.ibge.gov.br/api/v1';
const tseDomain = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1';

const fixedValueYear = '2030402020';

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
}

export default new URLConfig();
