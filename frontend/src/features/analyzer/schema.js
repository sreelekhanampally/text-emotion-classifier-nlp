import { z } from 'zod'
import { TEXTAREA_LIMIT, TEXTAREA_MIN } from '../../constants/config'

export const analyzeSchema = z.object({
  text: z
    .string()
    .trim()
    .min(TEXTAREA_MIN, `Please write at least ${TEXTAREA_MIN} characters.`)
    .max(TEXTAREA_LIMIT, `Text must be under ${TEXTAREA_LIMIT} characters.`),
})
