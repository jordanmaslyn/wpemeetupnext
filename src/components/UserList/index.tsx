import { UserListEntry } from "./UserListEntry";
import styles from "./UserList.module.css";

export function UserList({ users, loading }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return users.length ? (
    <>
      <div className="user-list-grid max-w-5xl mx-auto">
        <span className="user-name">
          <strong>Name</strong>
        </span>
        <span className="user-location">
          <strong>Current Location</strong>
        </span>
        <span className="user-email">
          <strong>Email</strong>
        </span>
        <span className="user-phone">
          <strong>Phone</strong>
        </span>
      </div>
      <ul className="mb-8">
        {users.map((user, index) => {
          return (
            <li className={styles["list-item"]} key={user?.id ?? index}>
              <UserListEntry user={user} />
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <p className="max-w-5xl mx-auto mb-8">
      <em>No folks there - sorry!</em>
    </p>
  );
}
