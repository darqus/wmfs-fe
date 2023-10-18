const PWD_MAP = {
  MIN: 6,
  MAX: 20,
  SPC: '!@#$%^&*',
}

const MESSAGES = {
  required: 'Обязательно для заполнения',
  limitInput: 'Превышен лимит данного поля',
  email: 'Формат username@domain.zone',
  password: `[${PWD_MAP.MIN}÷${PWD_MAP.MAX}] символов, цифра, заглавная и строчная буква и символ ${PWD_MAP.SPC}`,
}

const REGEXP = {
  required: /^.{0,255}$/,
  email: /^[\w\-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${PWD_MAP.SPC}])[A-Za-z\\d${PWD_MAP.SPC}]{${PWD_MAP.MIN},${PWD_MAP.MAX}}$`
  ),
}

export default {
  required: [
    (v: string) => v !== '' || MESSAGES.required,
    (v: string) => REGEXP.required.test(v) || MESSAGES.limitInput,
  ],
  email: [
    (v: string) => REGEXP.email.test(v) || MESSAGES.email,
  ],
  password: [
    (v: string) => REGEXP.password.test(v) || MESSAGES.password,
  ],
}
