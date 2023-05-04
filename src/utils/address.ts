export const truncateAddress = (addr: string) => {
  if (addr.length < 10) return ''

  const [first, last] = addr.match(/^(.{6})|(.{4}$)/g)
  return `${first}...${last}`
}
