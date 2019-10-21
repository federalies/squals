import { nodeFunctionDealer } from 'dealers'

const sum = (...inputs) => inputs.reduce((p, c) => p + c)
const min = (...inputs) => inputs.reduce((p, c) => (c <= p ? c : p), Infinity)
// const max = (...inputs) => inputs.reduce((p, c) => (c >= p ? c : p), -Infinity)

export default async state => {
  console.log(state, min, sum)

  return {
    duration: 'tillSignificance',
    maxDuration: '5000s',
    // duration could be '5000s' | '14d'
    // since science is based on repeatable processes
    // that are used to tease out causality,
    // tend towards not supporting absolulte dates for reasons of repeatability

    triggeredBy: 'commits', // 'slackCommand' | 'button' | '' |

    // since an experiment is like a story with beginning middle and end...
    // we may want to clean up,
    // but not clean out the data
    archiveTo: {
      data: '',
      conclusion: '',
      source: ''
    },

    // IDEA:
    // maybe eventually give it an experiement context
    // if experiemnt includes variants of subSystem A, then A is replaced with the winner
    // but couldnt a separate experiement replace subSystem:B

    dealer: nodeFunctionDealer({ max: 2 }),
    // support variants in git brnaches? maybe eventually?
    variants: [
      (await import('variant1'))(state),
      (await import('variant2'))(state),
      (await import('variant3'))(state),
      (await import('variant4'))(state),
      (await import('variant5'))(state)
    ],
    objective: {
      // plugins would extend this part of the system
      // operator()
      // ƒnOperator( DATUMsyntax might be provided via plugin ecosystem)
      // maybe this would be a GraphQL query??
      inputs: [
        import('SUM(DailyCostsPennies) as runningCost'),
        import('99P(http:www.example.com/###/timeTillInteractive) as tti '),
        import('COUNT(FormsCollected) as formSubmissions'),
        import('COUNT(CTA:Clicks) as phoneCallsStaged'),
        { graphQLquery: `{ costs { dailyPennies } }`, reducer: sum },
        { graphQLquery: `{ pageTTI( url: 'http:www.example.com' ) { 99p } }`, reducer: sum },
        { graphQLquery: `{ costs { dailyPennies } }`, reducer: sum },
        { graphQLquery: `{ costs { dailyPennies } }`, reducer: sum }
      ],
      evaluator: variantInputsArr => {
        // FETCHED vs INJECTED
        //
        // or maybe this has to go fetch its data here???
        // and the inputs key would not separated???
        //
        // but that would complicate the evalutor
        // which might fail for failed to achieve statistical significace reasons
        // and now adding a fail state of "input data unavailable"
        // means the function that consumes this module now would have to discriminate on Error Types
        //
        // it would also complicate - knowing when the experiment is 'runnable'
        // what if the obj:inputs were transformed into SNS/KinesisStreamEvents colelcted into a bucket that would be discarded at the conclusion of the experiment

        return min(
          variantInputsArr.map(variant => {
            const badThings = variant.runningCost + 30 * variant.tti
            const goodThings = variant.phoneCallsStaged + variant.formSubmissions
            // a very real profit function
            // for every 100 phone calls we get a 1000 dollar revenue project
            // for every 20 forms filled out we average a new 1000 dollar revenue project
            return goodThings - badThings
          })
        )
      }
    }
  }
}

/**
 * what would it mean to have a experiemtn of experiments??
 * Are experiments composible?
 *
 * How does this interoperate with the usual loop of:
 *
 * 1. Synth/Generate
 * 2. Diff
 * 3. Deploy
 *
 *
 */
