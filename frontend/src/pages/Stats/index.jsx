import { PureComponent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatMoney } from '../../utils/functions';

import { useGetExpensesQuery, useDeleteExpenseMutation } from '../../redux/api/expensesApi'

const ndata = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const StyledPaper = styled(Paper)`
  width: 90%;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #white;

  @media (min-width: 768px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const StatsView = () => {

  const {
    data: rows,
    isLoading
  } = useGetExpensesQuery();

  if (isLoading) {
    return "Loading..."
  }


  const dataByGroup = Object.values(
    rows.reduce((acc, item) => {
      let nItem = {...item};
      if (nItem.group === null) {
        nItem.group = {name: "Other"}
      }

      acc[nItem.group.name] = acc[nItem.group.name]
      ? {name: nItem.group.name, price: nItem.price + acc[nItem.group.name].price }
      : nItem;
      return acc;

    }, {})
  ).sort((a, b) => b.price - a.price);

  const dataByTag = Object.values(
    rows.reduce((acc, item) => {
      let nItem = {...item};
      if (nItem.tags === null) {
        nItem.tags = []
      }
      
      nItem.tags.forEach(tag => {
        acc[tag.name] = acc[tag.name]
        ? {name: tag.name, price: nItem.price + acc[tag.name].price }
        : nItem;
      })
      return acc;

    }, {})
  ).sort((a, b) => b.price - a.price);
  console.log(dataByTag);
  return (
    <StyledPaper elevation={0}>
        <Typography>By Group</Typography>
        <BarChart width={1050} height={600} data={dataByGroup} layout="vertical">
          <Tooltip formatter={formatMoney}/>
          <XAxis type="number" orientation="top" stroke="#285A64" tickFormatter={formatMoney}/>
          <YAxis type="category" dataKey="name" axisLine={false} dx={-10} tickLine={false} style={{ fill: "#285A64" }} width={300}/>
          <Bar dataKey="price" fill="#780417" />
        </BarChart>
        <Typography>By Tag</Typography>
        <BarChart width={1050} height={600} data={dataByTag} layout="vertical">
          <Tooltip formatter={formatMoney}/>
          <XAxis type="number" orientation="top" stroke="#285A64" tickFormatter={formatMoney}/>
          <YAxis type="category" dataKey="name" axisLine={false} dx={-10} tickLine={false} style={{ fill: "#285A64" }} width={300}/>
          <Bar dataKey="price" fill="#780417" />
        </BarChart>
    </StyledPaper>
  );
};

export default StatsView;
