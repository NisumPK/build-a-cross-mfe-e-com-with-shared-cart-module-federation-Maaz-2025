import {
  Component,
  Suspense,
  type ErrorInfo,
  type ReactNode,
} from "react";

interface RemoteErrorBoundaryProps {
  children: ReactNode;
  name: string;
  resetKey: string;
}

interface RemoteErrorBoundaryState {
  error: Error | null;
}

class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  state: RemoteErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): RemoteErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Failed to render the ${this.props.name} remote.`, error, info);
  }

  componentDidUpdate(previousProps: RemoteErrorBoundaryProps) {
    if (
      this.state.error &&
      previousProps.resetKey !== this.props.resetKey
    ) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <section className="remote-state remote-state--error" role="alert">
          <span className="remote-state__icon" aria-hidden="true">
            !
          </span>
          <div>
            <h2>{this.props.name} is temporarily unavailable</h2>
            <p>
              Make sure the independent {this.props.name.toLowerCase()} service is
              running, then reload the page.
            </p>
            <button
              className="button button--secondary"
              type="button"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

function RemoteLoading({ name }: { name: string }) {
  return (
    <div className="remote-state remote-state--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <div>
        <strong>Loading {name.toLowerCase()}…</strong>
        <span>The independent module is connecting.</span>
      </div>
    </div>
  );
}

type RemoteBoundaryProps = RemoteErrorBoundaryProps;

export function RemoteBoundary({ children, name, resetKey }: RemoteBoundaryProps) {
  return (
    <RemoteErrorBoundary name={name} resetKey={resetKey}>
      <Suspense fallback={<RemoteLoading name={name} />}>{children}</Suspense>
    </RemoteErrorBoundary>
  );
}
