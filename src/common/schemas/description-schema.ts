import { z } from 'zod'

import { LocaleType } from '@/src/locales/en'

export function descriptionSchema(t: LocaleType) {
  return z.object({
    description: z.string().max(500, t.profile.descriptionError.error),
  })
}

export type DescriptionFormType = {
  description: string
}
