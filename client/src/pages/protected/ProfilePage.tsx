import { useAppSelector } from "src/store/hooks";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className='container'>
      <p>
        Hey <b>{user?.username}</b>, welcome to your profile page.
        Your email is <b>{user?.email}</b>.
      </p>
    </div>
  );
}
