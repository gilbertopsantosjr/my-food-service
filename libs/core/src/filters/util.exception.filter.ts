export function exceptionShortMessage(message: string): string {
  const shortMessage = message.substring(message.indexOf('→'))

  shortMessage.substring(shortMessage.indexOf('\n')).replace(/\n/g, '').trim()

  return shortMessage
    .replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ''
    )
    .replace(/(\r\n|\n|\r)/gm, '')
}
