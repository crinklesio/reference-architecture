# Feature example: activity overview + create

> Black = component/page, purple = action, green = model.

![](../images/feature.png)

**NOTE**: several dependencies can be missing from the above illustration. These are generic components that are view-only. `Pagination` is also a generic component that is visualised given its interaction with `ActivityOverview`.

```
features/
├── activities/
│   ├── __tests__/
│   ├── components/
│   │   ├── ActivityOverview.jsx
│   │   ├── ActivityTable.jsx
│   │   ├── ActivityCreateModal.jsx
│   ├── actions/
│   │   ├── create.activity.js
│   │   ├── get.activity.js
│   ├── models/
│   │   ├── validate.activity.js
│   │   ├── groupOnUser.activity.js
```

**Components**

- [Activity Overview](../example/components/ActivityOverview.jsx)
- [Activity Create Modal](../example/components/ActivityCreateModal.jsx)

**Actions**
In the below examples, generic hooks (`useQuery` and `useCommand`) are created that bind the pure JavaScript business logic to React. This separation makes business logic cleaner, easier to test, and therefor more maintainable.

- [Get action](../example/actions/get.activity.js)
- [Create action](../example/actions/create.activity.js)
