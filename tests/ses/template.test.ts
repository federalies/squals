import { SESTemplate } from '../../src/components/ses'
describe('SES Tempalte Tests ', () => {
  test('Default', () => {
    const a = new SESTemplate({
      templateName: 'First',
      name: 'name',
      subject: 'subject',
      html: `<p>Hello, my name is {{name}}. I am from {{hometown}}. I have {{kids.length}} kids:</p> <ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>`,
      text: `Hello, my name is {{name}}. I am from {{hometown}}. I have {{kids.length}} kids: {{#kids}}\n -{{name}} is {{age}}{{/kids}}`
    })
  })
})
