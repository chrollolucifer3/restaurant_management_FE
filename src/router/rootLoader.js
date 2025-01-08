import {redirect} from "react-router-dom";
import store from "../states/configureStore";
import {initialSaga} from "../states/modules/routing";
import {hasPermission} from "../utils/helper";
import {getMe} from "../api/auth";
import {getAuthToken} from "../utils/localStorage";

export const rootLoader = async ({ request }, isAuth, saga = null) => {
  const url = new URL(request.url);
  const isResetPassword = url.pathname.startsWith('/resetPassword');

  if (url.pathname === '/profile') {
    await store.dispatch(getMe());
  }

  let { auth } = store.getState();

  if (!auth.isAuthSuccess && getAuthToken()) {
    await store.dispatch(getMe());
  }

  if (isAuth && !isResetPassword) {
    if (!auth.isAuthSuccess) {
      return redirect('/login');
    }

    if (!hasPermission(url.pathname)) {
      return redirect('/403'); // Nếu không có quyền truy cập, điều hướng đến trang 403
    }
  } else {
    if (auth.isAuthSuccess) {
      return redirect('/'); // Nếu đã đăng nhập, điều hướng đến dashboard
    }
  }

  if (saga) {
    store.dispatch(initialSaga(saga));
  }

  return null;
};