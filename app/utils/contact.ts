// Sales and support contact. The site is static, so "contact" is an e-mail link with the subject and
// a short script already filled in.
export const contactEmail = 'suporte.gestoclin@gmail.com'

const subject = 'Quero conhecer o GestoClin'
const body = [
  'Olá! Tenho interesse no GestoClin.',
  '',
  'Nome da clínica:',
  'Cidade:',
  'Quantos profissionais atendem:',
  'Telefone ou WhatsApp para retorno:',
].join('\n')

export const contactMailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
