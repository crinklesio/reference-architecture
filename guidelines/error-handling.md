# Error handling

## Error boundaries
We want to prevent that the front-end application breaks completely for users. Error boundaries provide a way to catch all errors and present a *meaningful* error page. This page should:

- Show what went wrong (e.g. type of error)
- Instructions what the user can do (e.g. if the error persist, contact someone)

## User feedback
- Validation feedback should be presented in form.
- Info/warning banners should be used to show when something is not possible for a user.
- Buttons should only be disabled when the page is in a loading state. Users should always be presented with the option to invoke validation logic. 
- Use toast messages on success, loading and non-validation errors. In case or errors, try to show meaningful error messages and only use “Something went wrong” in case of unknown issues. 

## Error handling around actions
It is up to the *action* to catch and handle errors, not the UI. The action should present back meaningful data for the UI to present to the user. 

```js
// Example on how to consistently return errors
async function fetcher(obj) {
	try {
		const validErrors = validate(obj);
		if (validErrors) return [null, validErrors];
		const res = await fetch();
		return [await res.json(), null];
	} catch (e) {
		// Do some transformation with the error, or not
		return [null, e];
	}
}
```