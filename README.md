# Todos

## Design decisions

### Frontend

#### Router

I used [@reach/router](https://reach.tech/router) instead of react-router. They're
made by the same person but with different trade-offs. I'm using it in a project
outside of class (within the [Gatsby framework](https://www.gatsbyjs.com)), and
wanted to take the chance to familiarize myself with it.

There are a few routes built in. There are authenticated routes which are
protected by the [`withAuthentication`](/assets/js/app/components/higher-order/with-authentication.js)
higher-order component (HOC). The component returned from the function redirects the
user if they are not logged in on-render. This HOC relies
on the [`isLoggedIn`](/assets/js/app/components/higher-order/is-logged-in.js) HOC, which
simply connects the given component to the Redux store, and passes a Boolean prop (`"isLoggedIn"`)
signifying which is `true` of the user is authenticated and `false` if not.

The `isLoggedIn` HOC is also helpful for conditionally rendering
authenticated content (e.g. a logout button) inside a component.

#### Redux

The app's Redux state at a high level is a JSON object with the keys:

- `token`: The token for the authenticated user. This is the source of truth for
  determining whether the current user is authenticated or not.
- `user`: The email of the user.
- `todos`: The list of todos that belong to the current user.
- `error`: Global error string.

### Backend

#### `SessionController`

A resource controller with a single method for signing and returning a token
to the client, given an email and password.

#### `Authenticate` and `PutUser` plugs

The `PutUser` plug extracts the `"auth-token"` header from the current `Plug.Conn`
object, verifies the token using `Phoenix.Token.verify/3`, and finally reads
the user from the database. If all three steps are successful, then the `Plug.Conn`
is assigned `:current_user`.

The `Authenticate` plug simply checks for the presense of `:current_user` in the
`Plug.Conn.assigns`, and sends a 403 response to the client if it is not present.

## Running the server

To start your Phoenix server:

- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.create && mix ecto.migrate`
- Install Node.js dependencies with `cd assets && npm install`
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

- Official website: http://www.phoenixframework.org/
- Guides: https://hexdocs.pm/phoenix/overview.html
- Docs: https://hexdocs.pm/phoenix
- Mailing list: http://groups.google.com/group/phoenix-talk
- Source: https://github.com/phoenixframework/phoenix
