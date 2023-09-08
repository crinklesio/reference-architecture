# Security

Handling authentication/authorization on the client doesn't mean it shouldn't be handled on the server. As the matter of fact, it is more important to protect the resources on the server, but it should be handled on the client as well for better user experience.

## Authentication
In most cases, JWT tokens are used for authentication reasons. Tokens are stored in `localStorage`, `sessionStorage`, or `cookies`. 

- `localStorage`/`sessionStorage`: has a potential [XSS](https://owasp.org/www-community/attacks/xss/) security issue, but its implementation is a lot easier to facilitate.
- `cookies`: only more secure when using `HttpOnly` flags. Local development a lot harder. 

When using a *defensive programming* mindset, and when we [sanitize](https://github.com/cure53/DOMPurify) input values, `localSotrage` is an acceptable implementation. 

## Authorization
Authorization can be applied on: *routes*, *actions* or *conditional rendering*. There are two types of authorization implementation. 

- **RBAC**: The most common method. Define allowed roles for a resource and then check if a user has the allowed role in order to access a resource. 
- **PBAC**: If more control is needed (e.g. only editable by owner of the entity). Or when there are several roles that overlap on features. 

**Routes example**
```jsx
function ProtectedRoute({ roles: [], ...props }) {
	const { user } = useAuth();
	if (roles.includes(user.role)) return <Route {...props} />;
	return <Page401 />;
}
```

**Actions RBAC example** 
```js
function useAction({ roles: [] }) {
	const { user } = useAuth();
	if (roles.length > 0 && !roles.includes(user.role)) 
		return;

	...;
}
```