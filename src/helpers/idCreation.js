export default function getId(arr, isSorted) {
  const copy = isSorted ? [...arr].sort((a, b) => a.id - b.id) : arr;
  let max = 0;

  for (let i = max; i < copy.length; i += 1) {
    if (i + 1 !== copy[i].id) {
      max += 1;
    }
  }

  return max;
}
