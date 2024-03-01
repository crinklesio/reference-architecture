# Types of state

In modern client-side applications, there are four different types of state that can be managed. The distinction of these different types is required, as each of these can be solved differently and in different areas of the clean architecture.

- **UI**: state that is used by a single, or a set of UI components. It is used to control what we can see, how we interact (e.g. input fields) on a detail level. UI state is managed in the domain or application layer.
- **Remote**: state from the server that is cached on the client for quick and easy access for all UI components. The remote state should not deviate from the server, except when applying optimistic UI. Remote state is managed in the domain layer (see [[Client-side API gateway|client-side gateway]]).
- **URL**: information stored in the URL, like object IDs or filter information, that can be used to determine what to render, or what information to retrieve from the cache/server on (initial) rendering of the page. URL state is managed in the infrastructure layer.
- **Meta**: known as 'state about state'. A common example is a loading state around fetch requests. Meta state is managed in the domain layer.
