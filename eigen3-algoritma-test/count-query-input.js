const countQueryInput = (input, query) => {
  return query.map((q) => input.filter((i) => i === q).length);
};

INPUT = ["xc", "dz", "bbb", "dz"];
QUERY = ["bbb", "ac", "dz"];

console.log(countQueryInput(INPUT, QUERY));
