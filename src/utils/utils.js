export function getRandomItems(list, numItems) {
  const shuffled = list.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numItems)
}
