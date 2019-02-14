/**
 * @ref: https://json-schema.org/learn/miscellaneous-examples.html
 */

const genPerson = () => {
  return {
    $id: 'https://example.com/person.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Person',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        description: "The person's first name."
      },
      lastName: {
        type: 'string',
        description: "The person's last name."
      },
      age: {
        description:
          'Age in years which must be equal to or greater than zero.',
        type: 'integer',
        minimum: 0
      }
    }
  }
}

genPerson()

const genLatLon = () => {
  return {
    $id: 'https://example.com/geographical-location.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Longitude and Latitude Values',
    description: 'A geographical coordinate.',
    required: ['latitude', 'longitude'],
    type: 'object',
    properties: {
      latitude: {
        type: 'number',
        minimum: -90,
        maximum: 90
      },
      longitude: {
        type: 'number',
        minimum: -180,
        maximum: 180
      }
    }
  }
}

genLatLon()

const genProduceLists = () => {
  return {
    $id: 'http://examples.com/arrays.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    description:
      'A representation of a person, company, organization, or place',
    type: 'object',
    properties: {
      fruits: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      vegetables: {
        type: 'array',
        items: { $ref: '#/definitions/veggie' }
      }
    },
    definitions: {
      veggie: {
        type: 'object',
        required: ['veggieName', 'veggieLike'],
        properties: {
          veggieName: {
            type: 'string',
            description: 'The name of the vegetable.'
          },
          veggieLike: {
            type: 'boolean',
            description: 'Do I like this vegetable?'
          }
        }
      }
    }
  }
}

genProduceLists()
