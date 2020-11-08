export const mapStates = (data) => {
  return data.map((item) => {
    return {
      key: `${item.sigla}`,
      value: `${item.sigla}`,
      text: `${item.sigla} - ${item.nome}`,
      //flag: 'br',
      image: `https://divulgacandcontas.tse.jus.br/divulga/images/${item.sigla}.png`,
    };
  });
};

export const mapCities = (data) => {
  return data?.municipios.map((item) => {
    return {
      key: `${item.codigo}`,
      value: `${item.codigo}`,
      text: `${item.nome}`,
    };
  });
};
