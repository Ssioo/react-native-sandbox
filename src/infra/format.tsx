export const formatTs = (milliseconds: number) => {
  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))
  const hourString = hours < 10 ? '0' + hours : hours
  const minuteString = minutes < 10 ? '0' + minutes : minutes
  const secondString = seconds < 10 ? '0' + seconds : seconds
  if (isNaN(hours)) return 'N'
  return `${hourString}:${minuteString}:${secondString}`
}

export const formatStringOrError = (content: string | Error) => {
  return content instanceof Error
    ? `[${content.name}] ${content.message}`
    : content
}
