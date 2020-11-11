export const mapStates = async (data) => {
  return await data.map((item) => {
    return {
      key: `${item.sigla}`,
      value: `${item.sigla}`,
      text: `${item.sigla} - ${item.nome}`,
      //nameAttr: `${item.nome}`,
      //flag: 'br',
      image: `https://divulgacandcontas.tse.jus.br/divulga/images/${item.sigla}.png`,
    };
  });
};

export const mapCities = async (data) => {
  return await data?.municipios.map((item) => {
    return {
      key: `${item.codigo}`,
      value: `${item.codigo}`,
      text: `${item.nome}`,
    };
  });
};
