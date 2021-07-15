import { UserListEntry } from "./UserListEntry"

export function UserList( { users }) {
  return (
    <ul>
      {users.map((user, index) => {
        return (
          <li key={user?.id ?? index}>
            <UserListEntry user={user} />
          </li>
        )
      })}
    </ul>
  )
}

