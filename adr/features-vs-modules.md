# ADR: features vs. modules

> **Status**: accepted on 24-02-2022

## Context
The current [reference architecture](https://github.com/kevtiq/reference-architecture) builds its idea around three principles: (1) separation-of-concerns; (2) command-query separation; and (3) co-location. The current *project structure example* stated in the reference guide tries to implement these principles, but partly fails to do so. The current example groups features in *modules* (although named ‘features’) around the idea of principle (3) and [bounded context](https://martinfowler.com/bliki/BoundedContext.html). This creates a structure of a module, as shown below:

```
todos/
├── rules/          // e.g. validation
├── actions/        // e.g. API calls
├── routes/         // e.g. pages
├── components/
```

The idea was that each module is loosely coupled of others, and therefor their features are loosely coupled from others. This makes modules shareable and reusable across applications. This centers around the `routes` folder, which provides the entry-point towards the module. Each page uses components and actions, hence the separation in different folders. 

## Decision
When separate modules can be identified (e.g. micro-front-ends) the above structure works well. However, reality has shown that most client-side applications are complex, and features are hardly ever isolated to dedicated pages. This results in tightly coupled modules, with the wrong structure. In addition, the rise of SSR frameworks (e.g. NextJS and SvelteKit) dictates a different developer experience. There already is a separation between `routes` and the rest of the code. 

By moving towards a more *features* focus structure, an architecture can be found that upholds the three principles better, while also be applicable for SSR-like solutions. It would follow the structure as below.

```
todos/
├── overview/
├── create/
├── update/
├── delete/
```

Within this structure, each *feature* holds code and files for different types. The `todos/overview` will contain the API-calls for fetching the data, but also the UI components to show a list. The `todos/create` will have next to components and API-calls, validation logic within the folder. Different types are of course stored in different files (e.g. a `create.action.js` file) to uphold principle (1).  

## Consequence 
Many *modules* can be translated 1-on-1 towards groups of *features* to begin with. Within simple application modules are loosely coupled, meaning the same for their features. Only in complex applications, modules have to be redistributed across a new division of features.

The new structure does create duplicate code more easily. However, due to the co-location principle, maintaining code in general has been made easier, outweighing this downside.  