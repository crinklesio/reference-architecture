# Project example

This examples shows code snippet that should provide a general idea on how things look when modelling a SPA according to this reference architecture. Some highlights are outlined below.

- `IProject` fixes a status value in the type already
- `Project` type overwrites a value of `IProject`
- Shows the interplay between enumeration values and types
- `components/ProjectTable.tsx` shows that UI component property types are written in the component file itself.
- `pages/ProjectOverview.tsx` shows how a generic wrapper can be used around a plain text async action.
- `actions/getProjectList` shows how input (filter information) is transformed for the request, and how the output (remote data) is transformed in the action itself as well, not in the UI components.
- `actions/createProject` shows how validation + transformation is included in the action itself, not in the UI components.
- `actions/createProject` shows a structural way of error handling that can be easily utilized by in the UI.
