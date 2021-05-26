// Simple file with random functions to test JSDoc generation within the pipeline.

/**
 * A silly logger function
 * @param {string} message
 * @return {void} Nothing
 */
function sillyLogger (message) {
  console.log(`Don't use in production ${message}`);
}

sillyLogger('test test');

/**
 * Raises a number to exponent
 * @param {number} value - The base to raise
 * @param {number} exponent - The exponent
 * @return {number} - The exponent power
 */
function poooow (value, exponent) {
  return value ** exponent;
}

poooow(3, 2);
