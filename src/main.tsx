import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import '~/styles/index.scss';
import { store } from './store';
import { ReactStrictModeWrapper } from './ui/ReactStrictModeWrapper';
import { App } from './app';
import { IS_REACT_STRICT_MODE } from '~/config/app';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <ReactStrictModeWrapper isStrictModeEnable={IS_REACT_STRICT_MODE}>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactStrictModeWrapper>,
  );
}
