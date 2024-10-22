use stwo_prover::core::fields::m31::BaseField;
use stwo_prover::examples::fibonacci::Fibonacci;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct FibonacciResult {
    success: bool,
    message: String,
}

#[wasm_bindgen]
impl FibonacciResult {
    #[wasm_bindgen(getter)]
    pub fn success(&self) -> bool {
        self.success
    }

    #[wasm_bindgen(getter)]
    pub fn message(&self) -> String {
        self.message.clone()
    }
}

#[wasm_bindgen]
pub fn run_fibonacci_example(log_size: u32, claim: u32) -> FibonacciResult {
    let fib = Fibonacci::new(log_size, BaseField::from(claim));

    match fib.prove() {
        Ok(proof) => match fib.verify(proof) {
            Ok(_) => FibonacciResult {
                success: true,
                message: "Proof generated and verified successfully".to_string(),
            },
            Err(e) => FibonacciResult {
                success: false,
                message: format!("Proof verification failed: {:?}", e),
            },
        },
        Err(e) => FibonacciResult {
            success: false,
            message: format!("Proof generation failed: {:?}", e),
        },
    }
}
