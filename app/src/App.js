import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaRobot, FaCheck, FaTimes } from "react-icons/fa";

// Import the WASM module
import init, { run_fibonacci_example } from "./pkg/stwo_wasm_demo";

function App() {
  const [logSize, setLogSize] = useState(5);
  const [claim, setClaim] = useState(443693538);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const toast = useToast();

  useEffect(() => {
    init()
      .then(() => setIsInitialized(true))
      .catch((error) => {
        console.error("Failed to initialize WASM module:", error);
        toast({
          title: "Initialization Error",
          description:
            "Failed to load the WASM module. Please refresh the page.",
          status: "error",
          duration: null,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleSubmit = async () => {
    if (!isInitialized) {
      toast({
        title: "Not Ready",
        description: "The WASM module is not initialized yet. Please wait.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = run_fibonacci_example(logSize, claim);
      setResult(res);
      if (res.success) {
        setScore((prevScore) => prevScore + 1);
        toast({
          title: "Proof Verified!",
          description: "You've earned a point!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Try again!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl" p={5}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl">
            STWO Fibonacci Arcade
          </Heading>
          <Text>Score: {score}</Text>
          <Box>
            <Input
              placeholder="Log Size"
              value={logSize}
              onChange={(e) => setLogSize(Number(e.target.value))}
              mb={3}
            />
            <Input
              placeholder="Claim"
              value={claim}
              onChange={(e) => setClaim(Number(e.target.value))}
              mb={3}
            />
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              colorScheme="blue"
              leftIcon={<FaRobot />}
            >
              Generate & Verify Proof
            </Button>
          </Box>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box borderWidth={1} borderRadius="lg" p={4}>
                <Text fontWeight="bold">
                  {result.success ? (
                    <>
                      <FaCheck color="green" /> Success!
                    </>
                  ) : (
                    <>
                      <FaTimes color="red" /> Failure!
                    </>
                  )}
                </Text>
                <Text>{result.message}</Text>
              </Box>
            </motion.div>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
