//const express = require('express');

/*
obter lista de estados
https://servicodados.ibge.gov.br/api/v1/localidades/estados

obter lista de cidades
// https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/subdistritos
https://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/buscar/{UF}/2030402020/municipios
pegar unidadeEleitoral.codigo

cargos
https://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/listar/municipios/{unidadeEleitoral}/61727/cargos
cargo:
13 -> vereador
11 -> prefeito

https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2020/{unidadeEleitoral}/2030402020/13/candidatos


candidateId => candidatos[].id
candidateNr => candidatos[].numero
eleicaoCode => eleicao.id

https://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/2030402020/2020/{unidadeEleitoral}/{cargoId}/55/55/{candidateId}

*/

const request = require('request');
const fetch = require('node-fetch');
const https = require('https');
const http = require('http');

const ibgeDomain = 'https://servicodados.ibge.gov.br/api/v1';
const tseDomain = 'https://divulgacandcontas.tse.jus.br/divulga/rest/v1';

const currentElectionYear = 2020;

const fetchData = async (url) => {
  /*   await request(url, {}, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    return res;
    console.log(body.url);
    console.log(body.explanation);
  }); */
};

const getStates = () => {
  `${ibgeDomain}/localidades/estados`;
};

//`${tseDomain}/prestador/consulta/2030402020/${currentElectionYear}/${unidadeEleitoral}/${cargoId}/${candidateNr}/${candidateNr}/${candidateId}`

const main = async () => {
  const states = await fetchData(`${ibgeDomain}/localidades/estados`);
  console.log('states', states);
};

const urlTest = `${ibgeDomain}/localidades/estados`;
//main();

(async () => {
  try {
    const response = await fetch(urlTest);
    console.log('response1:', response);
    const json = await response.json();

    console.log(json.url);
    console.log(json.explanation);
  } catch (error) {
    console.log(error.response.body);
  }
})();

https
  .get(urlTest, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log('response2:', JSON.parse(data).explanation);
    });
  })
  .on('error', (err) => {
    console.log('Error: ' + err.message);
  });

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  })
  .listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
