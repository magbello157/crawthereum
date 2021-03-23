import React, { useState } from 'react';
import {
  Box,
  Button,
  EthAddress,
  Field,
  Flex,
  Heading,
  Input,
  Text,
  Loader,
  ToastMessage
} from 'rimble-ui';
import CrawthTable from './components/CrawthTable';
import axios from 'axios';
import './App.css';

const App = () => {
  const [wallet, setWallet] = useState('');
  const [queriedWallet, setQueriedWallet] = useState('');
  const [startBlock, setStartBlock] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const apiKey = '9YCZZ8A9RH2DBSQP9VEPRHIBJCR1R3BRR7';

  const getTransactions = async (wallet, startBlock) => {
    try {
      setLoading(true);
      setErrorMsg('');
      setQueriedWallet('');
      setTransactions([]);
      const { data } = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=${startBlock}&endblock=99999999&sort=asc&apikey=${apiKey}`
      );
      if (data.status === '1') {
        setTransactions(data.result);
        setQueriedWallet(wallet);
      } else {
        throw data.result;
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setErrorMsg(e);
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
          <Field label='Showing transactions for...'>
            <EthAddress address={queriedWallet} required />
          </Field>
        </Box>
        <Box width={1} height={'10vh'} m={1}>
          <Field label='Wallet Address'>
            <Input
              type='text'
              required
              placeholder='e.g. 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f'
              mr={2}
              onChange={e => setWallet(e.target.value)}
            />
          </Field>
          <Field label='Start Block (default 0)'>
            <Input
              type='number'
              required
              placeholder='e.g. 9000000'
              mr={1}
              onChange={e => setStartBlock(e.target.value)}
            />
          </Field>
          <Field label=' '>
            <Button
              required
              mt={1}
              disabled={!wallet || loading}
              onClick={() => getTransactions(wallet, startBlock)}
            >
              Get Transactions
            </Button>
          </Field>
        </Box>
      </Flex>

      <Box width={1} height={'75vh'} m={1}>
        {errorMsg ? (
          <ToastMessage.Failure
            my={3}
            message={errorMsg}
            secondaryMessage={'Please provide a valid wallet address'}
          />
        ) : null}
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '250px'
            }}
          >
            <Loader size='80px' />
          </div>
        ) : (
          <CrawthTable data={transactions} />
        )}
      </Box>
    </Box>
  );
};

export default App;
