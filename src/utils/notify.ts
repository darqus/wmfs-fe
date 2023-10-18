import { Notify, } from 'quasar'

/**
 * Creates an error message notification with the specified message and color.
 *
 * @param message - The error message to display.
 * @param color - The color of the error message. Defaults to 'red'.
 *
 * @returns The created error message notification.
 */
export const createErrorMessage = (message: string, color: string = 'red', group: boolean = true) => {
  Notify.create({
    message,
    color,
    group,
  })
}
