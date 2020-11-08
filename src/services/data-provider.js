const fetchData = async (url) => {
  const response = await fetch(url);
  let json;

  if (response.ok) {
    json = await response.json();
  }

  //console.log('json', json);
  return json;
};

export { fetchData };
