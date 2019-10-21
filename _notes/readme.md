The Question At Hand Is:

# To mix or not to mix; That is the question

The `infra code` vs `app code`

squals file - can provision all your ish

1. Infra Setup (Priovisioning) -- SURE Squals helps here.
2. Move App Code to Infra (Deploy) -- Not sure if squals has a place here?

  1. Perhaps so since squals files would be in source code. so each 'deploy' would be to declare the squals file, and then move any needed code to where it goes.

  2. this simplifies the CI/CD process. Where each "App Change" runs:

    - BUILD Process

    ```
    - does the change "compile"
    - Webpack DOES count as a compiler
    ```

    - some TESTS

    ```
    - it's own unit tests
    - it's realted integraion tests
    - perform a provisisioning, and p
    - related sanity checks
    ```

    - some SECURITY checks

    ```
    - dependency analysis
    - applicaiton code change risk factors
    - referencing any CVE
    ```

3. Make sure Squals supports advanced deployment characteristics:

  - Multi-Environments
  - Deployment Job Hooks:

    - Before(PreProd)
    - After(PreProd)
    - Promote(PreProd, Prod)
    - After(PostProd) -

  - Pre-Prod Env (Staging & A/B Testing)

  - Post-Prod Env (Holding on to one hot app state - keeps the rollback trivial)

Deployment Process

- PR Submited to Master
- initiates automated : [ Compilation ] [ Applicable Tests] | [Security Checks] --> All Pass
- Deploy

## Process: Typical

1. Runjobs - aka `Before(PreProd)`
2. Make new ENV via squals in a new PreProd island
3. Runjobs - After(PreProd) - clean up any lingering stuff
4. Run: ExitTests - liekly has exit tests in Pupeteer, PhnatomJS, Selenium, etc - PASSES?
5. IfPassed: Bump Existing Prod to Green, and bring in BLUE env whereby: BLUE gets standard shunt of traffic for monitoring and inFlight Tests 6\. While BLUE is LIVE, Run:InFlight Tests(based on new feature) Attempting to determine:

  - Ensure: we did no harm (sanity checks) - likley applicable before this change
  - Ensure: feature is working as intended - likely requires context of the changeset
  - Attain some liklihood that assumed KPI is tending in right direction - perhaps data from monitoring systems, perhaps a performance test, perhaps a datafeed from another system is required

## Process: Competing Experiement

### Has:

- Competing Versions of Application Code (perhaps competing squalfiles)
- an objective function - the version that maximizes the objective function wins and gets promoted
- a state collection mechanism for objective function comparison at experiement conclusion
- a minimum experiment duration - denominated in time, page activation, etc.
- experiement declare env variants

### By:

- Shunting traffic over each competing version for the experiement duration, and auto-promoting the winner
- Determining the minimum resources required to support each experiment

  - This includes the randomizing shunt (Some Mechanism of FanOut + Randomization) - Load Balancer, DNS Round Robin, etc
  - This includes the collection/observation of inputs required to tabulate object functions per variant

#### Objevtive Function Considerations:

The Standard Process (listed above) is the result of a managerial initiative to create new system behavior. You could think of that as the `new prod candidate` competing against the `existing prod version`, but where the objective function is to collect how many times the "new feature" is used - whereby the new candidate will always win - due to a narrowly defined objective function. This is not intended to undermine narrow object functions, but merely as contrasting backdrop of the importantance of object funcitons in auto-promoting variants based objective maximization. Myopic objective functions have a place, but healthy evolutionary processes favor global positives over departmental initiatives, or other localized positives.

### Process:

1. Experiement is merged into master.

  - as triggers of `code-changed` fire, experiement will see if all deps are met

2. Once true, conitue process

  - thus each variant can be developed consecutively and independently
  - the process likely benefit from starting with a set of standardized off the shelf Dealers

3. Runjobs - aka `Before(PreProd)` for each of the envs in manifest

4. Build all ENVs based on manifest - where each is a new PreProd island

5. Runjobs - After(PreProd) - clean up any lingering stuff

6. Deploy `TheDealer` (aka: Experiment Commence)

7. ...Experiment Continues

8. Objective Maximzation is Calculated (optionally with stats significance)

9. Winner Is Promoted (aka: Experiment Concludes)

## What about

- Competing Experiments
- Load Tests
- Chaos Tests
- How to disentangle shared costs like a redis cache? rds instance etc?

## prior art:

- serverless framework
- AWS CDK
