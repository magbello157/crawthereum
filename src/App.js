import {
  Box,
  Button,
  EthAddress,
  Field,
  Flex,
  Heading,
  Input,
  Table,
  Text
} from 'rimble-ui';
import './App.css';

function App() {
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
            <EthAddress
              address='0x9505C8Fc1aD98b0aC651b91245d02D055fEc8E49'
              required
            />
          </Field>
        </Box>
        <Box width={1} height={'10vh'} m={1}>
          <Field label='Wallet Address'>
            <Input
              type='text'
              required
              placeholder='e.g. 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f'
              mr={2}
            />
          </Field>
          <Field label='Start Block'>
            <Input type='number' required placeholder='e.g. 9000000' />
          </Field>
          <Button>Get Transactions</Button>
        </Box>
      </Flex>

      <Box width={1} height={'75vh'} m={1}>
        <Table>
          <thead>
            <tr>
              <th>Transaction hash</th>
              <th>Value</th>
              <th>Recipient</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0xeb...cc0</td>
              <td>0.10 ETH</td>
              <td>0x4fe...581</td>
              <td>March 28 2019 08:47:17 AM +UTC</td>
            </tr>
            <tr>
              <td>0xsb...230</td>
              <td>0.11 ETH</td>
              <td>0x4gj...1e1</td>
              <td>March 28 2019 08:52:17 AM +UTC</td>
            </tr>
            <tr>
              <td>0xed...c40</td>
              <td>0.12 ETH</td>
              <td>0x3fd...781</td>
              <td>March 28 2019 08:55:17 AM +UTC</td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default App;
