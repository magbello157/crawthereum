import React, { useState } from 'react';
import {
  Box,
  Button,
  EthAddress,
  Field,
  Flex,
  Heading,
  Input,
  Text
} from 'rimble-ui';
import CrawthTable from './components/CrawthTable';
import axios from 'axios';
import './App.css';

const App = () => {
  const [wallet, setWallet] = useState('');
  const [queriedWallet, setQueriedWallet] = useState('');
  const [startBlock, setStartBlock] = useState(0);
  const [transactions, setTransactions] = useState([]);
  let lastTransactionHash = '';
  let nextStartBlock = 0;

  const apiKey = process.env.REACT_APP_API_KEY;

  const getTransactions = async (wallet, startBlock) => {
    try {
      const { data } = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=${startBlock}&endblock=latest&sort=asc&apikey=${apiKey}`
      );

      if (data.status === '1' && data.message === 'OK') {
        const lastTransactionIdx = data.result.length - 1;

        if (lastTransactionHash === data.result[lastTransactionIdx].hash) {
          alert('data fetch completed!');
          return;
        }

        setTransactions(transactions => [...transactions, ...data.result]);
        setQueriedWallet(wallet);
        lastTransactionHash = data.result[lastTransactionIdx].hash;
        nextStartBlock = data.result[lastTransactionIdx].blockNumber;

        getTransactions(wallet, nextStartBlock);
      } else if (data.status === '0' && data.message === 'No transactions') {
        alert('No transactions found from this block');
        throw data.result;
      } else {
        throw data.result;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box p={3} pt={0}>
      <Flex>
        <Box width={1} height={'10vh'} m={1}>
          <Heading as={'h1'}>Crawthereum</Heading>
          <Text>The Ethereum transactions crawler</Text>
        </Box>
      </Flex>
      <Flex pt={4}>
        <Box width={1} height={'10vh'} m={1}>
          <Field label="Showing transactions for...">
            <EthAddress address={queriedWallet} required />
          </Field>
        </Box>
        <Box width={1} height={'10vh'} m={1}>
          <Field label="Wallet Address">
            <Input
              type="text"
              required
              placeholder="e.g. 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f"
              mr={2}
              onChange={e => setWallet(e.target.value)}
            />
          </Field>
          <Field label="Start Block (default 0)">
            <Input
              type="number"
              required
              placeholder="e.g. 9000000"
              mr={1}
              onChange={e => setStartBlock(e.target.value)}
            />
          </Field>
          <Field label=" ">
            <Button
              required
              mt={1}
              onClick={() => getTransactions(wallet, startBlock)}
            >
              Get Transactions
            </Button>
          </Field>
        </Box>
      </Flex>

      <CrawthTable data={transactions} />
    </Box>
  );
};

export default App;
