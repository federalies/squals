# Status API

Problem Statement:

1\. A Technical but perhaps confused customer just claimed our services is down. What is a `level1` type of response? What data woulld it need?

- A page ideally with
- A legend / glossary / terms section
- An exhaustinve list of GA subsystems, with a `stop light` indicator.
- Perhaps some charts ( not divulging metrics but rather) a time series of booleans, stating if we met our performance envelope expectation.
- Suitably robust/separate hosting environment so that it does not become unreachable - due to cascading failure -
- Reasonalbe data/fetch/loading times

The Status API is a is a collection of configurations

1. allowing sub-components to announce they exist
2. allowing sub-components to annoounce their performance target windows
3. requireing target windows to be coupled with indicator data
