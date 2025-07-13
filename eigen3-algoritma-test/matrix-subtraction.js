function diagonalDifference(matrix) {
  const n = matrix.length;
  let primary = 0;
  let secondary = 0;

  for (let i = 0; i < n; i++) {
    primary += matrix[i][i];
    secondary += matrix[i][n - 1 - i];
  }

  return Math.abs(primary - secondary);
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(diagonalDifference(matrix));
