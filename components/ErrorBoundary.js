import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // 自定义降级后的 UI
      return <ErrorFallback onReset={this.handleReset} error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ onReset, error }) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="alert-circle-outline" size={64} color={theme.colors.danger || '#E53935'} />
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>
          {error?.message || 'An unexpected error occurred'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    content: {
      alignItems: 'center',
      maxWidth: 400,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.title,
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
    message: {
      ...theme.typography.body,
      color: theme.colors.body,
      textAlign: 'center',
      marginBottom: 30,
    },
    button: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      ...theme.typography.body,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });

export default ErrorBoundary;

