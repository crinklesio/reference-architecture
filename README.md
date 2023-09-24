# SPA reference architecture

## Design principles

Guiding principles used for high-level design decisions.

- **Separation of concerns**: it is the activity of enforcing logical boundaries between each of the architectural concerns. It allows for _maintainable_ and _testable_ code.
- **Command-query separation (CQS)**: this pattern describes how to split read and write operations. _Queries_ only return data and don't impact state. _Commands_ change the state, but do not return data. By splitting commands and queries, a client-side application becomes _reactive_ (e.g. [optimistic UI](https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/)).
- **Co-location**: [Co-location](https://kentcdodds.com/blog/colocation) describes that code and data should live close to where it is used. This allows for better developer experience, but above all, better maintainability of applications.

## Development guidelines

Generic concepts and guidelines used for further understanding of the setup.

- [Security](/guidelines/security.md)
- [Error handling](/guidelines/error-handling.md)
- [State management](/guidelines/state-management.md)
- [CSS architecture](/guidelines/css-architecture.md)
- [Design systems](/guidelines/design-systems.md)
- [UI states](/guidelines/ui-states.md)

## High-level project structure

```
src/
├── api/              // wrapper, middleware + store around fetch
├── components/       // generic UI components (design system)
├── features/         // feature/domain-based modules
├── store/            // app state management (except remote)
├── styles/           // (S)CSS code
├── utilities/        // generic utility functions
├── router.js         // router
└── index.js          // app wrapper + route
```

The dependencies between the different elements of the high-level structure are visualised below.

![](/images/high-level-architecture.png)

Implementation details around some of the generic project directories:

- [Client-side API gateway](/details/gateway.md)
- [Proxy store](/details/store.md)

## Feature structure

With the co-location principle, features are groups of functionalities that are related. Within a feature group, code is structured based on function. Below an example of an activities feature group with selected files. This is just an example of a basic structure. It is possible to add more directories (e.g. helpers) or concatenate files.

```
features/
├── [feature-group-name]/
│   ├── __tests__/
│   ├── components/
│   ├── actions/
│   ├── models/
│   ├── pages/
```

![](/images/detailed-architecture.png)

> See [this file](/details/feature-example.md) for an example

**Components**
The visual components, sub-components etc. of the features. These can be used by routes, or other feature components. Often structured like dictated in [[CSS architecture|design systems]] but scoped to features. _Pages_ are special components. They directly corresponding to what is configured in the router.

**Actions**
Commands or queries that are responsible for the interaction with the _api_ (remote) and _store_ (local) and provide meaningful information back to the UI (e.g. error messages, the correctly formatted data). They utilise _models_ as much as possible, effectively operate like a _logic sandwich_ (e.g. fetch data via the api, use a model to transform it, write result in the store). In case of queries, _subscriptions_ are used to ensure continuous updates of data that can be passed onto the UI.

Actions are written in pure JavaScript. This makes them easier _testable_. In many cases, framework-binders are used to enable framework features (e.g. use a custom React hook to bind an action to the reactive nature of React). Binders also allow to subscribe to changes

**Models**
Business logic that can be represented by [pure functions](https://www.geeksforgeeks.org/pure-functions-in-javascript/). This means that they work like plain “input-output” functions. The same input always results in the same output, and they do _not have any side-effects on anything else_. They cannot write data to variables outside the function etc. Their pure nature ensures easy _testability_ of the implemented logic. Examples are:

- Validations
- Transformations (e.g. grouping of two types of objects, like joining two lists)
- Formatting for visual representation (e.g. combining two columns)

- **Components**: the visual components, sub-components etc. of the features. These can be used by routes, or other feature components. Often structured like dictated in [design systems](/guidelines/design-systems.md) but scoped to features.
- **Actions**: commands, queries or state-management related. Complex state-management should be modeled like [state machines](https://statecharts.dev/) or a [[Proxy store|proxy store]] should be used.
- **Models**: validation, transformation for logic/manipulation (e.g. group-on-X), formatting for visual representation (e.g. concatenate two attributes in a string).
- **Pages**: directly corresponding to what is configured in the router.
