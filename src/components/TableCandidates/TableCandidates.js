import React, { useEffect, useState } from 'react';
import { setGlobal, useGlobal } from 'reactn';

import { Icon, Table } from 'semantic-ui-react';

//import styles from './styles';

const TableCandidates = ({ data }) => {
  const [candidates, setCandidates] = useGlobal('candidates');
  const [items, setItems] = useState([]);
  //const [selectedItem, setSelectedItem] = useGlobal();

  useEffect(() => {
    console.log('candidates', candidates);
  }, [candidates]);

  return (
    <>
      <TableStruct data={candidates} />
    </>
  );
};

/**
fullName: "GIOVAN DAMO"
id: 220001187738
name: "GIO DAMO"
number: 19
totalTeam
percentualTeam: 76.86
position: 11
team: "JUNTOS PODEMOS MAIS"
totalReceived: 117101
 */

const TableStruct = ({ data }) => {
  const color = 'green';
  return (
    <Table celled color={color} key={color} inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Número</Table.HeaderCell>
          <Table.HeaderCell>Nome</Table.HeaderCell>
          <Table.HeaderCell>Nome completo</Table.HeaderCell>
          <Table.HeaderCell>Partido</Table.HeaderCell>
          <Table.HeaderCell>Dinheiro de campanha total</Table.HeaderCell>
          <Table.HeaderCell>Valor proveniente de fundo partidário</Table.HeaderCell>
          <Table.HeaderCell>Percentual de fundo partidário</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item) => {
          const fullName = item.fullName;
          const name = item.name;
          const number = item.number;
          const team = item.team;
          const totalReceived = `R$ ${item.totalReceived}`;
          const totalTeam = `R$ ${item.totalTeam}`;
          const percentualTeam = `${item.percentualTeam}%`;

          const positiveRow = item.totalTeam === 0 ? true : false;
          const negativeRow = item.totalTeam > 0 ? true : false;
          return (
            <Table.Row positive={positiveRow} negative={negativeRow}>
              <Table.Cell>{number}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{fullName}</Table.Cell>
              <Table.Cell>{team}</Table.Cell>
              <Table.Cell>{totalReceived}</Table.Cell>
              <Table.Cell>
                {positiveRow ? <Icon name="checkmark" /> : null}
                {negativeRow ? <Icon name="close" /> : null}
                {totalTeam}
              </Table.Cell>
              <Table.Cell>
                {positiveRow ? <Icon name="checkmark" /> : null}
                {negativeRow ? <Icon name="close" /> : null}
                {percentualTeam}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TableCandidates;
