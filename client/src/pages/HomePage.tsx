import { useAppSelector } from "src/store/hooks";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <>
      {
        isAuth ? (
          <Navigate to='/my-profile' replace />
        ) : (
          <Navigate to='/login' replace />
        )}
    </>
  );
}
