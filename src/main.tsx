import { createRoot } from 'react-dom/client';
import '~/styles/index.scss';
import { ReactStrictModeWrapper } from './ui/ReactStrictModeWrapper';
import { App } from './app';
import { IS_REACT_STRICT_MODE } from '~/config/app';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <ReactStrictModeWrapper isStrictModeEnable={IS_REACT_STRICT_MODE}>
      <App />
    </ReactStrictModeWrapper>,
  );
}
