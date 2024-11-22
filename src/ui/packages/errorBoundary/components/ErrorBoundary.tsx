import React, { Component, ErrorInfo, ReactComponent } from "@rbxts/react";

export interface ErrorBoundaryProps {
	fallback?: (error: unknown) => React.Element;
}

export interface ErrorBoundaryState {
	hasError: boolean;
	message?: unknown;
}

@ReactComponent
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = {
		hasError: false,
	};

	componentDidCatch(message: unknown, info: ErrorInfo) {
		warn(message, info.componentStack);

		this.setState({
			hasError: true,
			message: `${message} ${info.componentStack}`,
		});
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback !== undefined ? this.props.fallback(this.state.message) : <></>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
