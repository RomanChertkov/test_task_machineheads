import { Button, Result } from 'antd'
import * as React from 'react'

interface ErrorBoundaryProps {
  message?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}
interface ErrorBoundaryStates {
  error?: Error | null
  errorInfo?: {
    componentStack?: string
  } | null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryStates
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: Error | null, errorInfo: object): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Result
          status="warning"
          title="Что-то пошло не так"
          subTitle="Попробуйте обновить страницу или перейти на другую страницу"
          //   extra={[
          //     <Button type="primary" key="console">
          //       Go Console
          //     </Button>,
          //     <Button key="buy">Buy Again</Button>,
          //   ]}
        >
          <div>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        </Result>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary
