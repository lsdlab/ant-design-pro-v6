export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  }
};
