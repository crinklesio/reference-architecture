# SPA reference architecture

## 1. Design principles

### 1.1. Separation of concerns

The activity of enforcing logical boundaries between each of the architectural concerns. It allows for _maintainable_ and _testable_ code. In a SPA, this roughly means that code is divided into various layers.

![](/images/layers.png)

- **Core layer**: global state management, authentication, session management, etc.
- **Design system**: your global design system combined with the styles, i.e. (S)CSS, coming with that.
- **Domain layer**: everything related to business logic + business related UI (non-generic UI components), confined into _modules_ as little dependencies on other modules (as possible).

### 1.2. Co-location

Things, like functions, types, constants, data, etc. need to live close to where it is being used. This allows for a better developer experience, but above all, better maintainability of applications.

### 1.3. Optimize for change first

Creating hasty abstractions is a common pitfall, resulting in over-engineered solutions that are harder to maintain. The goal is to choose between “don’t repeat yourself (DRY)” and “write everything twice (WET)”, or even the [“rule-of-three”](https://blog.codinghorror.com/rule-of-three/), based on the chance of change for different parts of your code base.

- **Application layer**: things here will not change often, or not at all. That’s why a DRY approach works well.
- **UI layer**: the global design system will not change often (mostly appended upon). That’s why DRY approach works well.
- **Domain layer**: Things will change often, both on the business logic, as well as the UI. A WET approach is preferred here, or even apply the rule-of-three.

_NOTE_: the running assumption is domain logic changes a lot. Avoid abstracting entire modules, or create dependencies between modules just for the sake of code-sharing.

## 2. High-level project structure

```
src/
├── api/              // API wrapper, middleware, cache
├── components/       // Design system
├── modules/          // Domain layer
├── store/            // app state management (except remote)
├── styles/           // (S)CSS code
├── utilities/        // generic utility functions
├── app/              // index, router, generic pages
```

> NOTE: this is a guideline, adjust where you see fit. For instance, you might want to add a directory with “constants”, or a directory around i18n.

## 3. Module structure

Related business logic is co-located into modules. The modularity principle. Below the suggested structure for a module.

```
modules/
├── [module-name]/
│   ├── components/
│   ├── actions/
│   ├── helpers/
│   ├── pages/
│   ├── types.ts
│   ├── constants.ts
```

**Pages** are the main entry points for a router (e.g. from the `src/app/router.ts` file) to point to. **Components** are used by pages, or by other modules to show specific information (e.g. widget on the dashboard).

## 4. Implementation guidelines/rules

### 4.1. Write actions in plain JavaScript/TypeScript

Actions are not tied to a front-end framework themselves. By separating them, you achieve more testable and maintainable code. You can write wrappers to link actions to a framework (e.g. use a generic hook that provides loading state of asynchronous functions; use subscriptions for updates on remote state).

### 4.2. Co-locate validation and transformation within the action

By co-locating validation and transformations within the action (making them part of the action), tests for the actions become more complete, and realistic. It avoids writing code for validation and transformation that cover cases that are not realistic.

### 4.3. YAGNI & KISS

It sounds obvious, but in reality it hard. Whenever you write (helper) functions/components, it is tempting to add additional checks for outliers (e.g. does a value exist or not). This is often theoretical. In practice, you only use these functions in limited ways, and these checks/balances are never hit. The only time when you hit them are in your tests, and not in your production setting. "You ain't gonna need it (YAGNI)" dictates that you only add what you currently need, nothing more, nothing less. When you do so, keep it simple, stupid (KISS). 

### 4.4. One exported function per file

Most JavaScript/TypeScript code written on the front-end comes in the form of functions. Ensure only _one function gets exported_ per file. This holds true for plain JavaScript/TypeScript, but also for the UI components written in any other format. Splitting code into separate functions increases the readability and maintainability of the code. In this line of thinking, you could choose to give each function its own file. However, this conflicts with two principles of this architecture: "co-location" and "optimize for change". If a function is only used by one or two other functions, you can argue the function itself should not even be a separate function, and it is OK if it would live twice. In addition, "co-location" describes that it should live close to where it is used, which often does not happen when splitting code. So the general rule is:

"_Only export one function per file, but have all the helper functions in the same file, locally available_"

There are several advantages for your developer experience when doing so:

- It makes naming things easier. You don't have to worry your helper function uses the same name as some other helper function.
- It reduces the overhead on your IDE's auto-complete feature, and makes functions that actually want to be able to use in other files easier to find and navigate.
- It reduces complexity of your code, that can be "measured" by testing. By only writing tests in a case that cover 100% of your main exported function, you can easily spot the areas of your helper function that will never get triggered. You can remove these paths, which is in line with the KISS guideline.

### 4.5. Type-safety

It is recommended to use TypeScript to enable type-safety across the team. Standardising domain-related types can greatly help in achieving _maintenance_.

- `<ObjectName>`: type corresponding to data retrieved from the server, ideally in line with API definition.
- `<ObjectName>Extended`: the type corresponding to the server, but extended with additional properties (e.g. including related data like `user` based on the `userId`).
- `I<ObjectName>`:client-side type that has a temporary properties, limited properties and more optional properties compared to the server type. Often used for “create” forms.

For example, in case of a `projects` module, you will get `IProject`, `Project`, and `ProjectExtended`.

## 5. More information

A list of more generic guidelines and concepts that can help create a more maintainable codebase, but are not by default recommended, given they are more opinionated.

- [Design systems](/guidelines/design-systems.md)
- [Error handling](/guidelines/error-handling.md)
- [Types of state (data)](/guidelines/state-management.md)
- [UI states](/guidelines/ui-states.md)
- [Use state machines](https://statecharts/dev)
- [Client-side API gateway](/guidelines/gateway.md)
- [Proxy store](/guidelines/store.md)
