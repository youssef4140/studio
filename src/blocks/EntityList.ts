import type { Block } from 'payload'

import { blockStyles } from '@/fields/blockStyles'

// allowedIn: layout
// Iterates an array field on the bound entity (see §4 layout model). The set of
// selectable fields grows in step 12 when entities land; for now: symptoms | treatments.
export const EntityList: Block = {
  slug: 'entityList',
  interfaceName: 'EntityListBlock',
  labels: {
    singular: 'Entity List',
    plural: 'Entity Lists',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'field',
      type: 'select',
      required: true,
      defaultValue: 'symptoms',
      options: [
        { label: 'Symptoms', value: 'symptoms' },
        { label: 'Treatments', value: 'treatments' },
      ],
      admin: {
        description: 'Which array field on the bound entity to iterate.',
      },
    },
    {
      name: 'style',
      type: 'select',
      required: true,
      defaultValue: 'bullets',
      options: [
        { label: 'Bullets', value: 'bullets' },
        { label: 'Cards', value: 'cards' },
      ],
    },
    ...blockStyles,
  ],
}
